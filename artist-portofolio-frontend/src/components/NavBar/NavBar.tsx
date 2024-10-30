import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import './NavBar.css'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

interface INavbar {
  position?: 'static' | 'fixed',
  buttonText: string,
  title: string,
  buttonHandler?: () => void,
}

function NavBar({ position = 'fixed', buttonText, title, buttonHandler }: INavbar) {
  const { token } = useContext(AuthContext);

  return (
    <AppBar position={ position} className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        
        { token !== '' && 
          <Link to="/add">
            <Button aria-label="previous" variant="outlined" color="inherit" sx={{  m: 1 }}>
              Add project
            </Button>
          </Link>        
        }
        <Button 
          variant="outlined"
          color="inherit"
          aria-label="menu"
          onClick={buttonHandler}
          >
            {buttonText}
        </Button>      
      </Toolbar>
    </AppBar>    
  )
}

export default NavBar;