import { Alert, Button, TextField } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './LoginPage.css'
import { useState } from "react";

function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, _setErrorMessage] = useState<string>('');
  return (
    <div className="wrapper" style={{  height: '100vh' }}>
      <NavBar title="Login" buttonText="Go to Projects" link="/"/>
      <div className="container login-wrapper">
        <div className="login-container">
            <LockOpenIcon fontSize="large" color="primary" sx={{ mt: 2, mb: 2}}/>
            {errorMessage !== '' && <Alert severity="error" sx={{ minWidth: '100%',  boxSizing: 'border-box' }}>errorMessage</Alert>}
            <TextField 
              id="username"   
              label="Username"
              variant="outlined"
              sx={{ width: '100%', mt: 2, mb: 2}}
            />
            <TextField 
              id="password"   
              label="Password"
              type="password" 
              variant="outlined"
              sx={{ width: '100%', mt: 2, mb: 2}}
            />
            <Button 
              variant="contained"
              color="primary"
              aria-label="menu"
              sx={{ width: '100%', mt: 2, mb: 2, height: '3.5em'}}>
                Login
            </Button>
        </div>
      </div>            
    </div>
  )
}

export default LoginPage;
