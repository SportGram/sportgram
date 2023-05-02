import React from 'react';
import { Tabs, Typography } from '@mui/material';
import MediaTable from '../components/MediaTable';

const MyFiles = ({ showSearchField }) => {
  return (
    <>
      <Typography component="h1" variant="h3">
      </Typography>
      <MediaTable myFilesOnly={true} showSearch={showSearchField = false} />

    </>


  );
};



export default MyFiles;
