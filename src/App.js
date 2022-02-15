import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [endPoint, setEndPoint] = useState("");

  const [container, setContainer] = useState([]);

  const [finalPoint, setFinalPoint] = useState("");

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${endPoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "da661d6ee7msh0832edfa66b8cfcp17ed83jsn2342c8175d2c",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContainer(data.d);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Movies Hub</h1>
      </div>
      <section className="main-section">
        
          <form onSubmit={submitHandler} className="form">
            <input
              type="text"
              placeholder="search something..."
              value={endPoint}
              onChange={onChangeHandler}
            />
            <button type="submit">search</button>
          </form>
          <div className="cards-container">
            {container.map((item) => {
              return (
                <div className="cards">
                  <img src={item.i.imageUrl} alt="images" />
                  <p>{item.l}</p>
                </div>
              );
            })}
          </div>
        
      </section>
    </div>
  );
}

export default App;
