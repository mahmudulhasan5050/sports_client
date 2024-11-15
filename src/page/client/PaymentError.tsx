import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentError = () => {
  const navigate = useNavigate()
  return (
    <div>
      <p>Payment error</p>
      <button onClick={()=> navigate('/')}>Home</button>
    </div>
  )
}

export default PaymentError