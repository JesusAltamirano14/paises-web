import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import {NextUIProvider} from "@nextui-org/react";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_PAISES_URI ,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
      <NextUIProvider>
        <App/>
      </NextUIProvider>
    </ApolloProvider>,
)
