import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteQuery, UseInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  // the function 👇 were using to tell infinite scroll what function to run when we want more data
  // is a boolean that is going to 👇 determine whether theres anymore data that needs to be collected
  const {data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error} = useInfiniteQuery
  (
    "sw-people", //key
    ({pageParam = initialUrl}) => fetchUrl(pageParam), //query function
    // fetchUrl takes our pageParam which is our url, fetches it and returns json
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
                                    // 👆 if lastPage.next is falsey set it to undefined.
  );

  if (isLoading ) return <div className="loading"> Loading ... </div>
  if (isError) return <div> Error ! {error.toString()}</div>

return (
  <>
  {isFetching && <div className="loading"> Loading ... </div>} 
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => {
          return (
            <Person 
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          );
        });
      })}
    </InfiniteScroll>
  </>
  );
}