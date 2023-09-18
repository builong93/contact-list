import { AppBar, Toolbar, Typography } from "@mui/material"
import React from "react"

const Navbar = () => {
  return (
    <AppBar position='relative' component='nav'>
      <Toolbar>
        <Typography variant='h6' color='inherit' component='div'>
          Contact List Poor People
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
