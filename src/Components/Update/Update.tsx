import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatedContact } from "../../features/contactSlice"
import { AppDispatch, RootState } from "../../features/store"
import { updateContactOnAPI } from "../../features/contactSlice"
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Grid,
} from "@mui/material"

export const Update: React.FC<{ contactId: number }> = ({ contactId }) => {
  const [open, setOpen] = React.useState(false)
  const [updateContact, setUpdateContact] = useState({
    id: parseInt(uuidv4()),
    name: "",
    address: "",
    phone: "",
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
    dispatch(updatedContact(updateContact));  
    dispatch(updateContactOnAPI(updateContact))  
    handleClose()
  }
  return (
    <div>
      <Button variant='contained' color="primary" onClick={handleClickOpen}>
        Open form Update
      </Button>
      <Dialog open={open}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Update to this website, please enter your name, email, address...
            We will send updates occasionally.
          </DialogContentText>
          <Grid container columns={12} spacing={1}>
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
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={updateContact.address}
                name='address'
                label='Address'
                fullWidth
                type='address'
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
