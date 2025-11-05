// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title I0rdCore – Decentralized AI-Powered Trading Hub
 * @notice Handles spot orders, copy-trading, AI-bot marketplace, staking & governance.
 */
contract I0rdCore is Ownable, ReentrancyGuard {
    // ──────────────────────────────────────────────────────────────
    // Types
    // ──────────────────────────────────────────────────────────────
    enum OrderType { BUY, SELL }
    struct Order {
        address trader;
        OrderType orderType;
        address tokenIn;   // address(0) = native 0G token
        address tokenOut;
        uint256 amountIn;
        uint256 amountOutMin;
        uint256 deadline;
        bool executed;
    }

    struct AIBot {
        address creator;
        string  metadataURI;   // IPFS / 0G-Storage link
        uint256 price;         // in native token
        bool    active;
    }

    // ──────────────────────────────────────────────────────────────
    // State
    // ──────────────────────────────────────────────────────────────
    uint256 public nextOrderId;
    uint256 public nextBotId;

    mapping(uint256 => Order) public orders;
    mapping(uint256 => AIBot) public bots;
    mapping(address => uint256[]) public userOrders;
    mapping(address => uint256[]) public userBots;
    mapping(address => uint256) public stakedBalance;
    mapping(address => bool) public isCopyTrader;

    IERC20 public immutable USDC; // example stablecoin for fees

    // ──────────────────────────────────────────────────────────────
    // Events
    // ──────────────────────────────────────────────────────────────
    event OrderPlaced(uint256 indexed id, address indexed trader, OrderType orderType);
    event OrderExecuted(uint256 indexed id, uint256 amountOut);
    event BotListed(uint256 indexed id, address indexed creator, uint256 price);
    event BotPurchased(uint256 indexed id, address indexed buyer);
    event Staked(address indexed user, uint256 amount);
    event GovernanceVote(address indexed voter, uint256 proposalId, bool support);

    // ──────────────────────────────────────────────────────────────
    // Constructor
    // ──────────────────────────────────────────────────────────────
    constructor(address _usdc) {
        USDC = IERC20(_usdc);
    }

    // ──────────────────────────────────────────────────────────────
    // 1. Spot Trading
    // ──────────────────────────────────────────────────────────────
    function placeOrder(
        OrderType _type,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        uint256 _deadline
    ) external payable nonReentrant {
        require(_deadline > block.timestamp, "Deadline passed");
        if (_tokenIn == address(0)) {
            require(msg.value == _amountIn, "Wrong ETH amount");
        } else {
            IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        }

        uint256 id = nextOrderId++;
        orders[id] = Order({
            trader: msg.sender,
            orderType: _type,
            tokenIn: _tokenIn,
            tokenOut: _tokenOut,
            amountIn: _amountIn,
            amountOutMin: _amountOutMin,
            deadline: _deadline,
            executed: false
        });
        userOrders[msg.sender].push(id);

        emit OrderPlaced(id, msg.sender, _type);
    }

    // Simplified execution – in production you would match orders off-chain via 0G Compute
    function executeOrder(uint256 _id, uint256 _amountOut) external onlyOwner {
        Order storage o = orders[_id];
        require(!o.executed, "Already executed");
        require(block.timestamp <= o.deadline, "Expired");
        require(_amountOut >= o.amountOutMin, "Slippage");

        o.executed = true;
        if (o.tokenOut == address(0)) {
            payable(o.trader).transfer(_amountOut);
        } else {
            IERC20(o.tokenOut).transfer(o.trader, _amountOut);
        }
        emit OrderExecuted(_id, _amountOut);
    }

    // ──────────────────────────────────────────────────────────────
    // 2. Copy-Trading
    // ──────────────────────────────────────────────────────────────
    function toggleCopyTrader() external {
        isCopyTrader[msg.sender] = !isCopyTrader[msg.sender];
    }

    // Front-end will listen to OrderPlaced and auto-mirror for copy-traders
    function mirrorOrder(uint256 _originalId) external payable nonReentrant {
        require(isCopyTrader[msg.sender], "Not a copy-trader");
        Order memory orig = orders[_originalId];
        require(!orig.executed, "Original executed");

        // Mirror with same params (simplified – real version would scale amount)
        placeOrder(
            orig.orderType,
            orig.tokenIn,
            orig.tokenOut,
            orig.amountIn,
            orig.amountOutMin,
            orig.deadline
        );
    }

    // ──────────────────────────────────────────────────────────────
    // 3. AI-Bot Marketplace
    // ──────────────────────────────────────────────────────────────
    function listBot(string calldata _metadataURI, uint256 _price) external {
        uint256 id = nextBotId++;
        bots[id] = AIBot({
            creator: msg.sender,
            metadataURI: _metadataURI,
            price: _price,
            active: true
        });
        userBots[msg.sender].push(id);
        emit BotListed(id, msg.sender, _price);
    }

    function purchaseBot(uint256 _botId) external payable nonReentrant {
        AIBot memory bot = bots[_botId];
        require(bot.active, "Bot not active");
        require(msg.value >= bot.price, "Insufficient payment");

        // Transfer price to creator
        payable(bot.creator).transfer(bot.price);
        // Mark bot as owned (simple – real version would use ERC-721)
        bots[_botId].active = false;

        emit BotPurchased(_botId, msg.sender);
    }

    // ──────────────────────────────────────────────────────────────
    // 4. Staking (0G token)
    // ──────────────────────────────────────────────────────────────
    function stake() external payable {
        stakedBalance[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 _amount) external nonReentrant {
        require(stakedBalance[msg.sender] >= _amount, "Insufficient stake");
        stakedBalance[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    // ──────────────────────────────────────────────────────────────
    // 5. Governance (simple proposal voting)
    // ──────────────────────────────────────────────────────────────
    struct Proposal {
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool executed;
    }
    mapping(uint256 => Proposal) public proposals;
    uint256 public nextProposalId;

    function createProposal(string calldata _desc, uint256 _duration) external {
        uint256 id = nextProposalId++;
        proposals[id] = Proposal({
            description: _desc,
            yesVotes: 0,
            noVotes: 0,
            deadline: block.timestamp + _duration,
            executed: false
        });
    }

    function vote(uint256 _propId, bool _support) external {
        require(stakedBalance[msg.sender] > 0, "No stake");
        require(block.timestamp < proposals[_propId].deadline, "Voting ended");
        if (_support) proposals[_propId].yesVotes += stakedBalance[msg.sender];
        else proposals[_propId].noVotes += stakedBalance[msg.sender];
        emit GovernanceVote(msg.sender, _propId, _support);
    }

    // Owner can execute winning proposal
    function executeProposal(uint256 _propId) external onlyOwner {
        Proposal storage p = proposals[_propId];
        require(block.timestamp >= p.deadline, "Voting ongoing");
        require(!p.executed, "Already executed");
        require(p.yesVotes > p.noVotes, "Proposal rejected");
        p.executed = true;
        // Add custom logic per proposal here
    }
}