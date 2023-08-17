/* eslint-disable react/prop-types */
import { useEffect,useState } from "react"
import { useQuery,gql } from "@apollo/client";

const CartCountry = ({name,code,emoji,capital}) => {

    const [imagen,setImagen] = useState(null);
    const [continent,setContinent] = useState('');

    const GET_CONTINENT = gql`
        query getContinet($code:ID!){
            country(code:$code){
            name
            continent{
            name
            }
            }
        }
    `
    const {data} = useQuery(GET_CONTINENT,{variables:{code}});

    // `https://api.unsplash.com/search/photos/?client_id=${apiKeyUnsplash}&per_page=1&query=${capital}&content_filter=low`

    useEffect(()=>{
        if(data) setContinent(data.country.continent.name)
        const fetchApi = async () => {
            const apiKeyUnsplash = import.meta.env.VITE_API_KEY_UNSPLASH;
            console.log(apiKeyUnsplash)
            const responseFetch = await fetch(`https://pixabay.com/api/?key=17217991-03f3bbc33ce003fdc6e333bba&q=${name}`);
            const response = await responseFetch.json();
            console.log(response);
            setImagen(response.hits[0].previewURL);
        }
        // fetchApi();
    },[data])

  return (
    <div className="h-[133px] bg-white rounded-3xl overflow-hidden lg:h-60 shadow-lg">
        <img src={imagen} alt="" className="h-24 w-full lg:h-48"/>
        <div className="flex justify-center">
            <h1>{emoji}</h1>
            <span className="flex flex-col text-xs">
                <h1 className="text-blue-400 font-semibold">{name}</h1>
                <h1 className="text-black" >{continent}</h1>
            </span>
        </div>
    </div>
  )
}

export default CartCountry


/*
query{
 	countries(filter: { code: { regex: "^A"} }) {
        code
        name
        currency
        }
}
*/