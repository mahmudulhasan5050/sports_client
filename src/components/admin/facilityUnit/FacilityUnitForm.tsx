import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { FacilityUnit } from '../../../types/FacilityUnit';
import { axiosCreateFacilityUnit } from '../../../axios';

type setRefreshType = {
  setRefresh: (value: boolean) => void;
};

const FacilityUnitForm = ({ setRefresh }: setRefreshType) => {
  const [formData, setFormData] = useState<FacilityUnit>({
    name: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosCreateFacilityUnit(formData);

      setRefresh(false);
      toast.success('Facility Unit created successfully!');
    } catch (err) {
      toast.error('Failed to create Facility Unit. Please try again.');
    }
  };
  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
       <strong className="text-gray-700 font-bold text-center">Create Facility Unit</strong>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full'
      >
        {/* Facility Name */}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Facility Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter facility name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* Submit Button */}
        <div className='flex items-center justify-end gap-3'>
        <button
           onClick={()=>setRefresh(false)}
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
};

export default FacilityUnitForm;
