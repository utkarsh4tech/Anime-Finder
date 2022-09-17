import React from "react";
import "./stylesheets/footer.css";

function Footer() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            
            <div className="col-md-6 item text">
              <h3>Anime DB</h3>
              <p>
                This site does not store any files on its server. All contents
                are provided by non-affiliated third parties.
              </p>
            </div>
            <br/>
            <div className="col item social">
              
              <span>
                <a href="https://twitter.com/utkarsh4tech">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </span>
              
              <span>
                <a href="https://github.com/utkarsh4tech">
                  <i class="fa-brands fa-github"></i>
                </a>
              </span>

              <span>
                <a href="https://www.linkedin.com/in/utkarsh4tech/">
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </span>

            </div>
          </div>
          <p className="copyright">Anime Finder by Utkarsh © 2022</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
