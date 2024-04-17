import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const HelpdeskCard = ({message, name, backgroundColor}) => {
    
  return (
      <Card variant="outline" sx={{ backgroundColor: {backgroundColor}, borderRadius: '10px'}}>
        <CardContent>
            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} gutterBottom>
            {message}
            </Typography>
            <Typography variant="h5" sx={{fontWeight: 'bold'}} component="div">
            {name}
            </Typography>
        </CardContent>
      </Card>
  )
}

export default HelpdeskCard
