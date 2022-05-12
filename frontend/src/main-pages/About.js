import React from 'react';
import DropLogo from '../drop-logo.png'
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="main-page-body">
      <p className="about-title">A little bit about us</p>
      <p className="about-middle-text">
        We think that increasing access to free clean water is extremely important and a right everyone should have.
        We have created this website to improve access to free clean water, starting with our community at Brown University.
      </p>
      <div className="about-diagrams">
        <div className="about-diagram-left">
          <img className="about-drop-logo" src={DropLogo} alt="drop-logo"></img>
          <p className="about-sub-title">Mission</p>
          <p className="about-diagram-text">
            Provide access to clean water to those in the Brown University community and those outside in a near future.
          </p>
        </div>
        <div className="about-diagram-right">
          <div className="about-diagram">
            <img className="about-drop-logo" src={DropLogo} alt="drop-logo"></img>
            <p className="about-sub-title">Vision</p>
            <p className="about-diagram-text">
              A world where everyone has access to clean drinkable water.
            </p>
          </div>
        </div>
      </div>
      <p className="about-title">Who are we?</p>
      <p className="about-middle-text">
        This website was built as the final project for Brown University's Intro to Software Engineering (CSCI 0320) course.
        We are a group of Brown undergraduates passionate about providing other students and the general public with access
        to water. If you have any comments or questions, feel free to <span style={{ color: "#5393C6", fontWeight: "bold", cursor: "pointer" }} onClick={() => { navigate('/contact') }}>contact us</span>!
      </p>
    </div>
  );
}

export default About;