import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const App = ()=> {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    };

    fetchMovies();
  }, []);

  const increaseRating = async (movie) => {
    const newRating = movie.stars + 1
    const response = await axios.put(`/api/movies/${movie.id}`, {title: movie.title, stars: newRating})
    const newMovies = movies.map((movieMap) => {
      if(movieMap.id === movie.id) {
        return response
      }else {
        return movieMap;
      }
    });
    setMovies(newMovies)
  }

  return (
    <div>
    <h1>Rotten Potatoes ({ movies.length }) </h1>
    <ul>
      {
        movies.map( movie => {
          return(
            <li key={ movie.id }>
              <h2>{ movie.title }</h2>
              <h3>
                <span>
                  Rating: {movie.stars} Stars
                  <button onClick={() => {increaseRating(movie)}}>
                    +
                  </button>
                  <button>
                    -
                  </button>
                </span>
              </h3>
            </li>
          );
        })
      }
    </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
