import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import addresses from 'config/constants/contracts'
import privateSaleAbi from 'config/abi/privateSale.json'
import oneTripAbi from 'config/abi/oneTrip.json'
import oneUsdtAbi from 'config/abi/oneUsdt.json'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'

import { getContract, getContractAddress } from 'utils'

const useContract = (
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null => {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export const usePrivateSaleContract = (): Contract | null => {
  return useContract(getContractAddress(addresses.privateSale), privateSaleAbi, true)
}

export const useOneTripContract = (): Contract | null => {
  return useContract(getContractAddress(addresses.oneTrip), oneTripAbi, true)
}

export const useOneUsdtContract = (): Contract | null => {
  return useContract(getContractAddress(addresses.oneUsdt), oneUsdtAbi, true)
}

export const useTokenBuyContract = (address: string): Contract | null => {
  return useContract(address, oneTripAbi, true)
}
