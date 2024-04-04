import React from "react";
import Container from "react-bootstrap/Container";
import backgroundImage from "/woman.jpg"; 
export default function Pocetna() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <h1 style={{ color: "white" }}>Dobrodošli u Teretanu</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2  style={{ color: "white" }}>Radno vrijeme je 0 - 24 </h2>
      </Container>
    </div>
  );
}
