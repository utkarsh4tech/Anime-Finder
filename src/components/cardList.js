import React, { useState, useEffect } from "react";
import "./stylesheets/cardList.css";
import Card from "./card";
import axios from "axios";
import Loader from "./loader";

function CardList({ genere, setFooter }) {
  const [genereList, setGenereList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getGenere() {
      setLoader(true);
      setFooter(false);
      const request = await axios.get(
        `https://api.jikan.moe/v3/genre/anime/${genere}/1`
      );
      setTimeout(function () {
        setLoader(false);
      }, 1500);
      setTimeout(function () {
        setFooter(true);
      }, 500);
      setGenereList(request.data.anime);
    }
    getGenere();
  }, [genere]);

  return (
    <div>
      {loader && <Loader />}
      <div className="cardList">
        {genereList.map((anime) => (
          <div className="genereItem" key={anime.mal_id}>
            <Card
              img={anime.image_url}
              title={anime.title}
              episodes={anime.episodes}
              rating={anime.score}
              url={anime.url}
              keyID={anime.mal_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
