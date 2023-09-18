import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../features/store"
import React, { useEffect } from "react"
import { deletedContact, fetchContacts } from "../../features/contactSlice"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import { deleteContactOnAPI } from "../../features/contactSlice"
import {
  Button,
  Container,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import { Update } from "../Update/Update"
import Add from "../Add/Add"

const rows = ["ID", "Name", "Address", "Phone", ""]

const TableContact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const contactsList = useSelector((state: RootState) => state.contact.contacts)
  const handleDelete = (contactId: number) => {
    dispatch(deletedContact(contactId))
    dispatch(deleteContactOnAPI(contactId))
  }
  useEffect(() => {
    // Gọi action fetchContacts khi component được render
    dispatch(fetchContacts() as any);
  }, [dispatch]);
  return (
    <Container sx={{ mt: 5 }}>
      <Add />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {rows.map((row, index) => (
                <TableCell key={index}>{row}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contactsList.map((contactList, index) => (
              <TableRow key={index}>
                <TableCell>{contactList.id}</TableCell>
                <TableCell>{contactList.name}</TableCell>
                <TableCell>{contactList.address}</TableCell>
                <TableCell>{contactList.phone}</TableCell>
                <TableCell sx={{display: 'flex', gap: '10px'}}>
                  <Update contactId={contactList.id}/>
                  <Button onClick={() => handleDelete(contactList.id)}  variant="contained" color="warning">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default TableContact
