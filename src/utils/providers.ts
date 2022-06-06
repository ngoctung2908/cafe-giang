import { ethers } from 'ethers'

const RPC_URL =
  process.env.REACT_APP_NODE ||
  'https://speedy-nodes-nyc.moralis.io/0a41beec5ebe6d8a355908b7/bsc/testnet'

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)
