import { ReactNode } from "react"

type ErrorMessageProps = {
  children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="text-red-500 font-bold">
      {children}
    </p>
  )
}
