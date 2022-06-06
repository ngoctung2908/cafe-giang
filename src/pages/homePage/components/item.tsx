import { useState } from 'react'
import { Button } from 'components/button'
import { usePrivateSaleContract } from 'hooks/useContract'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/store'
import { open } from 'components/modal/walletModal/walletModalSlice'

import CafePng from 'assets/img/cafe1.jpeg'
import BusdSvg from 'assets/img/busd.svg'

const Item = ({ item, account }) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="rounded relative">
      <img src={CafePng} className="rounded-t" alt="cafe" />
      <div className="absolute rounded-b shadow-md bottom-0 left-0 w-full flex items-center justify-between px-5 py-3 bg-black bg-opacity-50">
        <span className="text-white flex items-center gap-x-1">
          <img src={BusdSvg} alt="busd" />
          {item.price}
        </span>
        {!account ? (
          <Button onClick={() => dispatch(open())}>Connect Wallet</Button>
        ) : (
          <Button onClick={() => {}}>Buy</Button>
        )}
      </div>
    </div>
  )
}

export default Item
