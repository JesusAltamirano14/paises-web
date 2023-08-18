import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

const SideBar = () => {
  return (
    <div className="bg-slate-400 w-full flex flex-col gap-4 h-screen p-2 md:p-5">
      <div>Logo</div>
      <hr></hr>
      <div className="flex flex-col gap-4 w-full md:w-8/12">
        <Button 
        className="flex justify-start items-start p-0"
        endContent={<Link className="w-full h-full flex items-center justify-center" to={'/'}>Home</Link>}
        />
        <Button 
        className="flex justify-start items-start p-0 "
        endContent={<Link className="w-full h-full flex items-center justify-center" to={'/favorite'}>Favorites</Link>}
        />
      </div>
    </div>
  )
}

export default SideBar