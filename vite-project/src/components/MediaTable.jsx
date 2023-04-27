import { useState } from 'react';
import { ImageList, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useMedia } from '../hooks/ApiHooks';
import { useWindowSize } from '../hooks/WindowHooks';
import MediaRow from './MediaRow';

const MediaTable = ({ myFilesOnly = false }) => {
  const { mediaArray, deleteMedia } = useMedia(myFilesOnly);
  const windowSize = useWindowSize();
  const [searchText, setSearchText] = useState('');

  const filteredMediaArray = mediaArray.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <TextField onChange={handleSearch} />
      <ImageList cols={windowSize.width > 768 ? 3 : 2} gap={8}>
        {filteredMediaArray.map((item, index) => {
          return <MediaRow key={index} file={item} deleteMedia={deleteMedia} />;
        })}
      </ImageList>
    </>
  );
};

MediaTable.propTypes = {
  myFilesOnly: PropTypes.bool,
};

export default MediaTable;
