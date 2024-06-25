import React from 'react'
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const MainButton = ({appName, appDescription, link}) => {
  return (
    <Card
    variant="outlined"
    sx={{
      width: 'auto',
      // to make the card resizable
      height: '100%',
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
    </Box>
    <CardContent>
      <Typography level="title-lg" variant='h5'>{appName}</Typography>
      <Typography level="body-sm">
        {appDescription}
      </Typography>
    </CardContent>
    <CardActions sx={{ p: 'auto' }}>
      <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
        {/* <FavoriteBorder /> */}
      </IconButton>
      <Button variant="contained" href={link}>
        Open
      </Button>
    </CardActions>
  </Card>
  )
}

export default MainButton
