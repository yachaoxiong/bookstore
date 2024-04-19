'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Book } from '@/types/index'
import { addBookToList, editBook } from '@/redux/slices/bookSlice'
import { useAppDispatch } from '@/redux/hooks'

// props with book type and open dialog and set dialog status
export function BookDialog({
  book,
  isOpen,
  setIsOpen,
  isNew = false,
}: {
  book: Book | null
  isOpen: boolean
  setIsOpen: any
  isNew?: boolean
}) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (book) {
      setName(book?.name)
      setPrice(book?.price)
      setCategory(book?.category)
      setDescription(book?.description)
    }
  }, [book])

  const handleSave = () => {
    // save book
    const newBook = {
      id: book?.id || Math.random().toString(36).substr(2, 9),
      name,
      price,
      category,
      description,
    }
    isNew ? dispatch(addBookToList(newBook)) : dispatch(editBook(newBook))
    if (isNew) {
      // reset form
      setName('')
      setPrice(0)
      setCategory('')
      setDescription('')
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add Book' : 'Edit Book'}</DialogTitle>
          <DialogDescription>
            {isNew ? 'Add new book' : 'Edit book details'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={price}
              className="col-span-3"
              onChange={(e) => setPrice(+e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              value={category}
              className="col-span-3"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
