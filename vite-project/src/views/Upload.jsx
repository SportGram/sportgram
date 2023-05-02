import {Box, Button, Input, Slider, TextField, Typography} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';
import React from 'react';

const Upload = ({mediaTag, noRedirect, onUpload}) => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg'
  );
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
      setSelectedImage(reader.result);
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
      <img
        src={selectedImage}
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
      <Slider
        name="brightness"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.brightness}
      />
      <Slider
        name="contrast"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.contrast}
      />
      <Slider
        name="saturation"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.saturation}
      />
      <Slider
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
