import { Book } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BookState {
  books: Book[]
}

// Create initial state
const initialState: BookState = {
  books: [
    {
      id: '1',
      name: 'Book 1',
      price: 100,
      category: 'Category 1',
      description: 'Description 1',
    },
  ],
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBookToList(state, action: PayloadAction<Book>) {
      state.books.push(action.payload)
    },
    removeBookFromList(state, action: PayloadAction<{ id: string }>) {
      state.books = state.books.filter((book) => book.id !== action.payload.id)
    },
    editBook(state, action: PayloadAction<Book>) {
      const updatedBook = action.payload
      state.books = state.books.map((book) =>
        book.id === updatedBook.id
          ? {
              ...book,
              ...updatedBook,
            }
          : book
      )
    },
  },
})

export const { addBookToList, removeBookFromList, editBook } = bookSlice.actions
export default bookSlice.reducer
