import React from "react";
import "./stylesheets/card.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";

function Card({ img, title, rating, episodes, url, keyID }) {
  const obj = {
    image_url: `${img}`,
    title: `${title}`,
    mal_id: `${keyID}`,
    episodes: `${episodes}`,
    score: `${rating}`,
  };

  const dispatch = useDispatch();
  const add = () => {
    dispatch(ADD(obj));
  };

  return (
    <div className="card">
      <a
        href={`https://animixplay.to/anime/${keyID}/${title}`}
        target="_blank"
        rel="noreferrer"
      >
        <img src={img} alt=""></img>
      </a>
      <a
        href={`https://animixplay.to/anime/${keyID}/${title}`}
        target="_blank"
        rel="noreferrer"
      >
        <p className="cardTitle">
          {title.length > 35 ? `${title.slice(0, 35)}...` : title}
        </p>
      </a>
      <p className="cardEp">Episodes-{episodes}</p>
      <div onClick={add} className="add" style={{ fontSize: "20px" }}>
        <i className="fa-solid fa-plus"></i>
      </div>
      <div className="cardRating">
        <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
        <p className="rating">{rating}</p>
      </div>
    </div>
  );
}

export default Card;
