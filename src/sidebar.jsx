import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <div className="bg-blue-400 flex flex-col gap-4 h-screen">
      <div>Logo</div>
      <hr></hr>
      <div className="flex flex-col gap-4">
        <Link to={'/'}>Home</Link>
        <Link to={'/favorite'}>Favorites</Link>
      </div>
    </div>
  )
}

export default SideBar