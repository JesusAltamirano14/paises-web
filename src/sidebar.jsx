import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import logo from "../src/fractal-up.jpeg";

const SideBar = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveButton("home");
    } else if (location.pathname === "/favorite") {
      setActiveButton("favorite");
    } else if (location.pathname === "/vista") {
      setActiveButton("vista");
    }
  }, [location]);

  return (
    <div className="bg-slate-400 w-full flex flex-col gap-4 h-screen p-2 md:p-5">
      <Image src={logo}/>
      <hr></hr>
      <div className="flex flex-col gap-4 w-full md:w-8/12">
        <Button 
          className={`flex justify-start items-start p-0 ${activeButton === "home" ? "bg-blue-500 text-white" : ""}`}
          endContent={<Link className="w-full h-full flex items-center justify-center text-xs md:text-base" to={'/'}>Home</Link>}
        />
        <Button 
          className={`flex justify-start items-start p-0 ${activeButton === "favorite" ? "bg-blue-500 text-white" : ""}`}
          endContent={<Link className="w-full h-full flex items-center justify-center text-xs md:text-base" to={'/favorite'}>Vista1</Link>}
        />
        <Button 
          className={`flex justify-start items-start p-0 ${activeButton === "vista" ? "bg-blue-500 text-white" : ""}`}
          endContent={<Link className="w-full h-full flex items-center justify-center text-xs md:text-base" to={'/vista'}>Vista2</Link>}
        />
      </div>
    </div>
  )
}

export default SideBar;