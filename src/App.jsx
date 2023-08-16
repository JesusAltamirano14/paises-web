import './App.css'
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';



function App() {

  const [continents,setContinents] = useState([]);

  const GET_CODE_CONTINENTS = gql`
  query{
    continents{
      code
      name
    }
  }
  `
  const getContinents = useQuery(GET_CODE_CONTINENTS);
  useEffect(()=>{

    if(getContinents.data){
      setContinents(getContinents.data.continents);
    }

  },[getContinents.data])

  return (
    <>
      <div className='bg-red-500 text-white'>
        {getContinents.loading?<div>loading ... </div>:(
          <>
          {continents.map((continent)=>(<div key={continent.code}>{continent.code}</div>))}
          </>
        )}
      </div>
    </>
  )
}

export default App
