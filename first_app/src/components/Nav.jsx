import React from 'react';
import '../components/app/App.css';

function Nav() {
  function openDropMenu() {
    if (window.innerWidth <= 768 && window.innerWidth >= 320) {
      document.getElementById("dr").style.display = "unset";
      document.getElementById("venue").style.height = "316px";
    }
  }
  function closeDropMenu() {
    if (window.innerWidth <= 768 && window.innerWidth >= 320) {
      document.getElementById("dr").style.display = "none";
      document.getElementById("venue").style.height = "60px";
    }
  }
  function dropMenu() {
    if (window.innerWidth <= 768 && window.innerWidth >= 320) {
      if (document.getElementById("dr").style.display === "unset") {
        closeDropMenu();
      }
      else {
        openDropMenu();
      }
    }
  }

  function openMenu() {
    if (window.innerWidth <= 768 && window.innerWidth >= 320) {
      document.getElementById("hamburgerLine1").style.transform = "translateY(17.5px) rotate(135deg)";
      document.getElementById("hamburgerLine2").style.transform = "scale(0)";
      document.getElementById("hamburgerLine3").style.transform = "translateY(-17.5px) rotate(-135deg)";
      document.getElementById("navigate").style.left = "0";
    }
  }
  function closeMenu() {
    if (window.innerWidth <= 768 && window.innerWidth >= 320) {
      document.getElementById("hamburgerLine1").style.transform = "none";
      document.getElementById("hamburgerLine2").style.transform = "none";
      document.getElementById("hamburgerLine3").style.transform = "none";
      document.getElementById("navigate").style.left = "-100%";
      document.getElementById("boxClick").checked = false;
    }
  }
  function hamburgerMenu() {
    if (document.getElementById("boxClick").checked) {
      closeMenu();
      document.getElementById("boxClick").checked = true;
    } else {
      openMenu();
    }
  }


  return (
    <header className="header" id="header">
      <nav className="navigation" id="navigate">
        <input type="checkbox" id="boxClick" onClick={closeDropMenu} />
        <label id="hamburgerIcon" for="boxClick" onClick={hamburgerMenu}>
          <div id="hamburgerLine1" className="hamburger-line1-after"></div>
          <div id="hamburgerLine2" className="hamburger-line2-after"></div>
          <div id="hamburgerLine3" className="hamburger-line3-after"></div>
        </label>
        <div>
          <div className="btn">
            <a href="#home">Home</a>
          </div>
          <div id="venue">
            <a href="#" onClick={dropMenu}>Entertainment Venue</a>
            <div className="drop-menu" id="dr">
              <ul className="main">
                <li className="btn"><a href="#cinema">Cinema </a></li>
                <li className="btn"><a href="#cafe">Cafe</a></li>
                <li className="btn"><a href="#restaurant">Restaurant</a></li>
                <li className="btn"><a href="#club">Club</a></li>
                <li className="btn"><a href="#pub">Pub</a></li>
                <li className="btn"><a href="#party">Party</a></li>
                <li className="btn"><a href="#opera">Opera</a></li>
                <li className="btn"><a href="#theatre">Theatre</a></li>
              </ul>
            </div>
          </div>
          <div className="btn">
            <a href="#about">About Us</a>
          </div>
          <div className="btn">
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
