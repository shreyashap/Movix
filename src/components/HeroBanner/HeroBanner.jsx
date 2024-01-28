import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../ImgLazyLoading/Img";
import "./heroBanner.scss";

const HeroBanner = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchMovieHandler = () => {
    if (query === "" || !query.length > 0) return;
    navigate(`/search/${query}`);
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdropImg">
          <Img src={background} />
        </div>
      )}
      <div className="opacityLayer"></div>
      <ContentWrapper>
        <div className="content">
          <span className="title">Welcome.</span>
          <span className="subtitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              required
              placeholder="Search for a movie or a tv show..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchMovieHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
