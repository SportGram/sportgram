
import gif from '../assets/error.gif'
import '../error.css'
import { Button } from '@mui/material'
import { Link, } from 'react-router-dom';

export default function ErrorPage() {
  return (

    <div className='errors'>
      <h1>404 Page not found</h1>
      <img src={gif} alt="Error gif" />
      <Button variant="contained" component={Link} to="/Home">Back To Home Page</Button>
    </div >
  )
}

