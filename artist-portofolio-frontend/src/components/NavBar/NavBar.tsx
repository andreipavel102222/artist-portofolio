import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import './NavBar.css'

interface INavbar {
  position?: 'static' | 'fixed',
  buttonText: string,
  title: string,
  buttonHandler?: () => void,
}

function NavBar({ position = 'fixed', buttonText, title, buttonHandler }: INavbar) {

  return (
    <AppBar position={ position} className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
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