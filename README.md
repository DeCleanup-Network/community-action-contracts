# Community Action Contracts

Onchain verification contracts for real-world community action protocols.

Submit evidence → verifier attests → reward mints.

Used in production by [DeCleanup Network](https://decleanup.net) on Celo and Base.

## What this is

A set of modular Solidity contracts implementing a peer-verification loop for physical, real-world actions. Any community that needs tamper-proof, fraud-resistant records of participation can fork this.

## Fork this to build

- Environmental cleanup verification
- Tree planting and reforestation registries
- Citizen science data collection
- Community contribution tracking
- Any protocol where real-world actions need onchain proof

## Contracts

| Contract | Purpose |
|---|---|
| `ActionSubmission.sol` | Submission lifecycle: evidence hash, verifier approve/reject, status transitions |
| `RewardManager.sol` | Participation ledger: tracks points off-ERC20 to prevent speculative minting |
| `ClaimVault.sol` | EIP-712 signed claims: backend signs, contract validates, ERC-20 mints with category caps |
| `ImpactProductNFT.sol` | Dynamic soulbound NFT: level progression tied to verified action count |

## Architecture decision: why EIP-712 signed claims

Rewards are not minted on user action. A trusted backend signer issues EIP-712 signed claim messages. ClaimVault validates the signature and enforces per-category caps before minting.

This prevents drain attacks, removes speculative minting risk, and keeps the reward supply tied to real verified activity rather than contract calls.

## Reference deployment

DeCleanup Network on Celo mainnet (chain 42220) and Base mainnet (chain 8453).
See `examples/cleanup/deployed_addresses.json`.

## Stack

Solidity · Hardhat · OpenZeppelin · EIP-712 · ERC-1155 (Hypercerts compatible)

## License

MIT
