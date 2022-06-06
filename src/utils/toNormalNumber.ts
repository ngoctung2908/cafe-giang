import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

const toNormalNumber = (value) => {
  return new BigNumber(value._hex).div(DEFAULT_TOKEN_DECIMAL).toString()
}

export default toNormalNumber
