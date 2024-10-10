//import React, { useState } from 'react';

import React, { useState } from 'react';

import UserDisplay from '../../components/admin/user/UserDisplay';
import UserForm from '../../components/admin/user/UserForm';

//import UserDisplay from '../../components/admin/user/UserDisplay';
//import UserForm from '../../components/admin/openingHour/OpeningHourForm';

const UserMain = () => {
  const [refresh, setRefresh] = useState(false)
  const [userId, setUserId] = useState<string>('')

  const toggleHandle = () => {
    setRefresh(!refresh)
}

return (
  <div className="flex flex-col gap-4">
      <div className="flex justify-end w-full">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleHandle}
          >
              Create Facility Details
          </button>
      </div>

      <div className="flex flex-row w-full">
          {!refresh ? (
              <UserDisplay setUserId={setUserId} refresh={refresh} setRefresh={setRefresh} />
          ) : (
              <UserForm userId={userId} setUserId={setUserId} setRefresh={setRefresh} />
          )}
      </div>
  </div>
)

};

export default UserMain;
