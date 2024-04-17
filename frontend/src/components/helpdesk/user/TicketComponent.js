import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

const TicketComponent = ({ticketNumber, ticketTitle, ticketDescription, ticketLink}) => {
    
  return (
      <Card variant="outline" sx={{borderRadius: '10px', border: '1px solid #A9A9A9'}}>
        <CardContent>
            <Typography variant="h5" sx={{fontWeight: 'bold'}} component="div" gutterBottom>
                {ticketNumber}
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} gutterBottom>
                {ticketTitle}
            </Typography>
            <Typography sx={{ fontSize: 12}} >
                {ticketDescription}
            </Typography>
            <hr></hr>
            <CardActions sx={{ justifyContent: 'flex-end', paddingRight: '16px' }}>
            <a href={ticketLink}>Open Ticket</a>
            </CardActions>
        </CardContent>
      </Card>
  )
}

export default TicketComponent
