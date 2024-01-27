import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./utils/api";
import { getApiConfiguration } from "./features/homeSlice";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    apiTesting();
  }, []);
  const apiTesting = async () => {
    const response = await fetchData("/movie/popular");
    console.log(response);
    dispatch(getApiConfiguration(response));
  };

  return (
    <>
      <div className="App">App {url?.total_pages}</div>
    </>
  );
}

export default App;
