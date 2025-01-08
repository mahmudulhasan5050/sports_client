import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import { SignInType } from '../types/User'
import { axiosGoogleSignIn, axiosSignIn } from '../axios'
import { saveToken, tokenDecodeFunc } from '../utils/cookiesFunc'
import { useUser } from '../context/UserContext'

const SignIn = () => {
    const [formData, setFormData] = useState<SignInType>({
        email: '',
        password: ''
    })

    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { userCTX, setUserCTX } = useUser()

    useEffect(() => {
        if (userCTX?.role === 'admin') {
            navigate('/admin')
        }
    }, [userCTX, navigate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axiosSignIn(formData)
     
                if (res.data) {
              
                    const userFromToken = tokenDecodeFunc(res.data)
                    setUserCTX({
                        name: userFromToken.name,
                        role: userFromToken.role
                    })
                }

            saveToken(res.data)
            userCTX && userCTX.role === 'admin' && navigate('/admin')
            const localStorageBooking = localStorage.getItem('booking')

            // When user is signin during booking process or user login other situation
            if (localStorageBooking) {
                navigate('/booking-summary')
            } else {
                navigate('/')
            }
        } catch (err) {
            // Handle error
            setError('Invalid credentials. Please try again.')
        }
    }

    const handleGoogleSignin = () => {
        window.location.href = `${process.env.REACT_APP_API}/auth/google`
    }

    return (
        <div className="flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 space-y-4 mt-32 md:mt-40 shadow-lg rounded-lg">
                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleSignin}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring"
                >
                    <FcGoogle className="w-5 h-5 mr-2" />
                    Sign in with Google
                </button>

                {/* Sign-In Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>

                    {error && <p className="text-center text-red-500">{error}</p>}

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Sign In
                    </button>

                    <p className="text-center">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-sm text-blue-500 hover:underline">
                            Register
                        </a>
                    </p>

                    <p className="text-center">
                        Forgot your password?{' '}
                        <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                            Reset Password
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignIn
