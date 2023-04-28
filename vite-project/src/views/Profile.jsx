import { AccountCircle, Badge, ContactMail } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  ImageList,
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

  setLikedPosts([])
  const token = localStorage.getItem('userToken');
  console.log(user)
   const response = await fetch(`https://media.mw.metropolia.fi/wbma/favourites`,
           {
             method: 'GET',
             headers: {
               'x-access-token': token,
             },
           }
         );
   const likedPostsIds = await response.json();
   console.log(likedPostsIds);

    likedPostsIds.map(f => {
    fetch(`https://media.mw.metropolia.fi/wbma/media/${f.file_id}`).then(res => res.json()).then(data => {
      console.log(data);
      setLikedPosts((prev) => [...prev, data]);
    });

    })


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
                <Badge />
              </ListItemIcon>
              <ListItemText primary={user.user_id} />
            </ListItem>
          </List>


        </CardContent>
      )}
      <Tabs value={currentTab} onChange={handleTabChange}>
  <Tab icon={<HouseSidingIcon />} label="Own Posts" value="own" />
  <Tab icon={<FavoriteIcon />} label="Liked Posts" value="liked" />
</Tabs>
{currentTab === 'own' && <MyFiles myFilesOnly={true} />}
{currentTab === 'liked' && (
        <ImageList cols={windowSize.width > 300 ? 1 : 2} gap={8}>
          {likedPosts.map(post => (
            <div key={post.file_id}>
             <img
        src={
          post.media_type !== 'audio'
            ? mediaUrl + post.thumbnails.w640
            : './vite.svg'
        }
        alt={post.title}
      />
              <p>{post.title}</p>
            </div>

          ))}
        </ImageList>

      )}
    </Card>

  );
};

export default Profile;
