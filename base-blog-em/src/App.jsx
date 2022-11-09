import { Posts } from "./Posts";
import "./App.css";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'

// 👇 creating a client which has our cache and all of our default options
const queryClient = new QueryClient;

function App() {
  return (
    // provide React Query client to App
    // Everything withing QueryClientProvider can use our React query hooks.
    <QueryClientProvider client = {queryClient}>
    <div className="App">
      <h1>Blog Posts</h1>
      <Posts />
    </div>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  ); 
}

export default App;
