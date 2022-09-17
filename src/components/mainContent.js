import React, { useState } from "react";
import "./stylesheets/mainContent.css";
import CardList from "./cardList";
import Slide from "./slide";

function MainContent({ setFooter }) {
  const [genere, setGenere] = useState("1");
  const [active, setActive] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleClick = (i, index) => {
    setGenere(i);
    let temp = [];
    active.forEach((item, count) => {
      if (count === index) temp.push(true);
      else temp.push(false);
    });

    setActive(temp);
  };

  return (
    <div className="mainContent">
      <Slide />
      <div className="genereContainer">
        <div className="genereMenu">
          <span
            onClick={() => handleClick("1", 0)}
            className={`${active[0] ? "tabActive" : "genereTabs"}`}
          >
            Action
          </span>
          <span
            onClick={() => handleClick("4", 1)}
            className={`${active[1] ? "tabActive" : "genereTabs"}`}
          >
            Comedy
          </span>
          <span
            onClick={() => handleClick("10", 2)}
            className={`${active[2] ? "tabActive" : "genereTabs"}`}
          >
            Fantasy
          </span>
          <span
            onClick={() => handleClick("27", 3)}
            className={`${active[3] ? "tabActive" : "genereTabs"}`}
          >
            Shounen
          </span>
          <span
            onClick={() => handleClick("30", 4)}
            className={`${active[4] ? "tabActive" : "genereTabs"}`}
          >
            Sports
          </span>
          <span
            onClick={() => handleClick("36", 5)}
            className={`${active[5] ? "tabActive" : "genereTabs SOL"}`}
          >
            Slice of Life
          </span>
        </div>
      </div>
      <CardList genere={genere} setFooter={setFooter} />
    </div>
  );
}

export default MainContent;
