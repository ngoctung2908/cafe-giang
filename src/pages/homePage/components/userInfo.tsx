import { useEffect, useState } from 'react'
import { usePrivateSaleContract } from 'hooks/useContract'
import { useDispatch } from 'react-redux'
import { fetchUserBalance } from '../../homePage/userSlice'
import { AppDispatch } from 'store/store'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import ClaimItem from './claimItem'

const UserInfo = ({ pid, account, symbol }) => {
  const privateSaleContract = usePrivateSaleContract()
  const dispatch = useDispatch<AppDispatch>()
  const balance = useSelector((state: RootState) => state.user.value)
  const [isBuyer, setIsBuyer] = useState<boolean>(false)
  const [claimList, setClaimList] = useState([])
  const [totalPercent, setTotalPercent] = useState<number>(0)
  const [refreshData, setRefreshData] = useState<boolean>(false)

  useEffect(() => {
    if (account) {
      dispatch(fetchUserBalance({ account, pid, contract: privateSaleContract }))
    }
  }, [account, dispatch, privateSaleContract, pid])

  useEffect(() => {
    const checkIsBuyer = async () => {
      const resp = await privateSaleContract.isBuyer(account, pid)
      setIsBuyer(resp)
      if (resp) {
        const resp = await privateSaleContract.userIndex(pid, account)
        const listPeriodPercent = await privateSaleContract.getPeriodPercent(pid)
        if (listPeriodPercent.length > 0) {
          let tempTotalPercent = 0
          const tempData = listPeriodPercent.map((value, index) => {
            if (index < Number(resp._hex)) {
              tempTotalPercent += Number(value._hex)
            }
            const res = {
              index,
              percent: Number(value._hex),
              claimed: index < Number(resp._hex) ? true : false,
            }
            return res
          })
          setClaimList(tempData)
          setTotalPercent(tempTotalPercent)
        }
      }
    }

    if (account) {
      checkIsBuyer()
    }
  }, [account, pid, privateSaleContract, balance, refreshData])

  return (
    <div className="bg-[#FBFDFF] rounded-tl-[5px] rounded-tr-[5px] p-6">
      <p className="text-[#03294E] font-medium">
        Your balance:{' '}
        <span className="inline-block ml-6">
          {balance} {symbol}
        </span>
      </p>
      {isBuyer && (
        <>
          <p className="text-[#03294E] font-medium mt-4">
            Claimed:{' '}
            <span className="inline-block ml-6">
              {(totalPercent * balance) / 100}/{balance} {symbol}
            </span>
          </p>
          <div className="mt-3 shadow-md overflow-x-auto">
            <div className="min-w-[500px] grid grid-cols-4 gap-x-1 md:gap-x-8 bg-[#F5F6F7] px-6 py-3 border-b border-[#E1E5E8]">
              <span className="text-[#606569] text-sm">Claimable</span>
              <span className="text-[#606569] text-sm">Percent(%)</span>
              <span className="text-[#606569] text-sm">Status</span>
              <span className="text-[#606569] text-sm"></span>
            </div>
            {claimList.length > 0 &&
              claimList.map((claim) => {
                return (
                  <ClaimItem
                    key={claim.index}
                    claimInfo={claim}
                    balance={balance}
                    pid={pid}
                    onRefreshData={setRefreshData}
                    symbol={symbol}
                  />
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}

export default UserInfo
