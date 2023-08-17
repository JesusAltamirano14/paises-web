/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import {Input,Button,Pagination} from "@nextui-org/react";
import {AiOutlineSearch} from 'react-icons/ai'
import CartContinent from '../components/CartContinent';
import CartCountry from '../components/CartCountry';
import { AiOutlineClose } from 'react-icons/ai';


const Filtros = ({continents ,setInputIsClicked, setCodeContinentFilter,codeContinentFilter}) => {
    return(
        <>
            <div className='bg-white shadow-xl py-3 flex flex-col gap-2 absolute z-50 left-0 top-[60px] w-full rounded-lg overflow-hidden lg:rounded-3xl'>
                <div className='w-full flex gap-2 px-2 md:px-6'>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-xs font-bold text-slate-500'>Filtrar por continentes</h1>
                        <button onClick={()=>{setCodeContinentFilter('')}} className='text-blue-400 text-xs'>Limpiar</button>
                    </div>
                    <Button variant='solid' className='p-0' isIconOnly size='sm' onClick={()=>{setInputIsClicked(false)}}>
                        <AiOutlineClose className='w-5 h-5'/>
                    </Button>
                </div>
                <div className='mx-auto grid grid-cols-2 px-2 flex-wrap gap-4 md:grid-cols-4'>
                    {continents?.map((continent)=>
                    (<CartContinent codeContinentFilter={codeContinentFilter} setCodeContinentFilter={setCodeContinentFilter} key={continent.code} name={continent.name} code={continent.code}/>))}
                </div>
            </div>
        </>
    )
    
}

function Home() {
    const [continents,setContinents] = useState([]);
    const [inputIsClicked,setInputIsClicked] = useState(false);
    const [allCountries,setAllCountries] = useState([]);
    const [countriesPerSearch,setCountriesPerSearch] = useState([]);
    const [codeContinentFilter,setCodeContinentFilter] = useState('')

    //pagination
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const numberOfPages = Math.ceil(allCountries.length/postsPerPage);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = countriesPerSearch.slice(firstPostIndex,lastPostIndex);

    //searching

    const [searchWord, setSearchWord] = useState('');

  
    const GET_FILTERED_COUNTRIES = gql`
    query getFilteredCountries($code:String!){
 	    countries(filter:{continent:{regex:$code}}){
        name
        code
        capital
        emoji
        }
    }
    `
    const GET_CODE_CONTINENTS = gql`
    query{
    continents{
        code
        name
    }
    }
    `
    const getContinents = useQuery(GET_CODE_CONTINENTS);
    const [getFilteredCountries,{data}] = useLazyQuery(GET_FILTERED_COUNTRIES);

  useEffect(()=>{
    getFilteredCountries({variables:{code:codeContinentFilter}});
    if(getContinents.data)setContinents(getContinents.data.continents);

    if(data){
        setAllCountries(data.countries);
        setCountriesPerSearch(data.countries);
    }
    if(data) console.log(data);

  },[codeContinentFilter,getContinents.data,data]);


  const handleSearchButton = () => {
    const newArray = allCountries.filter(countrie=>countrie.name.toUpperCase().includes(searchWord.toUpperCase()));
    setCountriesPerSearch(newArray);
    setInputIsClicked(false);
  }

  return (
    <div className='bg-blue-100 h-screen flex flex-col items-start justify-start gap-2'>
        <div onClick={()=>setInputIsClicked(true)} className='flex justify-center w-full'>
            <div className="flex flex-wrap md:flex-nowrap gap-4 relative lg:w-8/12">
                <Input type="text" label="Pais" onKeyUp={(e)=>{e.key==='Enter'?handleSearchButton():null}} onChange={(e)=>{setSearchWord(e.target.value)}} endContent={
                    <Button color='primary' endContent={<AiOutlineSearch className='w-7 h-7'/>} onClick={handleSearchButton}>
                        Buscar
                    </Button>
                }/>
                {inputIsClicked?
                <Filtros 
                continents={continents}
                inputIsClicked={inputIsClicked} setCodeContinentFilter={setCodeContinentFilter} setInputIsClicked={setInputIsClicked}
                codeContinentFilter={codeContinentFilter}
                />
                :null}
            </div>
        </div>
        <div className='w-full flex justify-center items-center'>
            <div className='grid grid-cols-2 gap-4 justify-normal w-11/12 items-start md:grid-cols-3 lg:grid-cols-4'>
                {currentPosts?.map(countrie=>(<CartCountry onClick={()=>{console.log('click')}} name={countrie.name} code={countrie.code} emoji={countrie.emoji} key={countrie.name}/>))}
            </div>
        </div>
            <Pagination size={'sm'} total={numberOfPages} initialPage={1} onChange={(page)=>{setCurrentPage(page)}}/>
    </div>
  )
}

export default Home