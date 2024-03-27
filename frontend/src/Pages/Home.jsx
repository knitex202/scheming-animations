
import "../styles/Home.css";
import twitchLogo from "../assets/icons8-twitch-is-a-live-streaming-video-platform-a-subsidiary-of-amazon-96.png"
import designer from "../assets/graphic-designer.png";
import twitch from "../assets/twitch.png";
import discord from "../assets/discord.png";
import youtube from "../assets/youtube.png";
import fbGaming from "../assets/facebookGaming.png";
import { Link } from "react-router-dom";
import Popular from "../Popular/Popular";

function Home() {
  return (
    <div className="Home-container">
      <body>
        <header>
          <div className="upper-main-content">
            <div className="main-context-container">
              <h1>
                Upgrade Your{" "}
                <span className="gradient-text">Content Today</span>
              </h1>
              <Link to="/shop">
              <button className="browse-now-button">Browse Now</button>
              </Link>
            </div>

            <div>
              <img
                src={designer}
                height={450}
                width={450}
                alt="this is where the image goes"
              />
            </div>
          </div>
        </header>
        <main>
          <div className="banner">
            <h2>Works Anywhere</h2>
            <div className="socials-banner-content">
              <span className="twitch-logo"><img src={twitchLogo} width={25} alt="" /><img src={twitch} width={98.2} alt="twitch" /></span>
              <img src={discord} width={164.83} alt="discord" />
              <img src={youtube} width={135.37} alt="youtube" />
              <img src={fbGaming} width={242.69} alt="Facebook Gaming" />
            </div>
          </div>
          <div className="content-container">
            <Popular/>
            
          </div>
        </main>
      </body>
    </div>
  );
}

export default Home;
