import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { SignInType } from '../types/User'
import { axiosSignIn } from '../axios'
import { saveToken } from '../utils/cookiesFunc'
import { useUser } from '../context/UserContext'

const SignIn = () => {
    const [formData, setFormData] = useState<SignInType>({
        email: '',
        password: ''
    })

    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { userCTX, setUserCTX } = useUser()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axiosSignIn(formData)
            if (res.data) {
                saveToken(res.data)
                setUserCTX({
                    name: res.data.name,
                    role: res.data.role
                })
                const localStorageBooking = localStorage.getItem('booking')
                // When user is signin during booking process or user login other situation
                if (localStorageBooking) {
                    navigate('/booking-summary')
                } else {

                    navigate('/')
                }
            }
        } catch (err) {
            // Handle error
            setError('Invalid credentials. Please try again.')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold">Sign In</h2>

                {error && <p className="text-red-500">{error}</p>}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
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
                    <label className="block text-sm font-medium">Password</label>
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
    )
}

export default SignIn
