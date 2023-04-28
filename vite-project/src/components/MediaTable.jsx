import {ImageList} from '@mui/material';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';

const MediaTable = ({myFilesOnly = false}) => {
  const {mediaArray, deleteMedia} = useMedia(myFilesOnly);
  const windowSize = useWindowSize();

  return (
    <ImageList cols={1} gap={8} sx={{maxWidth: 500}}>
      {mediaArray.map((item, index) => {
        return <MediaRow key={index} file={item} deleteMedia={deleteMedia} />;
      })}
    </ImageList>
  );
};

MediaTable.propTypes = {
  myFilesOnly: PropTypes.bool,
};

export default MediaTable;
