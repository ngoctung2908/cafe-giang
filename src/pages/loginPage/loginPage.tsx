export const LoginPage = () => {
  return (
    <div className="p-5 min-h-screen">
      <div className="login-card-shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg bg-gray-200 h-96 w-96">
        <h6 className="text-black text-center text-2xl font-bold">Trip Marketplace</h6>
        <div className="flex flex-col mt-5">
          <input type="text" className="p-2 rounded-sm" placeholder="Email" />
          <input type="password" className="p-2 rounded-sm t mt-5" placeholder="Password" />
          <div className="text-right mt-8">
            <button
              type="submit"
              className="text-sm leading-5 text-white py-3 px-4 bg-blue-700 rounded-sm"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
