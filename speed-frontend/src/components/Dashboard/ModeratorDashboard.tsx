import ArticleCard from './ArticleCard'

const ModeratorDashboard = ({ articles, handleAcceptArticle, handleRejectArticle }: any) => {
  return (
    <div className="container relative items-center justify-center">
      <h1 className="text-4xl font-bold text-center mt-8">Moderator Dashboard</h1>

      {articles.length === 0 ? (
        <>
          <h1 className='text-center'>NO ARTICLE FOUND!</h1>
        </>
      ) : (
        <div className="my-20">
          {articles.map((article: any) => (
            <ArticleCard
              key={article._id}
              article={article}
              onAccept={handleAcceptArticle}
              onReject={handleRejectArticle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ModeratorDashboard
