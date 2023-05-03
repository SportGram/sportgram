import {
  Avatar,
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';

const UserProfile = () => {
  const {userId} = useParams();

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const token = localStorage.getItem('userToken');

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://media.mw.metropolia.fi/wbma/users/${userId}`,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `https://media.mw.metropolia.fi/wbma/media/user/${userId}`,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      const userPostsData = await response.json();
      setUserPosts(userPostsData);
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchUserData();
    fetchUserPosts();
    fetchAvatar();
  }, [userId, token]);

  if (!user) {
    return <Typography>Loading user profile...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Avatar
          src={avatar.filename}
          alt={user.username}
          style={{
            width: '200px',
            height: '200px',
            margin: '0 auto',
            marginBottom: '16px',
          }}
        />
        <Typography variant="h5" component="div" align="center">
          {user.username}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center">
          {user.email}
        </Typography>

        <Typography variant="h6" component="div" mt={4}>
          User Posts
        </Typography>

        <ImageList cols={3} gap={8}>
          {userPosts.map((post) => (
            <ImageListItem key={post.file_id}>
              <img
                src={mediaUrl + post.filename}
                alt={post.title}
                style={{objectFit: 'cover'}}
              />
              <ImageListItemBar title={post.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
