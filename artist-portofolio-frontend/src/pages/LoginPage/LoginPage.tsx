import { Alert, Button, TextField } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './LoginPage.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleError = (message: string) => {setErrorMessage(message)};

  const loginButtonHandler = () => {
    login({email, password}, handleError);
  }

  return (
    <div className="wrapper" style={{  height: '100vh' }}>
      <NavBar title="Login" buttonText="Go to Projects" buttonHandler={() => navigate('/')}/>
      <div className="container login-wrapper">
        <div className="login-container">
            <LockOpenIcon fontSize="large" color="primary" sx={{ mt: 2, mb: 2}}/>
            {errorMessage !== '' && <Alert severity="error" sx={{ minWidth: '100%',  boxSizing: 'border-box' }}>{errorMessage}</Alert>}
            <TextField 
              id="username"   
              label="Username"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: '100%', mt: 2, mb: 2}}
            />
            <TextField 
              id="password"   
              label="Password"
              type="password" 
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}              
              sx={{ width: '100%', mt: 2, mb: 2}}
            />
            <Button 
              variant="contained"
              color="primary"
              aria-label="menu"
              sx={{ width: '100%', mt: 2, mb: 2, height: '3.5em'}}
              onClick={loginButtonHandler}>
                Login
            </Button>
        </div>
      </div>            
    </div>
  )
}

export default LoginPage;
