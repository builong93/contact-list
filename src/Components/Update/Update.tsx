import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatedContact } from "../../features/contactSlice"
import { AppDispatch, RootState } from "../../features/store"
import { updateContactOnAPI } from "../../features/contactSlice"
import { v4 as uuidv4 } from "uuid"
import CreateIcon from '@mui/icons-material/Create';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material"

export const Update: React.FC<{ contactId: number }> = ({ contactId }) => {
  const [open, setOpen] = React.useState(false)
  const [updateContact, setUpdateContact] = useState({
    id: parseInt(uuidv4()),
    name: "",
    address: "",
    phone: "",
    urlAvatar: ""
  })
  const dispatch = useDispatch<AppDispatch>()
  const contactsList = useSelector((state: RootState) => state.contact.contacts)

  useEffect(() => {
    const contactToUpdate = contactsList.find(
      (contact) => contact.id === contactId
    )
    if (contactToUpdate) {
      setUpdateContact(contactToUpdate)
    }
  }, [contactsList, contactId])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdateContact({ ...updateContact, [name]: value })
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = () => {
    dispatch(updatedContact(updateContact))
    dispatch(updateContactOnAPI(updateContact))
    handleClose()
  }
  return (
    <div>
      <Button endIcon={<CreateIcon />} variant='contained' color='primary' onClick={handleClickOpen}>
         Update
      </Button>
      <Dialog open={open}>
        <DialogTitle>
          <Typography fontWeight={700} fontSize={25}>Update Contact</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update to this website, please enter your name, email, address...
            We will send updates occasionally.
          </DialogContentText>
          <Grid  sx={{my: "10px"}} container columns={12} spacing={1}>
            <Grid item xs={8}>
              <TextField
                onChange={handleInputChange}
                value={updateContact.name}
                name='name'
                label='Full Name'
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                value={updateContact.phone}
                name='phone'
                label='Phone'
                type='text'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleInputChange}
                value={updateContact.address}
                name='address'
                label='Address'
                fullWidth
                type='address'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleInputChange}
                value={updateContact.urlAvatar}
                name='urlAvatar'
                label='urlAvatar'
                fullWidth
                type='text'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
