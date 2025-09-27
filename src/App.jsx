import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [gifs, setGifs] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 18;
  const URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${getRandomInt(100)}`;
  const [gifsClicked, setGifsClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(true);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    async function getGifs(){
      try {
        setLoading(true);
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Incorrect URL or connection issue.");
        }
        const data = await response.json();
        return data.data;
      } 
      catch (error) {
        console.error("Error:", error);
        return [];
      } 
      finally {
        setLoading(false);
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

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  }

  return (
    <>
      {loading && <h2>Loading...</h2>}
      <div style={mainStyle}>
        <h2>Current Score: {score}</h2>
        <h2>High Score: {highScore}</h2>
      </div>
      <div style={gridStyle}>
        {gifs.map((gif) => (
          <div style={cardStyle}>
            <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} style={imageStyle} onClick={()=>{
              if(!gifsClicked.includes(gif.id)){
                setGifsClicked([...gifsClicked, gif.id]);
                setScore(score + 1);
              }
              else{
                if(highScore < score){
                  setHighScore(score);
                }
                setScore(0);
                setGifsClicked([]);
              }
            }}/>
          </div> 
        ))}
      </div>
    </>
  );
}

export default App;