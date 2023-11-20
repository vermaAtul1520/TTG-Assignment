import React from "react";
import "./About.css";
import DP from "./OwnDP.png";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";

const About = () => {
  return (
    <div className="aboutMain">
      <div className="child">
        <div className="childleft">
          <img src={DP} width="320px" alt="Profile" />
        </div>
        <div className="childright">
          <div className="content">
            <h1>Atul Verma</h1>
            <h3>Fullstack Developer and Sport Programmer</h3>
            <p>
            I am a software developer with 6 months of experience in MERN (MongoDB, Express.js, React.js, Node.js) and React Native development. Currently seeking new opportunities to contribute my skills and passion for creating innovative solutions. I thrive on developing new things and am excited about the prospect of taking on new challenges in the tech industry
            </p>
            <div className="socialAbout">
              <a href="https://github.com/vermaAtul1520" target="_blank" rel="noreferrer">
                <FaGithubSquare /> Github
              </a>
              <a href="https://www.linkedin.com/in/atul-kumar-verma-1514121a3/" target="_blank" rel="noreferrer">
                <BsLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
