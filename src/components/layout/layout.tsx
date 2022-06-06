import { Outlet } from 'react-router-dom'
import { RootState } from 'store/store'
import { useSelector } from 'react-redux'
import Header from './header'
import { WalletModal } from './../modal/walletModal'
import bgPng from 'assets/img/background.png'

export const Layout = () => {
  const open = useSelector((state: RootState) => state.walletModal.open)
  return (
    <div
      className="bg-[#B5D8F8] min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url('http://cafegiang.vn/wp-content/uploads/photo0jpg.jpg')` }}
    >
      <Header />
      <div className="max-w-screen-2xl py-5 md:px-14">
        <Outlet />
      </div>
      <WalletModal open={open} />
    </div>
  )
}
