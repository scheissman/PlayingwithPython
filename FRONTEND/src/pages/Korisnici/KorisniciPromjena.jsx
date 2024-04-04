import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";
import { useEffect, useState } from "react";
import backgroundImage from './woman.jpg'; // Import your background image

export default function KorisniciPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [korisnik, setKorisnik] = useState({});

    async function dohvatiKorisnik() {
        const o = await KorisnikService.getBySifra(routeParams.sifra);
        if (o.greska) {
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setKorisnik(o.poruka);
    }

    async function promjeni(korisnik) {
        const odgovor = await KorisnikService.put(routeParams.sifra, korisnik);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.KORISNIK_PREGLED);
    }

    useEffect(() => {
        dohvatiKorisnik();
    }, []);

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        const korisnik = {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email')
        };

        promjeni(korisnik);
    }

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Ensure the background covers the entire viewport height
    };

    return (
        <div style={backgroundStyle}>
            <Container>
                <Form onSubmit={obradiSubmit}>

                    <Form.Group controlId="ime">
                        <Form.Label>Ime</Form.Label>
                        <Form.Control
                            type="text"
                            name="ime"
                            defaultValue={korisnik.ime}
                            required />
                    </Form.Group>

                    <Form.Group controlId="prezime">
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control
                            type="text"
                            name="prezime"
                            defaultValue={korisnik.prezime}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control type="text" name="email" defaultValue={korisnik.email} />
                    </Form.Group>

                    <hr />
                    <Row>
                        <Col>
                            <Link className="btn btn-danger siroko" to={RoutesNames.KORISNIK_PREGLED}>
                                Odustani
                            </Link>
                        </Col>
                        <Col>
                            <Button className="siroko" variant="primary" type="submit">
                                Promjeni
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Container>
        </div>
    );
}
