import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { axiosVerifyPayment } from '../../axios';

const PaymentSuccess = () => {
    const {session_id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
const verifyPayment = async(session_id:string) =>{
try {
    const res = await axiosVerifyPayment(session_id)
    if(res.data.payment===true){
        console.log('payment successful')
    }else{
        console.log('Not success')
    }

} catch (error) {
    toast.error('Something went wrong during payment process.')
    navigate('/')
}
}
if(session_id){
    verifyPayment(session_id)
}
    },[session_id, navigate])
  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess