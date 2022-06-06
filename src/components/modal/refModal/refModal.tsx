import { useState, useCallback } from 'react'
import { usePrivateSaleContract } from 'hooks/useContract'
import Modal from '../modal'

import { Button } from 'components/button'

type RefModalProps = {
  open: boolean
  onClose: (value: boolean) => void
  onBuy: () => void
  wlTreasury: string
  onSetWlTreasury: (value: string) => void
}

export const RefModal = (props: RefModalProps) => {
  const { open, onClose, onBuy, wlTreasury, onSetWlTreasury } = props
  const [isValid, setIsValid] = useState<boolean>(true)
  const privateSaleContract = usePrivateSaleContract()
  const [pendingTx, setPendingTx] = useState<boolean>(false)

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    onSetWlTreasury(e.currentTarget.value)
  }, [])

  const handleSubmit = async () => {
    try {
      setPendingTx(true)
      if (wlTreasury === '') return
      const isExists = await privateSaleContract.WLtreasury(wlTreasury)
      setIsValid(isExists)
      setPendingTx(false)
      if (isExists) {
        onBuy()
        onClose(true)
      } else {
        setIsValid(false)
      }
    } catch (error) {
      setIsValid(false)
      setPendingTx(false)
      console.log(error)
    }
  }

  return (
    <Modal open={open}>
      <div className="bg-white px-8 pt-5 sm:p-8 pb-8">
        <div className="flex justify-between items-center" onClick={() => onClose(false)}>
          <h6 className="text-black leading-6 font-medium text-lg">
            Enter your leader wallet address
          </h6>
          <button className="outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-y-2 sm:items-start mt-5">
          <input
            type="text"
            value={wlTreasury}
            className="outline-none text-sm leading-5 bg-[#FBFDFF] rounded-[5px] border border-solid border-[#E1E5E8] px-3 py-2 w-full"
            placeholder="Wallet address"
            onChange={handleChange}
          />
          {!isValid && (
            <span className="text-red-400 text-sm">Referral wallet address does not exist</span>
          )}
          <div className="text-right w-full mt-3">
            <Button onClick={handleSubmit} isLoading={pendingTx}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
