/* eslint-disable react/prop-types */
import { useEffect,useState } from "react"
import { useQuery,gql } from "@apollo/client";
import {useQuery as useQueryReact} from "@tanstack/react-query"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


// const fetchApi = async (name) => {
//     const apiKeyUnsplash = import.meta.env.VITE_API_KEY_UNSPLASH;
//     console.log(apiKeyUnsplash)
//     const responseFetch = await fetch(`https://pixabay.com/api/?key=17217991-03f3bbc33ce003fdc6e333bba&q=${name}`);
//     const response = await responseFetch.json();
//     return response
// }

const CartCountry = ({name,code,emoji}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [imagen,setImagen] = useState(null);
    const [continent,setContinent] = useState('');
    const [country,setCountry] = useState({});
    const GET_CONTINENT = gql`
        query getContinet($code:ID!){
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
    const {data} = useQuery(GET_CONTINENT,{variables:{code}});

    // const reactQueryImagenCountry = useQueryReact({
    //     queryKey:[`${code}`],
    //     queryFn: () => fetchApi(name)
    // });


    useEffect(()=>{
        if(data) {
            setContinent(data.country.continent.name);
            setCountry(data.country);
            console.log(data);
        }
        // if(reactQueryImagenCountry.data) setImagen(reactQueryImagenCountry.data.hits[0].previewURL)
        
    },[data])

  return (
    <>
    <Button className="h-[133px] p-0 flex justify-start items-start bg-white rounded-3xl overflow-hidden  lg:h-60 shadow-lg" 
    onPress={onOpen}
    endContent={
        <div className="w-full">
            <img src={imagen} alt="" className="h-24 w-full lg:h-48"/>
            <div className="flex justify-center gap-2">
                <h1 className="text-2xl md:text-5xl">{emoji}</h1>
                <span className="flex flex-col text-xs">
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
                <img src={imagen} className="rounded-md"/>
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
                <h1 className="font-semibol text-blue-400">Capital:</h1>
                <h2>{country.capital?country.capital:'no hay informacion'}</h2>
            </span>
            <span className="text-xs flex gap-4 md:text-base">
                <h1 className="font-semibol text-blue-400">Language:</h1>
                <h2>{country.languages[0]&&country.languages[0].name?country.languages[0].name:'no hay informacion'}</h2>
            </span>
            <span className="text-xs flex gap-4 md:text-base">
                <h1 className="font-semibol text-blue-400">Currency:</h1>
                <h2>{country.currency?country.currency:'no hay informacion'}</h2>
            </span>
            <span className="text-xs flex flex-col gap-4 md:text-base">
                <h1 className="font-semibol text-blue-400">Region:</h1>
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