/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import {Input,Button,Pagination,Card,Skeleton} from "@nextui-org/react";
import {AiOutlineSearch} from 'react-icons/ai'
import CartContinent from '../components/CartContinent';
import CartCountry from '../components/CartCountry';
import { AiOutlineClose } from 'react-icons/ai';



const Filtros = ({continents ,setInputIsClicked, setCodeContinentFilter,codeContinentFilter,inputRef}) => {
    return(
        <>
            <div className='bg-white shadow-xl py-3 flex flex-col gap-2 absolute z-50 left-0 top-[60px] w-full rounded-lg overflow-hidden lg:rounded-3xl'>
                <div className='w-full flex gap-2 px-2 md:px-6'>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-xs font-bold text-slate-500'>Filtrar por continentes</h1>
                        <button onClick={()=>{setCodeContinentFilter('')}} className='text-blue-400 text-xs'>Limpiar</button>
                    </div>
                    <Button variant='solid' className='p-0' isIconOnly size='sm' onClick={()=>{setInputIsClicked(false);inputRef.current.focus()}}>
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

    const numberOfPages = Math.ceil(countriesPerSearch.length/postsPerPage);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = countriesPerSearch.slice(firstPostIndex,lastPostIndex);

    //searching
    const [searchWord, setSearchWord] = useState('');

    //autofocus to input
    const inputRef = useRef(null);

  
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
    const [getFilteredCountries,{data,loading}] = useLazyQuery(GET_FILTERED_COUNTRIES);

  useEffect(()=>{
    getFilteredCountries({variables:{code:codeContinentFilter}});
    if(getContinents.data)setContinents(getContinents.data.continents);

    if(data){
        setAllCountries(data.countries);
        setCountriesPerSearch(data.countries);
    }

  },[codeContinentFilter,getContinents.data,data,getFilteredCountries]);


  const handleSearchButton = () => {
    const newArray = allCountries.filter(countrie=>countrie.name.toUpperCase().includes(searchWord.toUpperCase()));
    setCountriesPerSearch(newArray);
    setInputIsClicked(false);
  }
  const handleClearSearch = () => {
    const newArray = allCountries.filter(countrie=>countrie.name.toUpperCase().includes(''));
    setCountriesPerSearch(newArray);
    setInputIsClicked(false);
    setSearchWord('')
  }

  return (
    <div className='bg-blue-100 h-screen flex flex-col items-start justify-start gap-2 md:gap-6 pt-2'>
        <div onClick={()=>setInputIsClicked(true)} className='flex justify-center w-full p-2'>
            <div className="flex flex-wrap md:flex-nowrap gap-4 relative lg:w-8/12 w-full">
                <Input type="text" label="Pais" onKeyUp={(e)=>{e.key==='Enter'?handleSearchButton():null}}
                ref={inputRef}
                value={searchWord}
                onChange={(e)=>{setSearchWord(e.target.value)}}
                endContent={
                    <>
                    {searchWord?
                    <Button variant='light' className='p-0' isIconOnly size='sm' onClick={handleClearSearch}>
                        <AiOutlineClose className='w-4 h-4'/>
                    </Button>:null}
                    <Button color='primary' className='p-0 md:p-2' endContent={<AiOutlineSearch className='w-4 h-4 md:w-6 md:h-6'/>} onClick={handleSearchButton}>
                        <h1 className='text-xs md:text-base'>Buscar</h1>
                    </Button>
                    </>
                }/>
                {inputIsClicked?
                <Filtros 
                continents={continents}
                inputIsClicked={inputIsClicked} setCodeContinentFilter={setCodeContinentFilter} setInputIsClicked={setInputIsClicked}
                codeContinentFilter={codeContinentFilter}
                inputRef={inputRef}
                />
                :null}
            </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-4 md:gap-6'>
            <div className='grid grid-cols-2 gap-2 justify-normal w-11/12 items-start md:gap-4 md:grid-cols-3 lg:grid-cols-4 '>
                {!loading?
                currentPosts?.map(countrie=>(<CartCountry name={countrie.name} code={countrie.code} emoji={countrie.emoji} key={countrie.name}/>))
                :(
                    [1,2,3,4,5,6,7,8,9,10].map((component,index)=>(
                        <Card key={"s"+index.toString()} className="min-w-[120px] space-y-2 p-2 md:min-w-[200px]" radius="2xl">
                            <Skeleton className="rounded-lg">
                                <div className="h-12 rounded-lg bg-default-300 md:h-32"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200 md:h-5"></div>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200 md:h-5"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">  
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300 md:h-5"></div>
                                </Skeleton>
                            </div>    
                        </Card>
                    ))    
                )}
            </div>
            <div className='w-11/12 flex'>
                <Pagination size={'md'} total={numberOfPages} initialPage={1} onChange={(page)=>{setCurrentPage(page)}}/>
            </div>
        </div>
    </div>
  )
}

export default Home