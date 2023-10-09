import React, { useState } from 'react'
import { DecodedToken, SearchResultData } from '../types/index'
import { useSession } from 'next-auth/react'
import jwt_decode from 'jwt-decode'
import { User } from 'next-auth'

interface SearchResultsTableProps {
  data: SearchResultData[]
  onDelete?: (id: string) => void
}

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ data, onDelete }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { data: session } = useSession()

  const user: User | any = session?.user

  // Get User Role
  let userRole = ''
  if (user?.accessToken) {
    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    userRole = decodedToken.role
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  const sortedData = [...data]

  if (sortColumn) {
    sortedData.sort((a, b) => {
      const aValue = a[sortColumn as keyof SearchResultData]
      const bValue = b[sortColumn as keyof SearchResultData]
      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  return (
    <div className="overflow-x-auto container">
      <table className="table mb-20">
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Title {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('authors')}>
              Authors {sortOrder === 'asc' ? ' ▲' : ' ▼'}
            </th>
            <th onClick={() => handleSort('journal')}>
              Journal {sortOrder === 'asc' ? ' ▲' : ' ▼'}
            </th>
            <th onClick={() => handleSort('year')}>Year {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('volume')}>Volume {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('pages')}>
              Number of Pages {sortOrder === 'asc' ? ' ▲' : ' ▼'}
            </th>
            <th onClick={() => handleSort('doi')}>Doi {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('claim')}>Claim {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('method')}>
              SE Method {sortOrder === 'asc' ? ' ▲' : ' ▼'}
            </th>
            {userRole === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((result) => (
            <tr key={result._id}>
              <td>{result.title}</td>
              <td>{result.authors}</td>
              <td>{result.journal}</td>
              <td>{result.year}</td>
              <td>{result.volume}</td>
              <td>{result.pages}</td>
              <td>{result.doi}</td>
              <td>{result.claim}</td>
              <td>{result.method}</td>
              {userRole === 'admin' && (
                <td>
                  <button
                    onClick={() => onDelete && onDelete(result._id)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SearchResultsTable
