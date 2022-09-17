import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylesheets/slide.css";

function Slide() {
  const [slide, setSlide] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const getSlide = async () => {
      let response = await axios.get(
        "https://api.jikan.moe/v3/search/anime?status=airing&order_by=score&sort=desc"
      );
      let temp = response.data.results.slice(0, 10);
      setSlide(temp);
      setIndex(0);
    };
    getSlide();
  }, []);

  const switchSlide = (direction) => {
    if (direction === "left") {
      if (index === 0) {
        setIndex(9);
      } else {
        setIndex(index - 1);
      }
    }

    if (direction === "right") {
      if (index === 9) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  };

  return (
    <div className="slide">
      {index !== -1 && (
        <div
          className="slideBackdrop"
          style={{
            backgroundImage: `url(${slide[index].image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="slideContainer" key={slide[index].mal_id}>
            <a
              href={`https://animixplay.to/anime/${slide[index].mal_id}/${slide[index].title}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="slideImg">
                <img
                  src={slide[index].image_url}
                  alt={slide[index].title}
                ></img>
              </div>
            </a>
            <div className="slideInfo">
              <a
                href={`https://animixplay.to/anime/${slide[index].mal_id}/${slide[index].title}`}
                target="_blank"
                rel="noreferrer"
              >
                <p className="slideTitle">{slide[index].title}</p>
              </a>
              <div className="slideRating">
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <p className="slideScore">{slide[index].score}</p>
              </div>
              <p className="slideSynopsis">{slide[index].synopsis}</p>
              <div>
                <div className="slideButtons">
                  <i
                    onClick={() => switchSlide("left")}
                    className="fa-solid fa-chevron-left"
                  ></i>
                  <i
                    onClick={() => switchSlide("right")}
                    className="fa-solid fa-chevron-right"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slide;
