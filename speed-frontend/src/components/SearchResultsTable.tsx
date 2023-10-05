// components/SearchResultsTable.tsx
import React from 'react'

interface Book {
  _id: string
  title: string
  authors: string
  journal: string
  year: number
  volume: string
  pages: string
  doi: string
}

interface SearchResultsTableProps {
  data: Book[]
}

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ data }) => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Title</th>
          <th>Authors</th>
          <th>Journal</th>
          <th>Year</th>
          <th>Volume</th>
          <th>Pages</th>
          <th>DOI</th>
        </tr>
      </thead>
      <tbody>
        {data.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.authors}</td>
            <td>{book.journal}</td>
            <td>{book.year}</td>
            <td>{book.volume}</td>
            <td>{book.pages}</td>
            <td>{book.doi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SearchResultsTable
