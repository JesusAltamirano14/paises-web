/* eslint-disable react/prop-types */
import { useEffect,useState } from "react"
import { useQuery,gql } from "@apollo/client";
import {useQuery as useQueryReact} from "@tanstack/react-query"
// import america from '../continentes/sudamerica.png'
import { Image } from "@nextui-org/react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const fetchApi = async (name) => {
    const apiKeyPixabay = import.meta.env.VITE_API_KEY_PIXABAY;
    const responseFetch = await fetch(`https://pixabay.com/api/?key=${apiKeyPixabay}&q=${name}`);
    const response = await responseFetch.json();
    return response
}

const CartCountry = ({name,code,emoji}) => {

    // next-ui - funcionamiento de modal
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [imagen,setImagen] = useState(null);
    const [continent,setContinent] = useState('');
    const [country,setCountry] = useState({});
    const GET_INFO_COUNTRY = gql`
        query getInfoCountry($code:ID!){
            country(code:$code){
                name
                capital
    			languages{
                    name
                }
    			currency
    			states{
                    name
                }
                continent{
                    name
                }
            }
        }
    `
    const {data} = useQuery(GET_INFO_COUNTRY,{variables:{code}});

    const reactQueryImagenCountry = useQueryReact({
        queryKey:[`${code}`],
        queryFn: () => fetchApi(name)
    });


    useEffect(()=>{
        if(data) {
            setContinent(data.country.continent.name);
            setCountry(data.country);
        }
        if(reactQueryImagenCountry.data) setImagen(reactQueryImagenCountry.data.hits[0].webformatURL)
        
    },[data])

  return (
    <>
    <Button className="h-[133px] p-0 flex justify-start items-start bg-white rounded-3xl overflow-hidden lg:h-60 shadow-lg" 
    onPress={onOpen}
    endContent={
        <div className="w-full">
            <Image isZoomed alt="limit api images exceeded" src={imagen} isBlurred width={500} className="h-24 lg:h-48"/>
            <div className="flex justify-center gap-2">
                <h1 className="text-2xl md:text-5xl">{emoji}</h1>
                <span className="flex flex-col text-xs md:text-base">
                    <h1 className="text-blue-400 font-semibold">{name.length>12?name.slice(0,12)+'...':name}</h1>
                    <h1 className="text-black" >{continent}</h1>
                </span>
            </div>
        </div>
    }
    
    />
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex flex-col gap-4">
                <Image width={500} src={imagen} className="rounded-md"/>
                <section className="flex items-center gap-4">
                    <h1 className="text-7xl">{emoji}</h1>
                    <div>
                        <h1 className="text-blue-400 font-semibold">{name}</h1>
                        <h1>{continent}</h1>
                    </div>
                </section>
            </div>
          </ModalHeader>
          <ModalBody>
          <span className="text-xs flex gap-4 md:text-base">
                <h1 className="font-semibold text-blue-400">Capital:</h1>
                <h2>{country.capital?country.capital:'no hay informacion'}</h2>
            </span>
            <span className="text-xs flex gap-4 md:text-base">
                <h1 className="font-semibold text-blue-400">Language:</h1>
                <h2>{country.languages&&country.languages.length>0&&country.languages[0]&&country.languages[0].name?country.languages[0].name:'no hay informacion'}</h2>
            </span>
            <span className="text-xs flex gap-4 md:text-base">
                <h1 className="font-semibold text-blue-400">Currency:</h1>
                <h2>{country.currency?country.currency:'no hay informacion'}</h2>
            </span>
            <span className="text-xs flex flex-col gap-4 md:text-base">
                <h1 className="font-semibold text-blue-400">Region:</h1>
                <div className=" h-32 shadow-lg overflow-y-scroll always-scroll p-4">
                    {country.states&&country.states.length>0?country.states?.map((state,index)=>(<h1 className="text-slate-500" key={state.name+index.toString()}>{state.name}</h1>)):'no hay informacion'}
                </div>
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  </>
  )
}

export default CartCountry