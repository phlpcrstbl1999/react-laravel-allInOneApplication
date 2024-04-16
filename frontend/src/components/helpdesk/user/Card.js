import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const HelpdeskCard = ({message, name, backgroundColor}) => {
    
  return (
    <div>
    <Box>
      <Card variant="outline" sx={{ backgroundColor: {backgroundColor}, borderRadius: '10px'}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
            {message}
            </Typography>
            <Typography variant="h5" sx={{fontWeight: 'bold'}} component="div">
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

export default HelpdeskCard
