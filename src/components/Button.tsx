import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  const { className } = props
  return (
    <button
      {...props}
      className={`custom-button m-0 h-8 rounded-md border-[2px] border-black bg-transparent px-2 py-1 leading-none dark:border-[#cbd5e1] ${className || ''}`}
    >
      {children}
    </button>
  )
}

export default Button
