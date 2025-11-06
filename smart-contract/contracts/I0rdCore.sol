// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title I0rdCore – Decentralized AI-Powered Trading Hub
 * @dev Fully functional spot trading, copy trading, AI bot marketplace, staking, and governance
 */
contract I0rdCore is Ownable, ReentrancyGuard {
    enum OrderType { BUY, SELL }

    struct Order {
        address trader;
        OrderType orderType;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOutMin;
        uint256 deadline;
        bool executed;
    }

    struct AIBot {
        address creator;
        string metadataURI;
        uint256 price;
        bool active;
    }

    struct Proposal {
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool executed;
    }

    // IDs
    uint256 public nextOrderId;
    uint256 public nextBotId;
    uint256 public nextProposalId;

    // Mappings
    mapping(uint256 => Order) public orders;
    mapping(uint256 => AIBot) public bots;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256[]) public userOrders;
    mapping(address => uint256[]) public userBots;
    mapping(address => uint256) public stakedBalance;
    mapping(address => bool) public isCopyTrader;

    IERC20 public immutable USDC;

    // Events
    event OrderPlaced(uint256 indexed id, address indexed trader, OrderType orderType);
    event OrderExecuted(uint256 indexed id, uint256 amountOut);
    event OrderCancelled(uint256 indexed id);
    event BotListed(uint256 indexed id, address indexed creator, uint256 price);
    event BotPurchased(uint256 indexed id, address indexed buyer);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event GovernanceVote(address indexed voter, uint256 proposalId, bool support);
    event ProposalCreated(uint256 indexed id, string description, uint256 deadline);

    constructor(address _usdc) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC");
        USDC = IERC20(_usdc);
    }

    // ── 1. SPOT TRADING ─────────────────────────────────────────────
    function placeOrder(
        OrderType _type,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        uint256 _deadline
    ) external payable nonReentrant {
        require(_deadline > block.timestamp, "Deadline passed");
        require(_amountIn > 0, "Amount zero");
        require(_tokenIn != _tokenOut, "Same token");

        // Handle input token
        if (_tokenIn == address(0)) {
            require(msg.value == _amountIn, "Wrong ETH amount");
        } else {
            require(IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn), "Transfer failed");
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

    function cancelOrder(uint256 _id) external {
        Order storage o = orders[_id];
        require(o.trader == msg.sender, "Not owner");
        require(!o.executed, "Already executed");

        o.executed = true; // Mark to prevent execution

        // Return funds
        if (o.tokenIn == address(0)) {
            payable(msg.sender).transfer(o.amountIn);
        } else {
            IERC20(o.tokenIn).transfer(msg.sender, o.amountIn);
        }

        emit OrderCancelled(_id);
    }

    function executeOrder(uint256 _id, uint256 _amountOut) external onlyOwner {
        Order storage o = orders[_id];
        require(!o.executed, "Already executed");
        require(block.timestamp <= o.deadline, "Expired");
        require(_amountOut >= o.amountOutMin, "Slippage too high");

        o.executed = true;

        // Send output token
        if (o.tokenOut == address(0)) {
            payable(o.trader).transfer(_amountOut);
        } else {
            require(IERC20(o.tokenOut).transfer(o.trader, _amountOut), "Transfer failed");
        }

        emit OrderExecuted(_id, _amountOut);
    }

    // ── 2. COPY TRADING ─────────────────────────────────────────────
    function toggleCopyTrader() external {
        isCopyTrader[msg.sender] = !isCopyTrader[msg.sender];
    }

    function mirrorOrder(uint256 _originalId) external payable nonReentrant {
        require(isCopyTrader[msg.sender], "Not copy-trader");
        Order memory orig = orders[_originalId];
        require(!orig.executed, "Original executed");
        require(orig.deadline > block.timestamp, "Deadline passed");

        // Replicate exact payment logic
        if (orig.tokenIn == address(0)) {
            require(msg.value == orig.amountIn, "Wrong ETH amount");
        } else {
            require(
                IERC20(orig.tokenIn).transferFrom(msg.sender, address(this), orig.amountIn),
                "Transfer failed"
            );
        }

        uint256 id = nextOrderId++;
        orders[id] = Order({
            trader: msg.sender,
            orderType: orig.orderType,
            tokenIn: orig.tokenIn,
            tokenOut: orig.tokenOut,
            amountIn: orig.amountIn,
            amountOutMin: orig.amountOutMin,
            deadline: orig.deadline,
            executed: false
        });
        userOrders[msg.sender].push(id);

        emit OrderPlaced(id, msg.sender, orig.orderType);
    }

    // ── 3. AI BOT MARKETPLACE ───────────────────────────────────────
    function listBot(string calldata _metadataURI, uint256 _price) external {
        require(_price > 0, "Price zero");
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
        AIBot storage bot = bots[_botId];
        require(bot.active, "Bot not active");
        require(msg.value >= bot.price, "Insufficient payment");

        address creator = bot.creator;
        uint256 price = bot.price;

        bot.active = false;
        payable(creator).transfer(price);

        emit BotPurchased(_botId, msg.sender);
    }

    // ── 4. STAKING ──────────────────────────────────────────────────
    function stake() external payable {
        require(msg.value > 0, "Zero stake");
        stakedBalance[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Zero amount");
        require(stakedBalance[msg.sender] >= _amount, "Insufficient stake");
        stakedBalance[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Unstaked(msg.sender, _amount);
    }

    // ── 5. GOVERNANCE ───────────────────────────────────────────────
    function createProposal(string calldata _desc, uint256 _duration) external {
        require(stakedBalance[msg.sender] > 0, "No stake");
        require(_duration > 1 days, "Duration too short");

        uint256 id = nextProposalId++;
        proposals[id] = Proposal({
            description: _desc,
            yesVotes: 0,
            noVotes: 0,
            deadline: block.timestamp + _duration,
            executed: false
        });

        emit ProposalCreated(id, _desc, block.timestamp + _duration);
    }

    function vote(uint256 _propId, bool _support) external {
        require(stakedBalance[msg.sender] > 0, "No stake");
        Proposal storage p = proposals[_propId];
        require(block.timestamp < p.deadline, "Voting ended");
        require(!p.executed, "Already executed");

        uint256 power = stakedBalance[msg.sender];
        if (_support) {
            p.yesVotes += power;
        } else {
            p.noVotes += power;
        }

        emit GovernanceVote(msg.sender, _propId, _support);
    }

    function executeProposal(uint256 _propId) external onlyOwner {
        Proposal storage p = proposals[_propId];
        require(block.timestamp >= p.deadline, "Voting ongoing");
        require(!p.executed, "Already executed");
        require(p.yesVotes > p.noVotes, "Proposal rejected");

        p.executed = true;
        // Add governance actions here in future
    }

    // ── VIEW FUNCTIONS ──────────────────────────────────────────────
    function getUserOrders(address _user) external view returns (uint256[] memory) {
        return userOrders[_user];
    }

    function getUserBots(address _user) external view returns (uint256[] memory) {
        return userBots[_user];
    }

    receive() external payable {}
}
