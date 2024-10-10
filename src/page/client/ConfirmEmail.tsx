import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { axiosEmailConfirm } from '../../axios';

const ConfirmEmail = () => {
const {token} = useParams<{token: string}>()
const [confirmationMessage, setConfirmationMessage] = useState('Verifying...');
const navigate = useNavigate();

useEffect(() => {
    const confirmEmail = async () => {
      try {
        if(token){
            const response = await axiosEmailConfirm(token)
            setConfirmationMessage(response.data.message);
        }
      } catch (error) {
        setConfirmationMessage('Error confirming email. Please try again.');
      }
    };

    confirmEmail();
  }, [token]);

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
    <h1 className='text-2xl font-bold'>{confirmationMessage}</h1>
    {confirmationMessage.includes('Email confirmed') && (
      <button
        onClick={handleLoginRedirect}
        className='mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600'
      >
        Go to Login
      </button>
    )}
  </div>
  )
}

export default ConfirmEmail