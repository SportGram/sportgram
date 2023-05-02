import React from 'react';
import { Tabs, Typography } from '@mui/material';
import MediaTable from '../components/MediaTable';

const MyFiles = ({ showSearchField }) => {
  return (
    <>

      <MediaTable myFilesOnly={true} showSearch={showSearchField = false} />

    </>


  );
};



export default MyFiles;
