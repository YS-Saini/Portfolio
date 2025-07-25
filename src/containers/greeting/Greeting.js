import React, {useContext} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import {greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import SocialMedia from "../../components/socialMedia/SocialMedia";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <section className="landing-bg-section">
      <div className="landing-bg-overlay left-align">
        <h1 className={isDark ? "dark-mode greeting-text" : "greeting-text"}>
          {greeting.title} <span className="wave-emoji">{emoji("👋")}</span>
        </h1>
        <p className={isDark ? "dark-mode greeting-text-p" : "greeting-text-p subTitle"}>
          {greeting.subTitle}
        </p>
        <SocialMedia />
      </div>
    </section>
  );
}
