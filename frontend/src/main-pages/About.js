import React from 'react';
import DropLogo from '../drop-logo.png'

function About() {
  return (
    <div className="main-page-body">
      <p className="about-title">A little bit about us</p>
      <p className="about-middle-text">say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here </p>
      <div className="about-diagrams">
        <div className="about-diagram">
          <img className="about-drop-logo" src={DropLogo}></img>
          <p className="about-diagram-text">say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here </p>
        </div>
        <div className="about-diagram">
          <div className="about-diagram">
            <img className="about-drop-logo" src={DropLogo}></img>
            <p className="about-diagram-text">say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here say cool shit here </p>
          </div>
        </div>
      </div>
      <p className="about-title">Who are we?</p>
      <p className="about-middle-text">tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are tell them who we are </p>
    </div>
  );
}

export default About;