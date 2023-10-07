import { SearchResultData } from '../types/index'

interface SearchResultsTableProps {
  data: SearchResultData[]
}

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto container">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Journal</th>
            <th>Year</th>
            <th>Volume</th>
            <th>Number of Pages</th>
            <th>Doi</th>
            <th>Claim</th>
            <th>SE Method</th>
          </tr>
        </thead>
        <tbody>
          {data.map((result) => (
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
