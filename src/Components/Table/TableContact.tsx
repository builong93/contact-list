import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../features/store"
import React, { useEffect } from "react"
import { deletedContact, fetchContacts } from "../../features/contactSlice"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import { deleteContactOnAPI } from "../../features/contactSlice"
import {
  Avatar,
  Button,
  Container,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { Update } from "../Update/Update"
import Add from "../Add/Add"

const rows = ["ID", "Name", "Address", "Phone", "Avatar", ""]

const TableContact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const contactsList = useSelector((state: RootState) => state.contact.contacts)
  // phân trang
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const startIndex = page * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const displayedContacts = contactsList.slice(startIndex, endIndex)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleDelete = (contactId: number) => {
    dispatch(deletedContact(contactId))
    dispatch(deleteContactOnAPI(contactId))
  }
  useEffect(() => {
    // Gọi action fetchContacts khi component được render
    dispatch(fetchContacts() as any)
  }, [dispatch])
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
            {displayedContacts.map((contactList, index) => (
              <TableRow key={index}>
                <TableCell>{contactList.id}</TableCell>
                <TableCell>{contactList.name}</TableCell>
                <TableCell>{contactList.address}</TableCell>
                <TableCell>{contactList.phone}</TableCell>
                <TableCell>
                  <Avatar alt='Avatar' src={contactList.urlAvatar} />
                </TableCell>
                <TableCell sx={{ display: "flex", gap: "10px" }}>
                  <Update contactId={contactList.id} />
                  <Button
                    onClick={() => handleDelete(contactList.id)}
                    variant='contained'
                    color='warning'
                    endIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5 , 7]}
          component='div'
          count={contactsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  )
}

export default TableContact
