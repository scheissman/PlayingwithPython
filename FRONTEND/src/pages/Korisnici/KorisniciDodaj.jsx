import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";
import backgroundImage from './woman.jpg'; 

export default function KorisniciDodaj() {
  const navigate = useNavigate();

  async function dodaj(korisnik) {
    const odgovor = await KorisnikService.post(korisnik);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    navigate(RoutesNames.KORISNIK_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    const korisnik = {
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      email: podaci.get("email"),
    };

    dodaj(korisnik);
  }

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', 
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="ime">
            <Form.Label className="white-text">Ime</Form.Label>
            <Form.Control type="text" name="ime" required />
          </Form.Group>

          <Form.Group controlId="prezime">
            <Form.Label className="white-text">Prezime</Form.Label>
            <Form.Control type="text" name="prezime" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className="white-text">Email</Form.Label>
            <Form.Control type="text" name="email" />
          </Form.Group>

          <hr />
          <Row>
            <Col>
              <Link
                className="btn btn-danger siroko"
                to={RoutesNames.KORISNIK_PREGLED}
              >
                Odustani
              </Link>
            </Col>
            <Col>
              <Button className="siroko" variant="primary" type="submit">
                Dodaj
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
