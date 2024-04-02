import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useEffect, useState } from "react";
import KupacService from "../../services/KupacService";


export default function KupciPromjena(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [kupac, setKupac] = useState({});

   async function dohvatiKupac(){
        const o = await KupacService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setKupac(o.poruka);
   }

   async function promjeni(kupac){
    const odgovor = await KupacService.put(routeParams.sifra,kupac);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.KUPAC_PREGLED);
}

   useEffect(()=>{
    dohvatiKupac();
   },[]);

    function obradiSubmit(e){ 
        e.preventDefault();

        const podaci = new FormData(e.target);

        const kupac = {
            naziv: podaci.get('ime'), 
            prezime: podaci.get('prezime'), 
            ulica: podaci.get('ulica'), 
            mjesto: podaci.get('mjesto'), 
            kontakt: podaci.get('kontakt'), 
                  
        };
        promjeni(kupac);

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
                    <Form.Control type="text" name="prezime" />
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
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KUPAC_PREGLED}>
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

    );
}