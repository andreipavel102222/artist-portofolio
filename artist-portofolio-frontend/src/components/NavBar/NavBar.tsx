import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import './NavBar.css'

function NavBar() {

  return (
    <AppBar position='static' className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Projects
        </Typography>            
        <Button 
          variant="outlined"
          color="inherit"
          aria-label="menu">
            Login as artist
        </Button>
      </Toolbar>
    </AppBar>    
  )
}

export default NavBar;