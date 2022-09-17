import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "@mui/material/Badge";
import "./stylesheets/header.css";
import logo from "./icon.png";
import { useSelector, useDispatch } from "react-redux";
import { DEL } from "../redux/actions/action";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

function Header() {
  const [searchValue, setSearchValue] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  const navigateHome = () => {
    setSearchValue("");
    navigate("/");
  };

  const keyhandler = (e) => {
    let currentLocation = location.pathname;
    let prev = searchValue;
    let current = document.getElementsByClassName("search-input")[0].value;
    setSearchValue(current);
    if (e.key === "Enter" || e.key === "enter") {
      if (currentLocation === "/") {
        navigate({
          pathname: "/search",
          search: `?${createSearchParams({ q: `${current}` })}`,
        });
        window.scrollTo({ top: 0 });
      } else if (
        current !== prev &&
        current !== "" &&
        currentLocation !== "/"
      ) {
        navigate({
          pathname: "/search",
          search: `?${createSearchParams({ q: `${current}` })}`,
        });
        window.scrollTo({ top: 0 });
      } else if (
        current === prev &&
        current === "" &&
        currentLocation !== "/"
      ) {
      }
    }
  };

  const clickhandler = () => {
    let currentLocation = location.pathname;
    let prev = searchValue;
    let current = document.getElementsByClassName("search-input")[0].value;
    setSearchValue(current);
    if (currentLocation === "/") {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ q: `${current}` })}`,
      });
      window.scrollTo({ top: 0 });
    } else if (current !== prev && current !== "" && currentLocation !== "/") {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ q: `${current}` })}`,
      });
      window.scrollTo({ top: 0 });
    } else if (current === prev && current === "" && currentLocation !== "/") {
    }
  };

  const getdata = useSelector((state) => state.listreducer.list);
  const dispatch = useDispatch();

  const del = (mal_id) => {
    dispatch(DEL(mal_id));
  };

  return (
    <div className="header">
      <Navbar
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "rgb(24,24,25)" }}
      >
        <Container>
          <Navbar.Brand onClick={() => navigateHome()}>
            <img
              src={logo}
              style={{
                height: "45px",
                marginRight: "5px",
                cursor: "pointer",
                padding: "0px",
              }}
              alt=""
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <span
                style={{ color: "white", cursor: "pointer" }}
                onClick={navigateHome}
              >
                <i
                  class="fa-sharp fa-solid fa-house"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </span>
            </Nav>
            <Dropdown>
              <Dropdown.Toggle
                variant="default"
                id="dropdown-basic"
                style={{ padding: "0", margin: "0" }}
              >
                <Badge badgeContent={getdata.length} color="primary">
                  <i
                    className="fa-solid fa-clock text-light"
                    style={{ fontSize: "25px" }}
                  ></i>
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  width: "280px",
                  maxHeight: "310px",
                  overflowY: "scroll",
                  backgroundColor: "rgb(41, 38, 38)",
                  border: "2px solid white",
                }}
              >
                {getdata.length === 0 ? (
                  <div>
                    <img
                      style={{ height: "100%", width: "100%" }}
                      src="https://media0.giphy.com/media/ztm2TsXkrUeQ0/giphy.gif?cid=ecf05e47xpk3k65si09f0md0xf1amgkuclgaciz5eq8rph85&rid=giphy.gif&ct=s"
                      alt=""
                    ></img>
                    <h3 style={{ textAlign: "center", color: "white" }}>
                      NOTHING
                    </h3>
                    <h3 style={{ textAlign: "center", color: "white" }}>
                      HERE!!!
                    </h3>
                  </div>
                ) : (
                  <div className="watchlist">
                    {getdata.map((anime) => (
                      <div className="list" key={anime.mal_id}>
                        <img
                          className="listImg"
                          src={anime.image_url}
                          alt=""
                        ></img>
                        <div>
                          <p className="listTitle">{anime.title}</p>
                          <p
                            className="listEpisodes"
                            style={{ marginBottom: "0", color: "white" }}
                          >
                            total episodes - {anime.episodes}
                          </p>
                          <p style={{ marginBottom: "5px", color: "white" }}>
                            rating - {anime.score}
                          </p>
                        </div>
                        <div
                          onClick={() => del(anime.mal_id)}
                          className="trash"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    ))}
                    <p
                      className="END"
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        margin: "10px 0px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      END
                    </p>
                  </div>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <div className="searchContainer">
              <div className="search-box">
                <input
                  type="input"
                  className="search-input"
                  placeholder="Search.."
                  onKeyPress={keyhandler}
                />
                <button onClick={clickhandler} className="search-button">
                  <i
                    className="fas fa-search"
                    style={{ marginRight: "10px" }}
                  ></i>
                </button>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
