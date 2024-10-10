import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert';
import { FacilityUnit } from '../../../types/FacilityUnit';
import {
  axiosFetchFacilityUnits,
  axiosDeleteFacilityUnit,
} from '../../../axios';

type setRefreshType = {
  refresh: boolean;
  setRefresh: (value: boolean) => void;
};

const FacilityUnitDisplay = ({ refresh, setRefresh }: setRefreshType) => {
  const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[]>([]);

  // Fetch Facility Units when component mounts
  useEffect(() => {
    const fetchFacilityUnits = async () => {
      try {
        const response = await axiosFetchFacilityUnits();
        setFacilityUnits(response.data);
      } catch (error) {
        console.error('Error fetching facility units:', error);
      }
    };

    fetchFacilityUnits();
  }, [refresh]);

  // Handle delete facility unit
  const handleDelete = async (id: string) => {
    try {
      await axiosDeleteFacilityUnit(id);
      // Update the UI after deletion
      setFacilityUnits(facilityUnits.filter((unit) => unit._id !== id));
      toast.success('Facility unit has been deleted!');
    } catch (error) {
      console.error('Error deleting facility unit:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-bold text-center">Facility Unit</strong>

      <div className='border-x border-gray-200 rounded-sm mt-3'>
        {facilityUnits.length === 0 ? (
          <p className='text-center text-gray-600'>
            No Facility Units Available
          </p>
        ) : (
          <table className='w-full text-gray-700'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilityUnits.map((unit) => (
                <tr key={unit._id}>
                  <td className='text-center'>
                    {firstLetterUpperCase(unit.name)}
                  </td>
                  <td className='text-center'>
                    <button
                      onClick={() => unit._id && handleDelete(unit._id)}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FacilityUnitDisplay;
