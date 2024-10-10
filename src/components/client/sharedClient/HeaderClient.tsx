import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getToken, removeToken } from '../../../utils/cookiesFunc';
import AvatarDropdown from '../AvatarDropdown';
import { useUser } from '../../../context/UserContext';

export const HeaderClient = () => {
  const { userCTX, setUserCTX } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUserCTX({ name: token.name, role: token.role });
    }
  }, [setUserCTX]);

  const handleLogout = () => {
    removeToken();
    setUserCTX(null);
    localStorage.clear();
    navigate('/'); // Optionally, navigate back to home after logging out
  };

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 bg-white ">
      {/* Tennis Center Title */}
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
        <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          Tennis Center
        </span>
      </h1>

      {/* User Section (Avatar or Login Button) */}
      <div className="flex items-center space-x-4">
        {userCTX ? (
          <AvatarDropdown userCTX={userCTX} handleLogout={handleLogout} />
        ) : (
          <button
            onClick={() => navigate('/signin')}
            className="bg-gradient-to-tl from-orange-300 to-orange-700 rounded-lg px-4 py-2 text-white hover:from-orange-900 hover:to-orange-400 transition duration-300"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderClient;
