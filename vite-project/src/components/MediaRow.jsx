import {
  Avatar,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {useContext, useState, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaRow = ({file, deleteMedia}) => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [fileUser, setFileUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (file.user_id) {
        const token = localStorage.getItem('userToken');
        const response = await fetch(
          `https://media.mw.metropolia.fi/wbma/users/${file.user_id}`,
          {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          }
        );
        const data = await response.json();
        setFileUser(data);
      }
    };
    fetchUser();
  }, [file.user_id]);

  const doDelete = async () => {
    const sure = confirm('Are you sure?');
    if (sure) {
      const token = localStorage.getItem('userToken');
      const deleteResult = await deleteMedia(file.file_id, token);
      console.log(deleteResult);
      setUpdate(!update);
    }
  };

  return (
    <ImageListItem>
      <img
        src={
          file.media_type !== 'audio'
            ? mediaUrl + file.thumbnails.w640
            : './vite.svg'
        }
        alt={file.title}
      />
      <ImageListItemBar
        title={file.title.slice(0, 42) + (file.title.length > 42 ? '...' : '')}
        subtitle={
          <Link to={`/userprofile/${file.user_id}`} style={{color: '#C6AD38', fontSize: '0.9rem' }}
          >
            {'@' + fileUser.username || file.user_id}
          </Link>
        }
        actionIcon={
          <ButtonGroup style={{margin: '0.5rem'}}>
            <Button
              component={Link}
              variant="contained"
              to="/single"
              state={{file}}
            >
              View
            </Button>
            {user && file.user_id === user.user_id && (
              <>
                <Button
                  component={Link}
                  variant="contained"
                  to="/update"
                  state={{file}}
                >
                  Update
                </Button>
                <Button component={Link} variant="contained" onClick={doDelete}>
                  Delete
                </Button>
              </>
            )}
          </ButtonGroup>
        }
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
};

export default MediaRow;
