import {Typography} from '@mui/material';
import React from 'react';
import MediaTable from '../components/MediaTable';
import UserProfile from './UserProfile';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '1.7rem',


      }}
    >
      <Typography component="h1" variant="h3"></Typography>
      <MediaTable>
        {(users) => (
          <>
            {users.map((user) => (
              <UserProfile key={user.id} userId={user.id} />
            ))}
          </>
        )}
      </MediaTable>
    </div>
  );
};

export default Home;
