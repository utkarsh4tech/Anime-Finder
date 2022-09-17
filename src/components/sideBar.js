import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylesheets/sideBar.css";

function SideBar() {
  const [top, setTop] = useState([]);
  const [seasonal, setSeasonal] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    async function getUpcoming() {
      const request = await axios.get("https://api.jikan.moe/v3/season/later");
      const temp = request.data.anime.slice(0, 11);
      setUpcoming(temp);
    }

    async function getTop() {
      const request = await axios.get(
        "https://api.jikan.moe/v3/top/anime/1/bypopularity"
      );
      const temp = request.data.top.slice(0, 11);
      temp.sort((b, a) => a.score - b.score);
      setTop(temp);
    }

    async function getSeasonal() {
      const request = await axios.get(
        "https://api.jikan.moe/v3/season/2022/summer"
      );
      const temp = request.data.anime.slice(0, 11);
      setSeasonal(temp);
    }
    getTop();
    getSeasonal();
    getUpcoming();
  }, []);

  return (
    <div className="sidebar">
      <div className="sideContainer1 sideContainer">
        <h2 className="sidebarTitle">Top Anime</h2>
        {top.map((anime) => (
          <a
            href={`https://animixplay.to/anime/${anime.mal_id}/${anime.title}`}
            target="_blank"
            rel="noreferrer"
          >
            <div key={anime.mal_id} className="sideanime">
              <img src={anime.image_url} alt="not available"></img>
              <div>
                <p>
                  {anime.title.length > 60
                    ? `${anime.title.slice(0, 60)}....`
                    : anime.title}
                </p>
                <div className="ratings">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow" }}
                  ></i>
                  <p>{anime.score}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="sideContainer2 sideContainer">
        <h2 className="sidebarTitle">Summer 2022</h2>
        {seasonal.map((anime) => (
          <a
            href={`https://animixplay.to/anime/${anime.mal_id}/${anime.title}`}
            target="_blank"
            rel="noreferrer"
          >
            <div key={anime.mal_id} className="sideanime">
              <img src={anime.image_url} alt="not available"></img>
              <div>
                <p>
                  {anime.title.length > 60
                    ? `${anime.title.slice(0, 60)}....`
                    : anime.title}
                </p>
                <div className="ratings">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow" }}
                  ></i>
                  <p>{anime.score}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="sideContainer3 sideContainer">
        <h2 className="sidebarTitle">Upcoming</h2>
        {upcoming.map((anime) => (
          <a
            href={`https://animixplay.to/anime/${anime.mal_id}/${anime.title}`}
            target="_blank"
            rel="noreferrer"
          >
            <div key={anime.mal_id} className="sideanime">
              <img src={anime.image_url} alt="not available"></img>
              <div>
                <p>
                  {anime.title.length > 60
                    ? `${anime.title.slice(0, 60)}....`
                    : anime.title}
                </p>
                <div>
                  <p className="airing" style={{ color: "grey" }}>
                    <span style={{ color: "white" }}>airing - </span>
                    {anime.airing_start
                      ? anime.airing_start.slice(0, 10)
                      : "TBA"}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
