/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { useEffect,useState } from "react"

const CartContinent = ({name,code,setCodeContinentFilter,codeContinentFilter}) => {

    const [imagen,setImagen] = useState(null);

    // `https://api.unsplash.com/search/photos/?client_id=${apiKeyUnsplash}&per_page=1&query=${capital}&content_filter=low`

    useEffect(()=>{
        const fetchApi = async () => {
            const apiKeyUnsplash = import.meta.env.VITE_API_KEY_UNSPLASH1;
            console.log(apiKeyUnsplash)
            const responseFetch = await fetch(`https://api.unsplash.com/search/photos/?client_id=${apiKeyUnsplash}&per_page=1&query=${name}&content_filter=low`);
            const response = await responseFetch.json();
            console.log(response);
            setImagen(response.results[0].urls.regular);
        }
        // fetchApi()
    },[])

    const handleClickChangeCode = () => {
        if(code===codeContinentFilter){
            setCodeContinentFilter('')
        }else{
            setCodeContinentFilter(code);
        }

    }

  return (
    <Button color="primary" variant={code===codeContinentFilter?"solid":"light"} 
    className="min-w-[120px] h-28 p-0 flex justify-start items-start m-0 rounded-lg overflow-hidden md:min-w-[200px] md:h-32"
    onClick={handleClickChangeCode}
    startContent={
    <div className={`w-full flex flex-col items-start gap-2`}>
        <img src={imagen} alt="" className="h-20 md:h-24 w-full rounded-lg"/>
        <h1 className={`text-xs md:text-md ${code===codeContinentFilter?'text-white':'text-slate-600'}`}>{name}</h1>
    </div>}
    />
  )
}

export default CartContinent