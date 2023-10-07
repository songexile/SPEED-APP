import React, { useState } from 'react'
import { SearchResultData } from '../types/index'

interface SearchResultsTableProps {
  data: SearchResultData[]
}

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
      <table className="table">
        <thead>
          <tr>
          <th onClick={() => handleSort('title')}>Title {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('authors')}>Authors {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('journal')}>Journal {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('year')}>Year {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('volume')}>Volume {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('pages')}>Number of Pages {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('doi')}>Doi {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('claim')}>Claim {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
            <th onClick={() => handleSort('method')}>SE Method {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SearchResultsTable
