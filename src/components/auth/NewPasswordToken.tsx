import { validToken } from '@/services/AuthApi';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
}

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {
  const mutation = useMutation({
    mutationFn: validToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
      setIsValidToken(true)
    }
  })
  
  const handleChange = (token: string) => { setToken(token) }
  const handleComplete = (token: string) => { mutation.mutate(token) }

  return (
    <>
      <form
        className="space-y-4"
      >
        <label
          className="font-normal text-2xl text-center block"
        >6-digit Code</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/forgot-password'
          className="text-center text-gray-300 font-normal"
        >
          Request a new code
        </Link>
      </nav>
    </>
  )
}