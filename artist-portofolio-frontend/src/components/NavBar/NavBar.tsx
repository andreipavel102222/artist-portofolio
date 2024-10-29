import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './NavBar.css'

interface INavbar {
  position?: 'static' | 'fixed',
  buttonText: string,
  title: string,
  link: string,
  buttonHandler?: unknown,
}

function NavBar({ position = 'fixed', buttonText, title, link }: INavbar) {

  return (
    <AppBar position={ position} className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Link to={link}>
          <Button 
            variant="outlined"
            color="inherit"
            aria-label="menu">
              {buttonText}
          </Button>
        </Link>            
      </Toolbar>
    </AppBar>    
  )
}

export default NavBar;