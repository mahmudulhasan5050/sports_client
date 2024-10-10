import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosResetPassword } from '../axios'; // Import your axios function

const ResetPassword = () => {
    const { token } = useParams<{ token: string }>();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const res = await axiosResetPassword(token!, { password });
            if (res.data) {
                setMessage('Password has been reset. You can now sign in.');
                setTimeout(() => {
                    navigate('/signin'); // Redirect to SignIn after successful reset
                }, 3000);
            }
        } catch (err) {
            setError('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold">Reset Password</h2>

                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="space-y-2">
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
