import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const BasicCard = ({message, name}) => {
    
  return (
    <div>
       <Box sx={{ minWidth: 275 }}>
      <Card variant="none">
        <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
            {message}
            </Typography>
            <Typography variant="h5" component="div">
            {name}
            </Typography>
        </CardContent>
        {/* <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
    </div>
  )
}

export default BasicCard
