import "../styles/Footer.css"
import insta from "../assets/Instagram-round.png";
import twitch from "../assets/twitch-round.png";
import xSocial from "../assets/Xsocial-round.png";
import schemPro from "../assets/scheming-profile.png";

export default function Footer() {
  return (
    <div className="footer-container">
        <div className="footer-left-side">
            <div className="border-box">
                <img src= {schemPro}
                height={50}
                alt="profile" />
                <div className="user-info">
                    <p>Jscheming</p>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/jscheming">
                        <img src={insta} alt="instagram page" />
                        </a>
                        <a href="https://www.twitch.tv/jscheming">
                        <img src={twitch} alt="instagram page" />
                        </a>
                        <a href="https://twitter.com/J_scheming">
                        <img src={xSocial} alt="instagram page" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-right-side">
            <p>Website designed by: Hassan Wilson</p>
        </div>
    </div>
  )
}
