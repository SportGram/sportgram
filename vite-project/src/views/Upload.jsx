import {Box, Button, Card, Input, Slider, TextField, Typography} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';
import React from 'react';
import img from '../assets/uploadicon.svg'


const Upload = ({mediaTag, noRedirect, onUpload}) => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg'
  );
  const [selectedVideo, setSelectedVideo] = useState();
  const { postMedia } = useMedia();
  const { postTag } = useTag();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const filterInitValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      const allData = {
        desc: inputs.description,
        filters: filterInputs,
      };
      data.append('description', JSON.stringify(allData));
      data.append('file', file);
      const userToken = localStorage.getItem('userToken');
      const uploadResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: uploadResult.file_id,
          tag: mediaTag || appId,
        },
        userToken
      );
      console.log('doUpload', tagResult);
      if (onUpload) onUpload();
      if (!noRedirect) {
        navigate('/home');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      console.log(reader.result);
      setSelectedImage(reader.result);
      setSelectedVideo(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const { inputs, handleSubmit, handleInputChange } = useForm(
    doUpload,
    initValues
  );

  const { inputs: filterInputs, handleInputChange: handleFilterChange } = useForm(
    null,
    filterInitValues
  );

  console.log('Upload', file);

  return (
    <Box>
{file ? (
  file.type.startsWith('image/') ? (
    <img
      src={selectedImage || img}
      alt="preview"
      style={{
        width: '100%',
        height: 400,
        objectFit: 'contain',
        filter: `
          brightness(${filterInputs.brightness}%)
          contrast(${filterInputs.contrast}%)
          saturate(${filterInputs.saturation}%)
          sepia(${filterInputs.sepia}%)
        `,
      }}
    />
  ) : (
    <video
      src={selectedVideo || img}
      alt="preview"
      style={{
        width: '100%',
        height: 400,
        objectFit: 'contain',
        filter: `
          brightness(${filterInputs.brightness}%)
          contrast(${filterInputs.contrast}%)
          saturate(${filterInputs.saturation}%)
          sepia(${filterInputs.sepia}%)
        `,
      }}
    />
  )
) : (
  <img
    src={img}
    alt="preview"
    style={{
      width: '100%',
      height: 400,
      objectFit: 'contain',
    }}
  />
)}

      <form style={{display: 'flex',  justifyContent: 'center', margin:'0.5rem',}} onSubmit={handleSubmit}>

        <TextField
          onChange={handleInputChange}
          type="text"
          name="title"
          label='Title here...'
          value={inputs.title}
        ></TextField>

        <Input
        style={{margin: '0.6rem'}}
          onChange={handleFileChange}
          type="file"
          name="file"
          accept="image/*,video/*,audio/*"
        ></Input>
        <Button type="submit" variant='outlined'>Upload</Button>
      </form>

        <Typography style={{margin: 'auto',display: 'flex', justifyContent:'center', alignContent:'center'}}>Brightness</Typography>
      <Slider style={{width: '75%', margin:'auto',display: 'flex', justifyContent:'center', alignContent:'center',}}
        name="brightness"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.brightness}
         />
      <Typography style={{margin: 'auto',display: 'flex', justifyContent:'center', alignContent:'center'}}>Contrast</Typography>
       <Slider style={{width: '75%', margin:'auto',display: 'flex', justifyContent:'center', alignContent:'center',}}
        name="contrast"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.contrast}
      />
      <Typography style={{margin: 'auto',display: 'flex', justifyContent:'center', alignContent:'center'}}>Saturation</Typography>
      <Slider style={{width: '75%', margin:'auto',display: 'flex', justifyContent:'center', alignContent:'center',}}
        name="saturation"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.saturation}
      />
      <Typography style={{margin: 'auto',display: 'flex', justifyContent:'center', alignContent:'center'}}>Sepia</Typography>
      <Slider style={{width: '75%', margin:'auto',display: 'flex', justifyContent:'center', alignContent:'center',}}
        name="sepia"
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.sepia}
      />

    </Box>
  );
};

export default Upload;
