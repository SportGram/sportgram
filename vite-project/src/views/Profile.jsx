import { AccountCircle, Badge, ContactMail, Tag } from '@mui/icons-material';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import { useTag } from '../hooks/ApiHooks';
import { mediaUrl } from '../utils/variables';
import MyFiles from './MyFiles'; // import the MyFiles component
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavourite } from '../hooks/ApiHooks';
import { useWindowSize } from '../hooks/WindowHooks';
import { Link } from 'react-router-dom';


const Profile = () => {
  const windowSize = useWindowSize;
  const { user } = useContext(MediaContext);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const { getTag } = useTag();

  const fetchAvatar = async () => {
    try {
      if (user) {
        const avatars = await getTag('avatar_' + user.user_id);
        const ava = avatars.pop();
        ava.filename = mediaUrl + ava.filename;
        setAvatar(ava);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [user]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [currentTab, setCurrentTab] = useState('own');
  const [likedPosts, setLikedPosts] = useState([]);

const handleTabChange = (event, newValue) => {
  setCurrentTab(newValue);
};

const fetchLikedPosts = async () => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`https://media.mw.metropolia.fi/wbma/favourites`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });
  const likedPostsIds = await response.json();
  console.log(likedPostsIds);

  const fetchedPosts = [];
  for (const f of likedPostsIds) {
    const res = await fetch(`https://media.mw.metropolia.fi/wbma/media/${f.file_id}`);
    const data = await res.json();
    console.log(data);
    fetchedPosts.push(data);
  }
  setLikedPosts(fetchedPosts);



 };

 useEffect(() => {

   fetchLikedPosts();
 }, []);


  return (
    <Card sx = {{}}>
      {user && (
        <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
          <List>
            <ListItem>

              <ListItemAvatar sx={{ width: '100%' }}>

                <Avatar
                  variant="rounded"
                  src={avatar.filename}
                  imgProps={{
                    alt: `${user.username}'s profile image`,
                  }}
                  sx={{ width: '100%', height: '30vh' }}
                />
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ContactMail />
              </ListItemIcon>
              <ListItemText primary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Badge />
              </ListItemIcon>
              <ListItemText primary={user.full_name} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Tag />
              </ListItemIcon>
              <ListItemText primary={user.user_id} />
            </ListItem>
          </List>


        </CardContent>
      )}

      <Tabs value={currentTab} onChange={handleTabChange}>
  <Tab style={{minWidth:'50%'}} icon={<HouseSidingIcon />} label="Own Posts" value="own" />
  <Tab style={{minWidth:'50%'}} icon={<FavoriteIcon />} label="Liked Posts" value="liked" />
</Tabs>
{currentTab === 'own' && (
  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <MyFiles myFilesOnly={true} />
  </div>
)}


{currentTab === 'liked' && (

    <ImageList cols={1} gap={8} sx={{ maxWidth: '500px', margin: 'auto', marginTop: '8px',}} >
      {likedPosts.map(post => (
        <ImageListItem>

          <img
            src={
              post.media_type !== 'audio'
                ? mediaUrl + post.thumbnails.w640
                : './vite.svg'
            }
            alt={post.title}
          />
        <ImageListItemBar style={{textAlign: 'center', overflow: 'hidden'}}
            title={post.title}

          />

        </ImageListItem>
      ))}
    </ImageList>

)}



</Card>
  );
};

export default Profile;
