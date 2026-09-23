# INU Exchange

This is an entry point into the shared trading implementation in `../swap`.
`npm start` runs it on port 3002; `npm run build` produces `build/`.

The unified build serves the same code under `/exchange/`, which opens the
liquidity positions view. Swap and pool routes share wallet state, quotes,
approval checks, and transaction handling. See the root README for setup,
supported wallets, configuration, and limits.
