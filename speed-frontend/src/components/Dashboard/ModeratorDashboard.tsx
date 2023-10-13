import ArticleCard from './ArticleCard'

const ModeratorDashboard = ({ articles, handleAcceptArticle, handleRejectArticle }: any) => {
  return (
    <div className="relative bg-base-100 items-center justify-center min-h-screen">
      <h1>Moderator Dashboard</h1>

      {articles.length === 0 ? (
        <>
          <h1>NO ARTICLE FOUND!</h1>
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
