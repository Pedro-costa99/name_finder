import React from "react";

const SVGBackground = () => {

  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" preserveAspectRatio="none">
    <rect x="0" y="0" width="960" height="1080" fill="#FFB6C1" />
    <rect x="960" y="0" width="960" height="1080" fill="#ADD8E6" />
    <path d="M960 0 Q 720 270, 960 540 Q 1200 810, 960 1080" fill="transparent" stroke="#FFF" strokeWidth="4" />
  </svg>
  )
}


export default SVGBackground;


