# INU Cash applications

One Firebase Hosting bundle contains the landing site and one Trade app.

## Run locally

Use Node.js 22 and npm. From this directory:

```sh
npm run setup
npm start                 # Landing site, port 4200
npm run start:swap        # Swap, port 3000
npm run start:exchange    # Exchange, port 3002
```

For an integrated preview, including landing-page links:

```sh
npm run preview
```

Wait for `All apps ready`, then open `http://localhost:4181/`, `/trade/`. This command builds all apps before serving them; restart it after source changes. Trade contains Swap and Pools tabs, using the implementation in `trading/swap`. The old `/swap/` and `/exchange/` URLs redirect to Trade.

## Configuration

Copy `trading/swap/.env.example` to `trading/swap/.env.local` to configure an
Ethereum mainnet JSON-RPC endpoint with `REACT_APP_RPC_URL`. The public endpoint
is a convenience default and can be rate limited. All `REACT_APP_*` variables
are public browser configuration, never secrets. Developer-specific environment
files were not migrated.

Supported: Ethereum mainnet and injected browser wallets, including MetaMask.
Obsolete WalletConnect v1, Portis, and Fortmatic options are not offered as
working connections. WalletConnect v2 is not implemented. No INU token address
or liquidity deployment is assumed or fabricated.

## Verification

```sh
npm --prefix trading/swap run typecheck
npm run test:trading
npm run build
```

Contract types are generated from installed ABIs using a platform-independent
Node script. The legacy CRA 4 build uses Node's OpenSSL compatibility flag and
disables Node's experimental fetch only in the build process to work around
its old source-map WASM loader. Browser fetch remains available.

## Deployment

```sh
npm run deploy
```

Always deploy the combined build. Firebase serves `/trade/`
before the Angular fallback. The landing service worker excludes trading
navigation. GitHub workflows build all apps. The configured Firebase project
is `chriseugenerodriguez`, using Hosting site `chriseugenerodriguez-inucash`.

## Provenance and limitations

The trading interface is adapted from the existing local fork of
[Uniswap/interface](https://github.com/Uniswap/interface), under its included
GPL-3.0-or-later license. It is a private npm application, not a published
`@uniswap/interface` package. Uniswap's SDK and contract packages remain npm
dependencies. INU Exchange shares this implementation instead of the old
exchange folder's placeholder services and inert Swap button.

This repair is not a protocol/security audit or token launch. The legacy
dependency tree has known npm audit findings and needs a separate dependency
modernization review before a production trading release. No real-money
transaction is required to build or test the site.

## Personal demo data

The landing site reads optional market content from Personal Supabase schema `inucash` using public, read-only configuration in `app/src/assets/personal-demo.json`. No saved market quote existed to migrate; missing data stays unavailable instead of becoming invented prices. The obsolete `/api/c/` backend dependency and embedded provider key were removed. Wallet state remains local; no auth accounts or wallet records are migrated. Firebase Hosting remains on Personal, including `/trade/`.
