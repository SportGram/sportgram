import { useState, useEffect } from 'react';
import { ImageList, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMedia } from '../hooks/ApiHooks';
import { useWindowSize } from '../hooks/WindowHooks';
import gif from '../assets/noresults.gif';
import MediaRow from './MediaRow';
import { useLocation } from 'react-router-dom';





const MediaTable = ({ myFilesOnly = false, showSearch = true }) => {
const location = useLocation();
  const { mediaArray, deleteMedia } = useMedia(myFilesOnly);
  const windowSize = useWindowSize();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const filteredMediaArray = mediaArray
    .filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => new Date(b.time_added) - new Date(a.time_added));

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (mediaArray.length > 0) {
      setLoading(false);
    }
  }, [mediaArray]);

  return (
    <>

      {location.pathname !== '/profile' && (
        <TextField className="search" variant="standard" label="Search posts..." onChange={handleSearch} />
      )}
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : filteredMediaArray.length === 0 ? (
        <>
          <Typography variant="h6">No search results found. Go upload something</Typography>
          <img src={gif} alt="No search results found" />
        </>
      ) : (
        <ImageList cols={1} gap={8} sx={{ maxWidth: 500 }}>
          {filteredMediaArray.map((item, index) => {
            return <MediaRow key={index} file={item} deleteMedia={deleteMedia} />;
          })}
        </ImageList>
      )}
    </>
  );
        };


MediaTable.propTypes = {
  myFilesOnly: PropTypes.bool,
  showSearch: PropTypes.bool,
};

export default MediaTable;
