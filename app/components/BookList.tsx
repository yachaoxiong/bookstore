'use client'
import React, { useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Book } from '@/types'
import { Plus } from 'lucide-react'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BookDialog } from './BookDialog'
import { useAppDispatch } from '@/redux/hooks'
import { removeBookFromList } from '@/redux/slices/bookSlice'

export default function BookList() {
  const books = useAppSelector((state) => state.book.books)
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [book, setBook] = useState<Book | null>(null)

  const handleBookSelect = (book: Book) => {
    setBook(book)
    setShowModal(true)
    setIsNew(false)
  }
  const handleAddBook = () => {
    setIsNew(true)
    setShowModal(true)
  }

  const handleDeleteBook = (id: string) => {
    dispatch(removeBookFromList({ id }))
  }

  return (
    //card
    <div className="w-full">
      <div className="m-2 mr-auto w-full flex justify-end p-2">
        <Button variant="default" className="gap-2" onClick={handleAddBook}>
          <Plus size={16} className="font-bold" />
          Add Book
        </Button>
      </div>
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="relative overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books?.map((book: Book) => (
                <TableRow key={book?.id}>
                  <TableCell className="text-left cursor-pointer text-blue-700 font-bold hover:underline">
                    <a onClick={() => handleBookSelect(book)}>{book?.name}</a>
                  </TableCell>
                  <TableCell className="text-left">{book?.price}</TableCell>
                  <TableCell className="text-left">{book?.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleDeleteBook(book?.id)}
                    >
                      <Trash />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {books?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No books found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {showModal && (
        <BookDialog
          book={isNew ? null : book}
          isOpen={showModal}
          setIsOpen={setShowModal}
          isNew={isNew}
        />
      )}
    </div>
  )
}
