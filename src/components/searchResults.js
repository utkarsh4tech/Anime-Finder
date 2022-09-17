import React, { useEffect, useState } from "react";
import "./stylesheets/searchResults.css";
import Loader from "./loader";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function SearchResults({ setFooter }) {
  const [results, setResults] = useState([]);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const animeName = queryParams.get("q");

  const dispatch = useDispatch();
  const send = (e) => {
    const obj = {
      image_url: `${e.image_url}`,
      title: `${e.title}`,
      mal_id: `${e.mal_id}`,
      episodes: `${e.episodes}`,
      score: `${e.score}`,
    };
    dispatch(ADD(obj));
  };

  const getSearch = async (query) => {
    if (animeName !== "") {
      setLoader(true);
      setFooter(false);
      let result = await axios.get(
        `https://api.jikan.moe/v3/search/anime?q=${query}&page=1`
      );
      setTimeout(function () {
        setLoader(false);
      }, 500);
      setTimeout(function () {
        setFooter(true);
      }, 500);
      let temp = result.data.results.slice(0, 20);
      setResults(temp);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (animeName !== "") {
      getSearch(animeName);
    }
  }, [animeName]);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="searchResults">
          {results.map((anime) => (
            <div className="searchItem" key={anime.mal_id}>
              <a
                href={`https://animixplay.to/anime/${anime.mal_id}/${anime.title}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="searchImg">
                  <img src={anime.image_url} alt={anime.title}></img>
                </div>
              </a>
              <div className="searchInfo">
                <a
                  href={`https://animixplay.to/anime/${anime.mal_id}/${anime.title}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3 className="searchTitle">{anime.title}</h3>
                </a>
                <h3 className="searchRated">{anime.rated}</h3>
                <div className="searchRating">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow" }}
                  ></i>
                  <p className="rating">{anime.score}</p>
                </div>
                <div>
                  <p className="searchSynopsis">{anime.synopsis}</p>
                </div>
                <div>
                  <span
                    onClick={() => send(anime)}
                    className="watchLater"
                    title="add to watch later"
                  >
                    <i className="fa-solid fa-plus watchPlus"></i>
                    <span className="watchLaterText">Add to Watch Later</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
