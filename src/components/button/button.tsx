import React from 'react'

type ButtonProps = {
  onClick: () => void
  children?: React.ReactNode
  isLoading?: boolean
  isDisabled?: boolean
}

export const ButtonType = {
  default:
    'px-4 py-2 focus:outline-none leading-6 text-[#FBFDFF] text-sm font-bold rounded-[10px] transition-all bg-[#1D8DFF] hover:opacity-90',
  disabled:
    'px-4 py-2 leading-6 text-[#FBFDFF] text-sm font-bold rounded-[10px] transition-all bg-gray-400 pointer-events-none cursor-not-allowed',
  loading:
    'ml-auto flex items-center justify-center py-2 px-5 rounded-[10px] text-gray-700 pointer-events-none bg-gray-400 transition ease-in-out duration-150 cursor-not-allowed',
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={
        isLoading ? ButtonType.loading : isDisabled ? ButtonType.disabled : ButtonType.default
      }
    >
      {isLoading ? (
        <>
          {' '}
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Waiting...
        </>
      ) : (
        children
      )}
    </button>
  )
}
