import { useState, useEffect } from "react";
import { fetchData } from "./utils/api";
import "./App.scss";

function App() {
  useEffect(() => {
    apiTesting();
  }, []);
  const apiTesting = async () => {
    const response = await fetchData("/movie/popular");
    console.log(response);
  };

  return (
    <>
      <div className="App">App</div>
    </>
  );
}

export default App;
