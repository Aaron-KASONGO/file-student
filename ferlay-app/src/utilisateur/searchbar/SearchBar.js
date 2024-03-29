import { Box, IconButton, InputBase, Paper, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({search, setSearch}) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Recherche(matricule)"
        inputProps={{ 'aria-label': 'Recherche(matricule)' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type="reset" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
