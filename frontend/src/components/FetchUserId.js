import React, { useEffect } from 'react';
import axios from 'axios';

const FetchUserId = ({ onUserIdFetched }) => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8800/auth/user', { withCredentials: true });
        onUserIdFetched(response.data.ID_do_usuario);
      } catch (e) {
        onUserIdFetched(null);
      }
    };
    fetchUser();
  }, [onUserIdFetched]);

  return null;
};

export default FetchUserId;
