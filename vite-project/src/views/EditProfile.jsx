import {
  AccountCircle,
  Badge,
  ContactMail,
  LockReset,
  Edit,
  Tag,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  TextField,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag, useUser} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import Upload from './Upload.jsx';

const EditProfile = () => {
  const {updateUser, getUserByToken} = useUser();
  const {user, setUser} = useContext(MediaContext);
  const [updatedUser, setUpdatedUser] = useState({});
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const {getTag} = useTag();

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

  const saveUser = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const res = await updateUser(updatedUser, userToken);
      window.alert(res.message);
      setUser(await getUserByToken(userToken));
    } catch (err) {
      window.alert(err.message || 'Error occurred...');
    }
  };
  useEffect(() => {
    if (user && !Object.keys(updatedUser).length) {
      setUpdatedUser(user);
    }
  }, [user]);

  useEffect(() => {
    fetchAvatar();
    // Avatarin refresh kun uploadModalOpen päivittyy
  }, [user, uploadModalOpen]);

  return (
    <Card sx={{}}>
      {user && (
        <Dialog open={uploadModalOpen}>
          <DialogTitle>Upload avatar</DialogTitle>
          <Button
            // "Close" nappi oikeassa kulmassa
            sx={{position: 'absolute', right: 10, top: 10}}
            onClick={() => setUploadModalOpen(false)}
          >
            Close
          </Button>
          <DialogContent>
            <Upload
              mediaTag={'avatar_' + user.user_id}
              noRedirect={true}
              onUpload={() => setUploadModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
      {user && (
        <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={avatar.filename}
                  imgProps={{
                    alt: `${user.username}'s profile image`,
                  }}
                  sx={{width: '100%', height: '30vh'}}
                />
              </ListItemAvatar>
              <IconButton
                onClick={() => setUploadModalOpen(true)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  // hover efekti
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                  // oikean alareunan sijottelu
                  position: 'absolute',
                  right: 20,
                  bottom: 20,
                }}
              >
                <Edit />
              </IconButton>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <TextField
                label="Username"
                defaultValue={user.username}
                onChange={(e) =>
                  setUpdatedUser({...updatedUser, username: e.target.value})
                }
              />
              <Button
                onClick={() => saveUser(user)}
                disabled={user.username === updatedUser.username}
              >
                Save
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ContactMail />
              </ListItemIcon>
              <TextField
                label="Email"
                defaultValue={user.email}
                onChange={(e) =>
                  setUpdatedUser({...updatedUser, email: e.target.value})
                }
              />
              <Button
                onClick={() => saveUser(user)}
                disabled={user.email === updatedUser.email}
              >
                Save
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Badge />
              </ListItemIcon>
              <TextField
                label="Full Name"
                defaultValue={user.full_name}
                onChange={(e) =>
                  setUpdatedUser({...updatedUser, full_name: e.target.value})
                }
              />
              <Button
                onClick={() => saveUser(user)}
                disabled={user.full_name === updatedUser.full_name}
              >
                Save
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LockReset />
              </ListItemIcon>
              <TextField
                label="Password"
                type="password"
                defaultValue={user.password}
                onChange={(e) =>
                  setUpdatedUser({...updatedUser, password: e.target.value})
                }
              />
              <Button
                onClick={() => saveUser(user)}
                disabled={
                  !updatedUser.password || updatedUser.password?.length < 6
                }
              >
                Change Password
              </Button>
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
    </Card>
  );
};

export default EditProfile;
