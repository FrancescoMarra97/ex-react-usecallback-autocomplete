
import { useEffect, useState, useCallback } from 'react'
import './App.css'

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

function App() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  console.log(results);

  const fetchResults = async (query) => {
    if (query.trim() === "") {
      setResults([])
      return
    }
    try {
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error(error)
    }


  }

  const debouncedFetchResults = useCallback(
    debounce(fetchResults, 500)
    , [])
  useEffect(() => {
    debouncedFetchResults(query)
  }, [query])
  return (
    <>
      <div className="container">
        <h1>Autocomplete</h1>
        <input className='d-flex justify-content-center m-3' type="text"
          placeholder='Cerca...'
          value={query}
          onChange={(e) => setQuery(e.target.value)} />

        {query && results.length > 0 && (
          <ul className='results-dropdown'>
            {results.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
