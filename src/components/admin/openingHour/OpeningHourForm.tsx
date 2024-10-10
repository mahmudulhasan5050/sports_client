import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { OpeningHour } from '../../../types/OpeningHour';
import {
  axiosCreateOpeningHour,
  axiosFetchOpeningHourById,
  axiosUpdateOpeningHour,
} from '../../../axios';

type setRefreshType = {
  openingHourtId: string;
  setOpeningHourtId: (value: string) => void;
  setRefresh: (value: boolean) => void;
};

const FacilityForm = ({
  openingHourtId,
  setOpeningHourtId,
  setRefresh,
}: setRefreshType) => {
  const [formData, setFormData] = useState<OpeningHour>({
    day: '',
    open: '',
    close: '',
  });
  const [loading, setLoading] = useState(true);

  //edit
  useEffect(() => {
    // If editing, fetch the existing facility data
    const fetchOpeningHour = async () => {
      if (openingHourtId !== '') {
        try {
          const response = await axiosFetchOpeningHourById(openingHourtId);
          setFormData(response.data); 
        } catch (error) {
          console.error('Error fetching facility:', error);
        }
      }
      setLoading(false);
    };
    fetchOpeningHour();
  }, [openingHourtId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (openingHourtId !== '') {
        // Update existing facility
        await axiosUpdateOpeningHour(openingHourtId, formData);
        toast.success('Opening hour has been updated successfully!');
      } else {
        //create facility
        await axiosCreateOpeningHour(formData);
        toast.success('Opening hour has been created successfully!');
      }

      setRefresh(false);
      setOpeningHourtId('');
    } catch (err) {
      toast.error('Failed to create opening hour. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full'
      >
        <h2 className='text-2xl font-bold text-gray-700 mb-6 text-center'>
          Create Opening Hour
        </h2>

        {/* Day */}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name of the day
          </label>
          <input
            id='day'
            name='day'
            type='text'
            value={formData.day}
            onChange={handleChange}
            placeholder='Enter day name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* open */}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Opening Time
          </label>
          <input
            id='open'
            name='open'
            type='text'
            value={formData.open}
            onChange={handleChange}
            placeholder='Enter opening time'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* close */}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Closing Time
          </label>
          <input
            id='close'
            name='close'
            type='text'
            value={formData.close}
            onChange={handleChange}
            placeholder='Enter closing time'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* Submit Button */}
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacilityForm;
