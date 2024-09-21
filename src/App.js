import { useState, useEffect } from 'react';
import Moviecard from './Moviecard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;



function App() {

  const [movies, setMovie] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  
  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovie(data.Search);
  }
  
  useEffect(() =>{
    searchMovie('Batman');
  }, []);
  
  return (
    <div className="app">
      <h1>MovieSeacher</h1>
      <div className="search">
        <input type="text" placeholder="Search movie..." 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') searchMovie(searchValue)}}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovie(searchValue)}/>
      </div>

      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <Moviecard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      <h2>Created by NoahKoh</h2>
    </div>
  );
}

export default App;
