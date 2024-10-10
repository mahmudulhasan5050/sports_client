import React, { useState } from 'react';

import OpeningHourDisplay from '../../components/admin/openingHour/OpeningHourDisplay';
import OpeningHourForm from '../../components/admin/openingHour/OpeningHourForm';

const OpeningHourMain = () => {
  const [refresh, setRefresh] = useState(false);
  const [openingHourtId, setOpeningHourtId] = useState<string>('');

  const toggleHandle = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end w-full">
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={toggleHandle}
        >
          Create opening hour
        </button>
      </div>
      <div className="flex flex-row w-full">
        
          {!refresh ? (
            <OpeningHourDisplay
            setOpeningHourtId={setOpeningHourtId}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ) : (
            <OpeningHourForm
            openingHourtId={openingHourtId}
            setOpeningHourtId={setOpeningHourtId}
              setRefresh={setRefresh}
            />
          )}
        </div>
    </div>
  );
};

export default OpeningHourMain;
