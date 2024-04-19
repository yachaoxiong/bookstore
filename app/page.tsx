import BookList from './components/BookList'

export default function Home() {
  return (
    <div className="md:container md:mx-auto">
      <div className="flex flex-col items-center justify-center py-2 w-full ">
        <BookList />
      </div>
    </div>
  )
}
