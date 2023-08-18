/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import africa from "../continentes/africa.png"
import antarctica from "../continentes/antarctica.png"
import asia from "../continentes/asia.png"
import europa from "../continentes/europa.png"
import norteamerica from "../continentes/norteamerica.png"
import oceania from "../continentes/oceania.png"
import sudamerica from "../continentes/sudamerica.png"


// const fetchApi = async (name) => {
//     const apiKeyUnsplash = import.meta.env.VITE_API_KEY_UNSPLASH1;
//     const responseFetch = await fetch(`https://api.unsplash.com/search/photos/?client_id=${apiKeyUnsplash}&per_page=1&query=${name}&content_filter=low`);
//     const response = await responseFetch.json();
//     return response
// }


const CartContinent = ({name,code,setCodeContinentFilter,codeContinentFilter}) => {

    const imagenes = [
    {code:"AF",imagen:africa},
    {code:"AN",imagen:antarctica},
    {code:"SA",imagen:sudamerica},
    {code:"EU",imagen:europa},
    {code:"NA",imagen:norteamerica},
    {code:"AS",imagen:asia},
    {code:"OC",imagen:oceania}]


    // const reactQueryImagen = useQuery(
    //     {
    //         queryKey:[`${name}`],
    //         queryFn:()=>fetchApi(name)
    //     }
    // )
    const imagenEncontrada = imagenes.find(img => img.code === code).imagen;

    const handleClickChangeCode = () => {
        if(code===codeContinentFilter){
            setCodeContinentFilter('')
        }else{
            setCodeContinentFilter(code);
        }

    }

  return (
    <Button color="primary" variant={code===codeContinentFilter?"solid":"light"} 
    className={`min-w-[120px] h-28 p-0 flex justify-start items-start m-0 rounded-lg overflow-hidden md:min-w-[200px] md:h-32 ${code===codeContinentFilter?'border-2 border-blue-500':''}`}
    onClick={handleClickChangeCode}
    startContent={
    <div className={`w-full flex flex-col items-start gap-2`}>
        <img src={imagenEncontrada} alt="" className="h-20 md:h-24 w-full rounded-lg"/>
        <h1 className={`text-xs md:text-md ${code===codeContinentFilter?'text-white':'text-slate-600'}`}>{name}</h1>
    </div>}
    />
  )
}

export default CartContinent