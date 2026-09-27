import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-viem'
import '@nomicfoundation/hardhat-verify'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

const rawPrivateKey = process.env.PRIVATE_KEY
const PRIVATE_KEY = rawPrivateKey
  ? rawPrivateKey.startsWith('0x')
    ? rawPrivateKey
    : `0x${rawPrivateKey}`
  : '0x0000000000000000000000000000000000000000000000000000000000000000'

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.28',
    settings: {
      optimizer: { enabled: true, runs: 2000 },
      viaIR: true,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
    ignition: './ignition',
  },
  networks: {
    hardhat: { chainId: 1337 },
    celo: {
      url: process.env.CELO_RPC_URL || 'https://forno.celo.org',
      accounts: [PRIVATE_KEY],
      chainId: 42220,
    },
    celoSepolia: {
      url: process.env.CELO_SEPOLIA_RPC_URL || 'https://forno.celo-sepolia.celo-testnet.org',
      accounts: [PRIVATE_KEY],
      chainId: 11142220,
    },
    base: {
      url: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
      accounts: [PRIVATE_KEY],
      chainId: 8453,
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
      accounts: [PRIVATE_KEY],
      chainId: 84532,
    },
    'robinhoodchain-testnet': {
      url: process.env.ROBINHOOD_TESTNET_RPC_URL || 'https://rpc.testnet.chain.robinhood.com',
      accounts: [PRIVATE_KEY],
      chainId: 46630,
    },
  },
  etherscan: {
    apiKey: process.env.CELOSCAN_API_KEY || process.env.BASESCAN_API_KEY || '',
    customChains: [
      {
        network: 'celo',
        chainId: 42220,
        urls: { apiURL: 'https://api.celoscan.io/api', browserURL: 'https://celoscan.io' },
      },
      {
        network: 'celoSepolia',
        chainId: 11142220,
        urls: {
          apiURL: 'https://api-sepolia.celoscan.io/api',
          browserURL: 'https://celo-sepolia.blockscout.com',
        },
      },
      {
        network: 'base',
        chainId: 8453,
        urls: { apiURL: 'https://api.basescan.org/api', browserURL: 'https://basescan.org' },
      },
      {
        network: 'robinhoodchain-testnet',
        chainId: 46630,
        urls: {
          apiURL: 'https://explorer.testnet.chain.robinhood.com/api',
          browserURL: 'https://explorer.testnet.chain.robinhood.com',
        },
      },
    ],
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
    currency: 'USD',
  },
}

export default config
