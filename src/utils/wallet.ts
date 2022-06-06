/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '97', 10)
    try {
      const resp = await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'BSC testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: [process.env.REACT_APP_NODE],
            blockExplorerUrls: [process.env.REACT_APP_BLOCK_EXPLORER_URL],
          },
        ],
      })
      console.log(resp)
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error(
      "Can't setup the Harmory network on metamask because window.ethereum is undefined"
    )
    return false
  }
}
