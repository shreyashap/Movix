import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    setLastScrollY(window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchMovieHandler = (e) => {
    if (query === "" || !query.length > 0) return;
    if (e.key === "Enter") {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 500);
    }
  };

  const navigationHandler = (videoType) => {
    if (videoType === "movies") {
      navigate("/explore/movies");
    } else if (videoType === "home") {
      navigate("/");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper className="contentWrapper">
        <div className="logo">
          <img
            src={logo}
            alt="movix logo"
            onClick={() => navigationHandler("home")}
          />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movies")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("shows")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      <div className={` ${showSearch ? "searchBar" : "hidden"}`}>
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              required
              placeholder="Search for a movie or a tv show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchMovieHandler}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>
    </header>
  );
};

export default Header;
