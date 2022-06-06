import { format } from 'date-fns'

const PoolInfo = ({ poolInfo, symbol }) => {
  return (
    <div>
      <h1 className="text-[#03294E] text-2xl md:text-[44px] font-bold">
        Open for sale of {symbol}
      </h1>
      <div className="md:mt-2 flex md:gap-x-5 justify-between md:justify-start">
        <span className="text-[#606569] text-xs md:text-[22px] font-semibold leading-7">
          {format(poolInfo.startTime * 1000, 'Pp')} (UTC)
        </span>
        -
        <span className="text-[#606569] text-xs md:text-[22px] font-semibold leading-7">
          {format(poolInfo.endTime * 1000, 'Pp')} (UTC)
        </span>
      </div>
    </div>
  )
}

export default PoolInfo
