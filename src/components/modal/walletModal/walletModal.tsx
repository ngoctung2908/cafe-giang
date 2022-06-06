import { connectors } from 'utils/web3React'
import useAuth from 'hooks/useAuth'
import Modal from '../modal'
import { useDispatch } from 'react-redux'
import { close } from '../walletModal/walletModalSlice'

import metamaskSvg from 'assets/img/metamask.svg'
import bscSvg from 'assets/img/bsc.svg'
import mathWalletkSvg from 'assets/img/mathwallet.svg'
import safepalSvg from 'assets/img/safepal.svg'
import trustWalletSvg from 'assets/img/trust.svg'
import walletConnectSvg from 'assets/img/walletconnect.svg'
import tokenpocketSvg from 'assets/img/tokenpocket.svg'

type WalletModalProps = {
  open: boolean
}

const WALLETS = [
  { name: 'Metamask', icon: metamaskSvg, provider: 'injected' },
  { name: 'WalletConnect', icon: walletConnectSvg, provider: 'walletConnect' },
  { name: 'Binance Chain Wallet', icon: bscSvg, provider: 'bscWallet' },
  { name: 'TrustWallet', icon: trustWalletSvg, provider: 'injected' },
  { name: 'MathWallet', icon: mathWalletkSvg, provider: 'injected' },
  { name: 'TokenPocket', icon: tokenpocketSvg, provider: 'injected' },
  { name: 'Safepal Wallet', icon: safepalSvg, provider: 'injected' },
]

export const WalletModal = (props: WalletModalProps) => {
  const { open } = props
  const { login } = useAuth()
  const dispatch = useDispatch()

  const setProvider = (type) => {
    window.localStorage.setItem('provider', type)
  }

  return (
    <Modal open={open}>
      <div className="bg-white px-8 pt-5 sm:p-8 pb-8">
        <div className="flex justify-between items-center" onClick={() => dispatch(close())}>
          <h6 className="text-black leading-6 font-medium text-lg">Connect to wallet</h6>
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
          {WALLETS.map((wallet) => {
            return (
              <button
                onClick={() => {
                  login(connectors[wallet.provider])
                  setProvider(wallet.provider)
                  dispatch(close())
                }}
                key={wallet.name}
                className="flex items-center justify-between bg-[#E0EFFF] border-none rounded-[10px] w-full px-4 py-2 text-[#111827] leading-6 hover:opacity-90 text-lg font-medium"
              >
                {wallet.name} <img className="w-10 h-10" src={wallet.icon} alt="" />
              </button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
