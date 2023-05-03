import {Box, Button, Slider, TextField, Typography} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {useMedia} from '../hooks/ApiHooks';

const Update = () => {
  const {putMedia} = useMedia();
  const navigate = useNavigate();
  const {state} = useLocation();
  const file = state.file;

  const selectedImage = mediaUrl + file.filename;

  let allData = {
    desc: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };
  try {
    allData = JSON.parse(file.description);
  } catch (error) {
    /* empty */
  }

  const initValues = {
    title: file.title,
    description: allData.desc,
  };

  const filterInitValues = allData.filters;

  const doUpdate = async () => {
    try {
      const allData = {
        desc: inputs.description,
        filters: filterInputs,
      };
      const data = {
        title: inputs.title,
        description: JSON.stringify(allData),
      };

      const userToken = localStorage.getItem('userToken');
      const updateResult = await putMedia(file.file_id, data, userToken);
      console.log('doUpdate', updateResult);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpdate,
    initValues
  );

  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );

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
        <Button variant='outlined' type="submit" style={{margin:'0.5rem'}}>Update</Button>
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

export default Update;
