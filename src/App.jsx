import './App.css'
import { gql, useQuery } from '@apollo/client';



function App() {

  const getContinents = gql`
  query{
    country(code:"PE"){
      code
      currencies
      phones
    }
  }
  `
  const { data } = useQuery(getContinents);

  console.log(data);

  return (
    <>
      <div className='bg-red-500 text-white'>
        Jesus Altamirano
      </div>
    </>
  )
}

export default App
