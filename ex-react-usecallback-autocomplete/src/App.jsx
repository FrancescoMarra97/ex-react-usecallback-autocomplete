
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    if (query === "") {
      setResults([])
      return
    }

    fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err))
  }, [query])
  return (
    <>
      <div className="container">
        <input type="text"
          placeholder='Cerca...'
          value={query}
          onChange={(e) => setQuery(e.target.value)} />

        {query && results.length > 0 && (
          <ul className='results-dropdown'>
            {results.map((result, i) => (
              <li key={i}>{result.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
