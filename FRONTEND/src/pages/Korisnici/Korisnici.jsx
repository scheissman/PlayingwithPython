import { useEffect, useState } from "react";
import KorisnikService from "../../services/KorisnikService";
import Container from "react-bootstrap/Container";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import backgroundImage from "./woman.jpg";

export default function Korisnici() {
  const [korisnici, setKorisnici] = useState();
  const navigate = useNavigate();

  async function dohvatiKorisnike() {
    await KorisnikService.get()
      .then((odg) => {
        setKorisnici(odg);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    dohvatiKorisnike();
  }, []);

  async function obrisiAsync(sifra) {
    const odgovor = await KorisnikService._delete(sifra);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    dohvatiKorisnike();
  }

  function obrisi(sifra) {
    obrisiAsync(sifra);
  }

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  return (
    <>
      <div style={backgroundStyle}>
        <Container>
          <Link to={RoutesNames.KORISNIK_NOVI}> Dodaj </Link>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {korisnici &&
                korisnici.map((korisnik, index) => (
                  <tr key={index}>
                    <td>{korisnik.ime}</td>
                    <td>{korisnik.prezime}</td>
                    <td>{korisnik.email}</td>
                    <td>
                      <Button
                        onClick={() => obrisi(korisnik.sifra)}
                        variant="danger"
                      >
                        Obriši
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/korisnici/${korisnik.sifra}`);
                        }}
                      >
                        Promjeni
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}
