import { useState } from 'react'
import { Button } from 'components/button'
import { usePrivateSaleContract } from 'hooks/useContract'
import { toast } from 'react-toastify'

const ClaimItem = ({ claimInfo, balance, pid, onRefreshData, symbol }) => {
  const [pendingTx, setPendingTx] = useState<boolean>(false)
  const privateSaleContract = usePrivateSaleContract()

  const handleClaimToken = async () => {
    try {
      setPendingTx(true)
      const transaction = await privateSaleContract.claim(pid)
      await transaction.wait()
      setPendingTx(false)
      onRefreshData(true)
      toast.success(`Claim ${symbol} successful`, {
        autoClose: 3000,
        hideProgressBar: true,
      })
    } catch (error) {
      console.log(error)
      setPendingTx(false)
      toast.error(error['error'].data.message, {
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }
  return (
    <div className="min-w-[500px] grid grid-cols-4 items-center gap-x-1 md:gap-x-8 p-6">
      <span className="text-[#03294E] text-sm">
        {(claimInfo.percent * balance) / 100} {symbol}
      </span>
      <span className="text-[#03294E] text-sm">{claimInfo.percent}</span>
      <p>
        {claimInfo.claimed ? (
          <span className="text-[#147D6F] text-sm bg-[#E1FBF4] py-1 px-3 rounded-[130px]">
            Success
          </span>
        ) : (
          <span className="text-[#0577A0] text-sm bg-[#E4F9FF] py-1 px-3 rounded-[130px]">
            Waiting
          </span>
        )}
      </p>
      <div className="text-right">
        <Button onClick={handleClaimToken} isDisabled={claimInfo.claimed} isLoading={pendingTx}>
          Claim
        </Button>
      </div>
    </div>
  )
}

export default ClaimItem
