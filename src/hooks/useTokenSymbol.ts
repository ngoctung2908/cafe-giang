import { useEffect, useState } from 'react'
import { useOneTripContract } from 'hooks/useContract'

const useTokenSymbol = () => {
  const oneTripContract = useOneTripContract()
  const [symbol, setSymbol] = useState<string>('')
  useEffect(() => {
    oneTripContract.symbol().then((res) => {
      setSymbol(res)
    })
  }, [oneTripContract])
  return { symbol }
}

export default useTokenSymbol
