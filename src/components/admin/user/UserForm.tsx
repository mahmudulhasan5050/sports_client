import React, { useEffect, useState } from 'react'
import { User } from '../../../types/User'
import { axiosEditUser, axiosUserById } from '../../../axios'
import toast from 'react-hot-toast'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'

type SetRefreshType = {
    userId: string
    setUserId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const UserForm = ({ userId, setUserId, setRefresh }: SetRefreshType) => {
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        role: undefined
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // If editing, fetch the existing facility data
        const fetchUser = async () => {
            if (userId !== '') {
                try {
                    const response = await axiosUserById(userId)
                    setFormData(response.data) // Pre-fill the form with the fetched data
                } catch (error) {
                    console.error('Error fetching facility:', error)
                }
            }
            setLoading(false)
        }
        fetchUser()
    }, [userId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {

                await axiosEditUser(userId, formData)
                toast.success('User has been updated successfully!')

            setRefresh(false)
            setUserId('')
        } catch (err) {
            toast.error('Failed to update user. Please try again.')
        }
    }
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
          <strong className="text-gray-700 font-bold text-center">Edit User</strong>
          <form
            onSubmit={handleSubmit}
            className='bg-white p-8 rounded-lg shadow-md w-full'
          >
            {/* User Name */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Role
              </label>
              <select
                id='role'
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              >
                <option value=''>Select Type</option>
                {
                  ['non-member', 'member'].map((roleItem, index) => (
                    <option key={index} value={roleItem}>
                      {firstLetterUpperCase(roleItem)}
                    </option>
                  ))}
              </select>
            </div>
    
            {/* Court Number */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
               Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter name'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
    
            {/* Price */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter email'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
    
            {/* Submit Button */}
            <div className='flex items-center justify-end gap-3'>
            <button
               onClick={()=>{
                setRefresh(false)
                setFormData({
                  name: '',
                  email: '',
                  role: undefined,
                })
              }}
                className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Back
              </button>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
}

export default UserForm
