import {
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import axios from "axios"

export interface Contact {
  id: number
  name: string
  address: string
  phone: string
}
interface ContactState {
  contacts: Contact[] // Sử dụng mảng Contact để lưu danh sách liên hệ
  loading: boolean
}
// Khởi tạo trạng thái ban đầu cho slice Redux
const initialState: ContactState = {
  contacts: [], // Ban đầu danh sách liên hệ rỗng
  loading: false,
}
// Định nghĩa action async sử dụng createAsyncThunk để lấy danh sách liên hệ từ API
export const fetchContacts: AsyncThunk<Contact[], void, {}> = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    try {
      const response = await axios.get(
        "https://64f938e94098a7f2fc142669.mockapi.io/api/contacts/listContacts"
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
)
// Update danh sách lên API
export const updateContactOnAPI = createAsyncThunk(
  "contact/updateContactOnAPI",
  async (updatedContact: Contact) => {
    try {
      const response = await axios.put(
        `https://64f938e94098a7f2fc142669.mockapi.io/api/contacts/listContacts/${updatedContact.id}`,
        updatedContact
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
)
// Add danh sách lên API
export const addContactOnAPI = createAsyncThunk(
  "contact/addContactOnAPI",
  async (newContact: Contact) => {
    try {
      const response = await axios.post(
        "https://64f938e94098a7f2fc142669.mockapi.io/api/contacts/listContacts",
        newContact
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
)
export const deleteContactOnAPI = createAsyncThunk(
  "contact/deleteContactOnAPI",
  async (contactId: number) => {
    try {
      await axios.delete(
        `https://64f938e94098a7f2fc142669.mockapi.io/api/contacts/listContacts/${contactId}`
      )
      return contactId
    } catch (error) {
      throw error
    }
  }
)
//Tạo Slice Redux
export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Thêm action để cập nhật một liên hệ mới cụ thể
    updatedContact: (state, action: PayloadAction<Contact>) => {
      const updatedContact = action.payload
      // tìm và cập nhật liên hệ theo id
      const index = state.contacts.findIndex(
        (contact) => contact.id === updatedContact.id
      )
      if (index !== -1) {
        state.contacts[index] = updatedContact
      }
    },
    addedContact: (state, action) => {
      const newContact = action.payload
      state.contacts.push(newContact)
    },
    deletedContact: (state, action: PayloadAction<number>) => {
      const contactIdToDelete = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== contactIdToDelete);
    },
  },
  extraReducers: (builder) => {
    // get Contacts list
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false
      state.contacts = action.payload
    })
    builder.addCase(updatedContact, (state, action) => {
      const updatedContact = action.payload
      const index = state.contacts.findIndex(
        (contact) => contact.id === updatedContact.id
      )
      if (index !== -1) {
        state.contacts[index] = updatedContact
      }
    })

    // update contacts list
  },
})

export const { updatedContact, addedContact, deletedContact } = contactSlice.actions
export default contactSlice.reducer
