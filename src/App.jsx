import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchData } from "./utils/api";
import { getApiConfiguration } from "./features/homeSlice";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Explore from "./pages/Explore/Explore";
import SearchResult from "./pages/SearchResult/SearchResult";
import PageNotFound from "./pages/404/Error";
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:mediaType/:id" element={<Details />} />
      <Route path="/search/:query" element={<SearchResult />} />
      <Route path="/explore/:mediaType" element={<Explore />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
