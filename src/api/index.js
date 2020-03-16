const API_URL_START = 'https://hacker-news.firebaseio.com/v0/'
const API_URL_END = '.json'
export const fetchData = async (partialUrl, maxResults) => {
  let result = await fetch(API_URL_START + partialUrl + API_URL_END)
  result = await result.json()
  if(maxResults && Array.isArray(result)) result.length = maxResults
  return result
}
