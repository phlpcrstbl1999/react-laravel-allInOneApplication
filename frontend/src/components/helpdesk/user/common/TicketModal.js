import { React, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';

const style = {
    overflowY: 'scroll',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
  };

const TicketModal = ({openModal, closeModal, modalTitle, empName, empEmail}) => {
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };
  
  const handleCreateTicket = () => {
    alert('wew');
  };
    return (
        <Modal
            open={openModal}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <br></br>
            {/* <Grid container sx={{mb: 2}} spacing={2}>
              <Grid item xs={12} sm={6} lg={6} >
              <label>Name</label>
                <TextField
                  disabled
                  id="standard-required"
                  variant="outlined"
                  sx={{width: '100%'}}
                  value={empName}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6} >
                <label>Email Id</label>
                <TextField
                  disabled
                  id="standard-required"
                  variant="outlined"
                  sx={{width: '100%'}}
                  value={empEmail}
                />
              </Grid>
            </Grid> */}
            <Grid container sx={{mb: 2}} spacing={2}>
              <Grid item xs={12} sm={6} lg={6} >
              <label>Category</label>
              <Select
                value={category}
                onChange={handleChangeCategory}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{width: '100%'}}
              >
                <MenuItem value="" disabled>
                  Select one
                </MenuItem>
                <MenuItem value={'HI'}>Hardware Issues</MenuItem>
                <MenuItem value={'SI'}>Software Issues</MenuItem>
                <MenuItem value={'NI'}>Network Issues</MenuItem>
                <MenuItem value={'AM'}>Account Management</MenuItem>
                <MenuItem value={'GI'}>General Inquiry</MenuItem>
              </Select>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} >
                  <label>Priority</label>
                  <Select
                    value={priority}
                    onChange={handleChangePriority}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{width: '100%'}}
                  >
                    <MenuItem value="" disabled>
                      Select one
                    </MenuItem>
                    <MenuItem value={'L'}>Low</MenuItem>
                    <MenuItem value={'M'}>Medium</MenuItem>
                    <MenuItem value={'H'}>High</MenuItem>
                  </Select>
                </Grid>
            </Grid>
              <Grid container sx={{mb: 2}} spacing={2}>
                <Grid item xs={12} sm={6} lg={12} >
                  <label>Description</label>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    sx={{width: '100%'}}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{mb: 2}} spacing={2}>  

                <Grid item xs={12} sm={6} lg={6} >
                  <label>Attachment</label>
                  <OutlinedInput
                    id="component-outlined"
                    label="attachment"
                    type="file"
                    sx={{width: '100%'}}
                    inputProps={{ multiple: true }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{display: 'flex', gap: 2, width: '100%', justifyContent: 'right'}}>
                  <Button variant="contained" color="error" onClick={closeModal}>Cancel</Button>
                  <Button variant="contained" onClick={handleCreateTicket}>Create</Button>
                </Grid>
              </Grid> 
        </Box>
    </Modal>
    )
    }

export default TicketModal
