import { useEffect, useState } from "react";
// Were going 👇 to use useQuery when we want to fetch data from out server.
import {useQuery, useQueryClient} from 'react-query'
import { PostDetail } from "./PostDetail";

// this is because the page limit on the api is 10 (check the https couple of lines down)
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  // for this api the page numberinh starts at  👇
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage <maxPostPage){
    const nextPage = currentPage + 1;
    //asynchronous method 👇 that can be used to prefetch a query before it is needed
    queryClient.prefetchQuery(['posts', nextPage], () =>fetchPosts(nextPage))
    }
  }, [currentPage, queryClient])

  // replace with useQuery
  // when the query key (below its in an array) changes, we alert useQuery so that it can refetch the data.
  // When the currentPage changes, react query will update the data 👇
  const {data, isError, error, isLoading} = useQuery(['posts', currentPage], () => fetchPosts(currentPage), {staleTime: 2000, keepPreviousData: true });
  if (isLoading) return <h3 >Loading ...</h3>
  if (isError) return <> <h3> Bir sorun oldu knk</h3> <p>{error.toString()}</p> </>
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button 
          disabled = {currentPage <= 1}  
          onClick={() => {
            setCurrentPage((previousValue) => previousValue -1) 
            }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button 
        disabled = {currentPage >= maxPostPage}
        onClick={() => {
            setCurrentPage((previousValue) => previousValue +1)
        }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
