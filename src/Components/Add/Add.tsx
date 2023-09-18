import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Grid from "@mui/material/Grid"
import { useDispatch } from "react-redux"
import { addContactOnAPI, addedContact } from "../../features/contactSlice"
import { AppDispatch } from "../../features/store"
import { v4 as uuidv4 } from "uuid"

export default function Add() {
  const [open, setOpen] = React.useState(false)
  const [newContact, setNewContact] = React.useState({
    id: parseInt(uuidv4()),
    name: "",
    address: "",
    phone: "",
  })
  const dispatch = useDispatch<AppDispatch>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewContact({ ...newContact, [name]: value })
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleAdd = () => {
    // Sử dụng dispatch với action creator để dispatch action
    dispatch(addContactOnAPI(newContact)).then((resultAction) => {
      if (addContactOnAPI.fulfilled.match(resultAction)) {
        // Xử lý sau khi thêm thành công
        dispatch(addedContact(resultAction.payload))
      }
    })
    setNewContact({
      id: parseInt(uuidv4()),
      name: "",
      address: "",
      phone: "",
    })
    setOpen(false)
  }
  return (
    <div>
      <Button variant='contained' color='success' onClick={handleClickOpen}>
        Open form add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new contact to this website, please enter your email address
            here.
          </DialogContentText>
          <Grid container columns={12} spacing={1}>
            <Grid item xs={8}>
              <TextField
                onChange={handleInputChange}
                value={newContact.name}
                name='name'
                label='Full Name'
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                value={newContact.phone}
                name='phone'
                label='Phone'
                type='text'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={newContact.address}
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
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
