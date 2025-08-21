# TradeRow - Decentralized Trading Application on NERO Chain

## Overview

**TradeRow** is a TypeScript-based React application designed for decentralized finance (DeFi) and SocialFi experiences, built natively on the **NERO Chain** blockchain. This build features a simulated trading UI, gas payment abstraction (Types 0, 1, 2), and a social trading feed. The architecture prioritizes Web3-native onboarding, animated user interactions, and modular extensibility—supporting future integrations like **Hyperlane** (cross-chain) and **Datai Network** (analytics). Built with `ethers` v6, the project ensures modern Web3 compatibility and developer-friendly tooling.

---

##  Features

*  **Swap Interface**: Aggregates mock token swaps via a modular React engine with animated UI.
*  **SocialFi Feed**: Simulates trade-based social engagement with mock user data.
*  **Wallet Integration**: EOA connectivity via `ethers` v6 and MetaMask’s `BrowserProvider`.
*  **Gas Payment Selector**: Offers Type 0 (gasless), Type 1 (subsidized), and Type 2 (premium) modes.
*  **UI Animations**: Uses Framer Motion and Tailwind CSS for smooth, responsive interfaces.

---

## Problem It Solves

* Lowers the barrier to DeFi by offering abstracted gas fee types via NERO Paymaster.
* Fosters collaborative trading through social feed-style engagement.
* Simplifies user onboarding with modal flows and mock analytics.
* Prepares the foundation for cross-chain, data-driven trading on NERO.

---

## Getting Started

### Prerequisites

* Node.js `v18.x+`
* npm `v9.x+`
* Git `v2.34+`
* MetaMask extension
* TypeScript-supporting IDE (e.g., VS Code `v1.85+`)

### Installation

```bash
git clone https://github.com/valortin/traderow.git
cd traderow
npm install
```

### Configuration

Create `src/utils/config.ts`:

```ts
export const CONFIG = {
  rpcUrl: 'https://rpc-testnet.nerochain.io',
  chainId: '0x2B1', // NERO Testnet
  gasLimit: 3000000,
};
```

Optional: In `WalletConnect.tsx`, initialize Web3Auth:

```ts
const web3auth = new Web3Auth({ clientId: 'YOUR_WEB3AUTH_CLIENT_ID', ... });
```

### Development

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

### Production

```bash
npm run build
```

Build is output to `build/` with optimized assets.

### Type Check

```bash
npm run type-check
```

---

## Project Architecture

```
traderow/
├── src/
│   ├── components/
│   │   ├── WalletConnect.tsx
│   │   ├── SwapInterface.tsx
│   │   ├── SocialFeed.tsx
│   │   ├── PaymentSelector.tsx
│   │   └── OnboardingModal.tsx
│   ├── utils/
│   │   ├── mockData.ts
│   │   ├── types.ts
│   │   └── config.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── public/
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Technologies Used

| Area        | Tech Stack                                     |
| ----------- | ---------------------------------------------- |
| Frontend    | React `v18.2.0`, TypeScript `v5.1.6`           |
| Styling     | Tailwind CSS `v3.4.4`, Framer Motion `v11.3.8` |
| Web3        | `ethers.js` `v6.13.2`, MetaMask                |
| Utilities   | `react-toastify` `v10.0.5`, Web3Auth (opt)     |
| Blockchain  | NERO Chain RPC (Testnet)                       |
| Build Tools | `react-scripts` `v5.0.1`                       |

---

## Build & Integration

1. **Scaffold**: Bootstrapped via CRA TypeScript template.
2. **UI**: Designed with Tailwind + Framer Motion (`whileHover`, `whileTap`, etc.).
3. **Web3 Setup**: Used `ethers` v6 `BrowserProvider` for EOA, integrated with MetaMask.
4. **Data Mocking**: Simulated token/quote datasets via `mockData.ts`.
5. **Paymaster/Hyperlane**: Placeholders integrated; API connection pending.
6. **Optimized Build**: `npm run build` with sourcemaps disabled (`GENERATE_SOURCEMAP=false`).

---

## Challenges Faced

*  TypeScript DOM types for `ethereum`: Resolved with `declare global`.
*  ethers v6 migration: Updated import paths and providers.
*  Web3Auth bugs: Temporary rollback to MetaMask-only mode.
*  Animation lag: Tuned Framer Motion transitions for 60 FPS.
*  RPC latency: Added fallback NERO RPC endpoints.

---

## Lessons Learned

* Strong typing (e.g., interfaces for `SwapQuote`, `Token`) improved runtime stability.
* ethers v6 offers robust AA compatibility aligned with future NERO tooling.
* Build performance matters: asset optimization directly affects UX.
* NERO’s modularity demands layered architecture—RPC, Paymaster, analytics APIs.
* Visual trust via design (hand-drawn assets) boosts adoption potential.

---

## Integration Details

| Integration     | Status         | Notes                                           |
| --------------- | -------------- | ----------------------------------------------- |
| NERO RPC        | ✅ Active       | Configurable via `config.ts`                    |
| Paymaster (0–2) | 🟡 Placeholder | Awaiting full API from NERO SDK                 |
| Hyperlane       | 🔜 Planned     | For cross-chain swaps using NERO's 130+ bridges |
| Datai Network   | 🔜 Planned     | For AI-powered Type 2 trade insights            |

---

## Roadmap

### Ecosystem Deepening

* ✅ WalletConnect, gas selection UX
* 🔜 Cross-chain swap with Hyperlane
* 🔜 Leaderboard: Samurai NFT gamification
* 🔜 AI integration (Datai)

### Scaling & Governance 

* 🔜 React Native app
* 🔜 NFT loan & Paymaster-based fee logic
* 🔜 Microtip via \$TOKEN + bundling
* 🔜 Eco-dashboard (NERO green API)

---

## Contributing

1. Fork & branch:
   `git checkout -b feature/your-feature`
2. Install & check:
   `npm install && npm run type-check`
3. Commit conventionally:
   `git commit -m "feat: your feature"`
4. Open a PR after `git push`
5. Ensure CI and tests pass.

---

##  Testing

* ✅ **Type Check**: `npm run type-check`
* 🔬 **Unit Tests**: (planned) via Jest & React Testing Library
* ⚙️ **Integration**: MetaMask simulations in browser
* 📊 **Performance**: Lighthouse audit post-build

---

## License

MIT — See [`LICENSE.md`](LICENSE.md)

---
