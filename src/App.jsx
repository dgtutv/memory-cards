import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [gifs, setGifs] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 18;
  const URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${getRandomInt(100)}`;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    async function getGifs(){
      try{
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error("Incorrect URL or connection issue.");
        }
        const data = await response.json();
        return data.data;
      } 
      catch(error){
          console.error("Error:", error);
          return [];
      }
    }

    getGifs().then((gifs) => setGifs(gifs));
    
  }, [])

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  }

  const cardStyle = {
    width: "200px",
    height: "150px",
    overflow: "hidden"
  }

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  }

  return (
    <>
      <div style={gridStyle}>
        {gifs.map((gif) => (
          <div style={cardStyle}>
            <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} style={imageStyle} />
          </div> 
        ))}
      </div>
    </>
  )
}

export default App
