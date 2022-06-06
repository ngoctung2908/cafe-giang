import { useState } from 'react'
import { usePrivateSaleContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import useTokenSymbol from 'hooks/useTokenSymbol'

import PoolInfo from './components/poolInfo'
import BuyTokenPanel from './components/buyTokenPanel'
import UserInfo from './components/userInfo'
import Item from './components/item'

const PID = 0
export const HomePage = () => {
  const { account } = useWeb3React()

  const items = [...Array(10)].map((_, i) => ({
    id: new Date().getTime() + i,
    price: Math.round(Math.random() * (150 - 50) + 50),
  }))

  return (
    <div className="bg-white bg-opacity-70 rounded p-5">
      <h1 className="text-xl font-semibold">Welcome to Giang Cafe NFT</h1>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
        {items.map((item) => {
          return <Item key={item.id} item={item} account={account} />
        })}
      </div>
    </div>
  )
}
