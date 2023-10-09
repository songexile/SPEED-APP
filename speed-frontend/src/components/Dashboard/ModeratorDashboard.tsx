import { Nav } from '@/components'
import ArticleCard from './ArticleCard'

const ModeratorDashboard = ({ articles }: any) => (
  <div className="relative bg-base-100 items-center justify-center min-h-screen">
    <h1>Moderator Dashboard</h1>
    <div className="my-20">
      {articles.map((article: any) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
    <Nav />
  </div>
)

export default ModeratorDashboard
