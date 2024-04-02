import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KupacService from "../../services/KupacService";

export default function KupciDodaj() {
  const navigate = useNavigate();

  async function dodaj(kupac) {
    const odgovor = await KupacService.post(kupac);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    navigate(RoutesNames.KUPAC_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    const kupac = {
      ime: podaci.get("ime"),
      prezime: podaci.get("prezime"),
      ulica: podaci.get("ulica"),
      mjesto: podaci.get("mjesto"),
      kontakt: podaci.get("kontakt"),
    };

    dodaj(kupac);
  }

  return (
    <Container>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control type="text" name="ime" required />
        </Form.Group>

        <Form.Group controlId="prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control type="number" name="prezime" />
        </Form.Group>

        <Form.Group controlId="ulica">
          <Form.Label>Ulica</Form.Label>
          <Form.Control type="text" name="ulica" />
        </Form.Group>

        <Form.Group controlId="mjesto">
          <Form.Label>Mjesto</Form.Label>
          <Form.Control type="text" name="mjesto" />
        </Form.Group>

        <Form.Group controlId="kontakt">
          <Form.Label>Kontakt</Form.Label>
          <Form.Control type="text" name="kontakt" />
        </Form.Group>

        <hr />
        <Row>
          <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
            <Link
              className="btn btn-danger siroko"
              to={RoutesNames.KUPAC_PREGLED}
            >
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
            <Button className="siroko" variant="primary" type="submit">
              Dodaj
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
