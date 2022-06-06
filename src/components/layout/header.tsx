import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import truncateHash from 'utils/truncateHash'
import useAuth from 'hooks/useAuth'
import { useDispatch } from 'react-redux'
import { open } from '../modal/walletModal/walletModalSlice'
import logoPng from 'assets/img/logo.png'

const Header = () => {
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const dispatch = useDispatch()

  return (
    <div className="px-5 md:px-[85px] py-[15px] bg-[#F5FAFF] flex justify-between md:justify-center items-center">
      <Link to="/">
        <img src={logoPng} className="max-w-[70px] md:max-w-[110px]" alt="logo" />
      </Link>
      <ul className="flex gap-x-8 md:absolute md:right-14">
        <li>
          {account ? (
            <div className="flex gap-x-4 items-center">
              <span className="text-[#03294E] font-medium leading-6">
                {truncateHash(account, 8, 4)}
              </span>
              <button
                onClick={logout}
                className="bg-[#1D8DFF] shadow-btn text-sm font-bold leading-6 rounded-[10px] text-[#FBFDFF] flex gap-x-[10px] items-center py-[7px] px-4 border border-solid border-[#E1E5E8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(open())}
              className="bg-[#1D8DFF] shadow-btn border-[#E1E5E8] border border-solid rounded-[10px] py-[7px] px-4 text-[#FBFDFF] text-sm tracking-[1px] leading-6 font-bold hover:opacity-90 transition-all"
            >
              Connect Wallet
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Header
