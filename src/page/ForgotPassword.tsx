import React, { useState } from 'react'
import { axiosForgotPassword } from '../axios' // Import your axios function
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('')
    // const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axiosForgotPassword({ email })

            setTimeout(() => {
                if (res.data) {
                    navigate('/check-your-email')
                    setLoading(false)
                }
            }, 3000)
        } catch (err) {
            setError('Error sending reset link. Please try again.')
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4 mt-24 md:mt-40 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="w-[95%] max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold">Forgot Password</h2>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-center font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex justify-center items-center"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-t-white border-b-white border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>

                    <p className="text-center">
                        Remember your password?{' '}
                        <a href="/signin" className="text-sm text-blue-500 hover:underline">
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
