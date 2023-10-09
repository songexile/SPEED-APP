const ArticleCard = ({ article }: any) => {
  const { title, authors, journal, year, volume, pages, doi } = article

  return (
    <div className="bg-red-100 dark:bg-gray-800 p-4 rounded-lg shadow-md my-10">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Authors: {authors}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Journal: {journal}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Year: {year}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Volume: {volume}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Pages: {pages}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">DOI: {doi}</p>
      <div className="mt-4 flex justify-end">
        <button className="bg-green-500 text-white px-2 py-1 rounded-md mr-2">Accept</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Reject</button>
      </div>
    </div>
  )
}

export default ArticleCard
