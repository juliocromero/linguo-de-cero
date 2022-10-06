import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./checkOut.scss";
import bg from "../../assests/bg-checkout.jpeg";
import IconLinguo from "../../assests/icon/IconLinguo";
import IconHead from "../../assests/icon/IconHead";
import IconBook from "../../assests/icon/IconBook";
import IconMusic from "../../assests/icon/IconMusic";

export default function CheckOut({ to, check }) {
  const history = useHistory();
  const toCheck = to
  function handleCheck() {
    console.log('que onda perro')
    toCheck(true);
    window.localStorage.setItem("check", true);
    history.push("/browse");
  }
  useEffect(() => {
    let check = window.localStorage.getItem("check");

    if (JSON.parse(check)) {
      history.push("/browse");
    }
  }, []);
  return !check ? (
    <div
      style={{
        height: "auto",
        "background-color": "white",
        color: "black",
      }}
    >
      <div>
        <div
          style={{
            "background-color": "white",
            color: "black",
            position: "relative",
            width: "100%",
            height: "480px",
          }}
        >
          <img
            style={{
              "background-color": "white",
              color: "black",
              "object-fit": "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            src={bg}
          />
          <div>
            <div
              style={{
                position: "absolute",
                top: "20%",
                width: "100%",
                "text-align": "center",
              }}
            >
              <span className="icon-linguo" >
                <IconLinguo />
              </span>
             
              <h1
                style={{
                  "font-style": "normal",
                  "font-weight": "500",
                  "font-size": "50px",
                  "line-height": "63px",
                  /* or 126% */

                  "text-align": "center",

                  "letter-spacing": "0.5px",
                  color: "white",
                }}
                className="pt-2 container title-linguo"
              >
                Get{" "}
                <span
                  style={{
                    color: "#08A0F7",
                    "text-align": "center",
                  }}
                >
                  unlimited
                </span>{" "}
                access to more than 8,500 nonfiction bestsellers
              </h1>
              <p 
               style={{
                'font-style': 'normal',
                'font-weight': '500',
                'font-size': '18px',
                'line-height': '63px',
                'letter-spacing': '0.5px',
                
            'text-align': 'center',
                'color': '#FFFFFF' 
               }}
              className="container sub-title-linguo">
                Listen to the best ideas of the world in 15 minutes or less
              </p>
            </div>
          </div>
        </div>
        <div className="container pb-2">
          <div className="flex flex-column align-center justify-center">
            <div className="row pt-4">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                }}
                className="owner"
              >
                <IconHead />
                <p className="pt-2">
                  Discover new tools and learn everywhere with our playlists
                  narrated with love by 100% people. Not robots.
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                }}
                className="owner"
              >
                <IconBook />
                <p className="pt-2">
                  Help us to create a better world. We donate all audiobooks to
                  ONGs related to dyslexia and blindness
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                }}
                className="owner"
              >
                <IconMusic />
                <p className="pt-2">
                  While you Drink a Coffee or on Your Way To Work, with
                  audiobooks about Tech, Business and More
                </p>
              </div>
            </div>
            <div>
              <h2
                style={{
                  "font-style": "normal",
                  "font-weight": "500",
                  "font-size": "20px",
                  "line-height": "63px",
                  /* identical to box height, or 210% */

                  "letter-spacing": "0.5px",

                  color: "#000000",
                }}
                className="pt-3"
              >
                Choose the best plan for you
              </h2>
            </div>

            <div className="flex justify-center pb-3">
              <p
                style={{
                  "font-style": "normal",
                  "font-weight": "500",
                  "font-size": "15px",
                  "line-height": "24px",
                  /* or 120% */
                  width: "70%",
                  "letter-spacing": "0.5px",
                  "text-align": "center",
                  color: "#000000",
                }}
                className="pt-3"
              >
                What´s included in the Premium Plan With Premium, you get the
                best of Linguoo—unlimited access to 8,500+ bestselling
                nonfiction titles, download titles for offline access, and no
                ads.
              </p>
            </div>
            <div className="best-value pt-2 pl-3 pr-3">
              <p className="best-value__orange pt-3 bol">
                Best value - save 33%
              </p>
              <p>Premium Yearly</p>
              <p className="pt-2">
                USD 40 annual subscription USD 3.33/month
              </p>{" "}
              <p className="pt-2">
                Start your free 7-day trial (Cancel your trial any time before
                it ends, and you won´t be charged)
              </p>
            </div>
            <p className="pt-2 pb-2">Or</p>

            <button
              style={{
                width: "368px",
                height: "89px",
                left: "680px",
                top: "1420px",

                background: "#0060C9",
                "border-radius": "30px",
                "font-style": "normal",
                "font-weight": "500",
                "font-size": "15px",
                "line-height": "24px",
                /* or 120% */

                "letter-spacing": "0.5px",

                color: "#F6AB3B",
              }}
              onClick={() => handleCheck()}
              to="/browse"
            >
              Premium Monthly
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
