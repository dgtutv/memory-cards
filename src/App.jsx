import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [gifs, setGifs] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const limit = 80;
  const [screenLimit, setScreenLimit] = useState(18);
  const URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${getRandomInt(limit)}`;
  const [gifsClicked, setGifsClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (screenWidth > 1350){
        setScreenLimit(18);
      }
      if (screenWidth < 1350 && screenWidth > 1125){
        setScreenLimit(15);
      }
      if (screenWidth < 1125 && screenWidth > 920){
        setScreenLimit(12);
      }

      if (screenWidth < 920 && screenWidth > 350) {
        setScreenLimit(9);
      }

      if (screenWidth < 350){
        setScreenLimit(8);
      }
      
    };
    handleResize();
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [screenWidth, loading])

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

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  }

  const mobileStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }
  
  // Save score via cookies

  const pickRandom = () => {
    if (gifs.length <= screenLimit) return gifs;
    const randomOffset = getRandomInt(gifs.length - screenLimit);
    return gifs.slice(randomOffset, randomOffset + screenLimit);
  }


  return (
    <>
      {loading && <h2>Loading...</h2>}
      {screenWidth <= 475 &&
        <>
          <div style={mobileStyle}>
            <h1>Memory Game</h1>
            <h3>Current Score: {score}</h3>
            <h3>High Score: {highScore}</h3>
          </div>
          <div className='grid'>
            {pickRandom().map((gif) => (
              <div className="card" key={gif.id}alt={gif.title} onClick={()=>{
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
                }}>
                <img src={gif.images.fixed_height.url} />
              </div> 
            ))}
          </div>
          <h3>Remember which GIFs you've already chosen.</h3>
        </>
      }
      {screenWidth > 475 && 
      <>
        <div style={mainStyle}>
          <h1>Memory Game</h1>
          <h3>Current Score: {score}</h3>
          <h3>High Score: {highScore}</h3>
        </div>
        <div className='grid'>
          {pickRandom().map((gif) => (
            <div className="card" key={gif.id}alt={gif.title} onClick={()=>{
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
              }}>
              <img src={gif.images.fixed_height.url} />
            </div> 
          ))}
        </div>
        <h2>Remember which GIFs you've already chosen.</h2>
      </>}
      <h5>Powered by GIPHY</h5>
    </>
  );
}

export default App;