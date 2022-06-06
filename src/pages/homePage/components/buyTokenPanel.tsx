import { useState, useCallback, Fragment } from 'react'
import { ethers } from 'ethers'
import { isAfter } from 'date-fns'
import toNormalNumber from 'utils/toNormalNumber'
import NumberFormat from 'react-number-format'
import { usePrivateSaleContract, useOneUsdtContract } from 'hooks/useContract'
import addresses from 'config/constants/contracts'
import { getContractAddress } from 'utils'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { open } from 'components/modal/walletModal/walletModalSlice'
import { fetchUserBalance } from '../../homePage/userSlice'
import { AppDispatch } from 'store/store'
import { Button } from 'components/button'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { RefModal } from 'components/modal/refModal'

const tokenLst = [{ name: 'BUSD' }, { name: 'USDT' }]

const BuyTokenPanel = ({ pid, poolInfo, account, symbol }) => {
  const [buyAmount, setBuyAmount] = useState<string>('')
  const [tokenAmount, setTokenAmount] = useState<number | string>('')
  const [isValid, setIsValid] = useState<boolean>(true)
  const [pendingTx, setPendingTx] = useState(false)
  const [wlTreasury, setWlTreasury] = useState<string>('')
  const [openRefModal, setOpenRefModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState(tokenLst[0])
  const thousandSeparator = true
  const rate = toNormalNumber(poolInfo.tokenBuy2IDOtoken)
  const dispatch = useDispatch<AppDispatch>()

  const isEndPrivateSale = isAfter(poolInfo.endTime * 1000, new Date())

  const privateSaleContract = usePrivateSaleContract()
  const oneUsdtContract = useOneUsdtContract()

  const handleCloseRefModal = (value) => {
    setOpenRefModal(false)
    setPendingTx(value)
  }

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setBuyAmount(e.currentTarget.value)
        const value = Number(e.currentTarget.value.replace(/,/g, ''))
        const amount = value / Number(rate)
        setTokenAmount(amount)
        if (amount >= Number(toNormalNumber(poolInfo.minAmount))) {
          setIsValid(false)
        } else {
          setIsValid(true)
        }
      }
    },
    [setBuyAmount, poolInfo, rate]
  )

  const checkAllowance = async () => {
    const allowance = await oneUsdtContract.allowance(
      account,
      getContractAddress(addresses.privateSale)
    )

    return Number(toNormalNumber(allowance))
  }

  const handleBuyToken = async () => {
    try {
      setPendingTx(true)
      const amount = ethers.utils.parseEther(tokenAmount.toString())
      const allowance = await checkAllowance()

      if (allowance < tokenAmount) {
        const tx = await oneUsdtContract.approve(getContractAddress(addresses.privateSale), amount)
        await tx.wait()
      }
      setOpenRefModal(true)
      setPendingTx(false)
    } catch (err) {
      setPendingTx(false)
    }
  }

  const handleConfirmBuy = async () => {
    try {
      setPendingTx(true)
      const amount = ethers.utils.parseEther(tokenAmount.toString())
      const transaction = await privateSaleContract.buy(pid, amount, wlTreasury)
      await transaction.wait()

      setPendingTx(false)
      toast.success(`Buy ${symbol} successful`, {
        autoClose: 3000,
        hideProgressBar: true,
      })
      setBuyAmount('')
      setTokenAmount(0)

      dispatch(fetchUserBalance({ account, pid, contract: privateSaleContract }))
    } catch (error) {
      setPendingTx(false)
      toast.error(error['error'].data.message, {
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  return (
    <div className="w-full">
      <div className="bg-[#FBFDFF] w-full rounded-tr-[5px] rounded-tl-[5px] p-6">
        <p className="text-[#03294E] font-medium text-lg">Buy private sale {symbol}</p>
        <p className="text-sm text-[#606569]">
          1 {symbol} ≈ {rate} USDT
        </p>
        <div className="mt-3 flex flex-col md:gap-y-0 md:flex-row md:gap-x-5 items-center">
          <div className="w-full max-w-xs md:w-auto text-sm leading-5 bg-[#FBFDFF] rounded-[5px] border border-solid border-[#E1E5E8] px-3 py-2 flex items-center flex-1">
            <NumberFormat
              className="bg-transparent text-sm leading-5 focus:outline-none flex-1"
              value={buyAmount}
              onChange={handleChange}
              placeholder="0.00"
              thousandSeparator={thousandSeparator}
            />
            <Listbox value={selectedToken} onChange={setSelectedToken}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default bg-transparent pl-3 pr-7 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selectedToken.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {tokenLst.map((token, tokenIdx) => (
                      <Listbox.Option
                        key={tokenIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-3 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={token}
                      >
                        {({ selected }) => (
                          <span
                            className={`block truncate ${
                              selectedToken ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {token.name}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <span className="text-[#1D8DFF] rotate-90 md:rotate-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div className="w-full max-w-xs md:w-auto text-sm leading-5 bg-[#FBFDFF] rounded-[5px] border border-solid border-[#E1E5E8] px-3 py-2 flex items-center flex-1">
            <input
              type="text"
              value={tokenAmount.toLocaleString('en', {
                maximumFractionDigits: 2,
              })}
              className="bg-transparent text-sm leading-5 focus:outline-none flex-1"
              readOnly
              placeholder="0.00"
            />
            {symbol}
          </div>
        </div>
        <p className="text-red-400 text-sm">
          Min amount: {toNormalNumber(poolInfo.minAmount)} {symbol}
        </p>
      </div>
      <div className="text-right px-6 py-3 rounded-br-[5px] rounded-bl-[5px] bg-[#F5F6F7]">
        {!account ? (
          <Button onClick={() => dispatch(open())}>Connect Wallet</Button>
        ) : (
          <Button
            onClick={handleBuyToken}
            isDisabled={isValid || !isEndPrivateSale}
            isLoading={pendingTx}
          >
            Buy
          </Button>
        )}
      </div>
      <RefModal
        open={openRefModal}
        onClose={handleCloseRefModal}
        onBuy={handleConfirmBuy}
        wlTreasury={wlTreasury}
        onSetWlTreasury={setWlTreasury}
      />
    </div>
  )
}

export default BuyTokenPanel
