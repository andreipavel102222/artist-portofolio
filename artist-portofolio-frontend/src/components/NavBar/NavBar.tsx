import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import './NavBar.css'


interface INavbar {
  position?: 'static' | 'fixed',
  title: string,
  children: React.ReactNode
}

function NavBar({ position = 'fixed', title, children }: INavbar) {
  return (
    <AppBar position={ position} className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>    
  )
}

export default NavBar;