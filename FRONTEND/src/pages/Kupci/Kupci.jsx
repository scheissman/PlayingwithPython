import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KupacService from "../../services/KupacService";

export default function Kupci() {
  const [kupci, setKupci] = useState([]);
  const navigate = useNavigate();

  async function dohvatiKupce() {
    await KupacService.get()
      .then((odg) => {
        setKupci(odg);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    dohvatiKupce();
  }, []);

  async function obrisiAsync(sifra) {
    const odgovor = await KupacService._delete(sifra);
    if (odgovor.greska) {
      console.log(odgovor.poruka);
      alert("Pogledaj konzolu");
      return;
    }
    dohvatiKupce();
  }

  function obrisi(sifra) {
    obrisiAsync(sifra);
  }

  return (
    <>
      <Container>
        <Link to={RoutesNames.KUPAC_NOVI}> Dodaj </Link>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Ulica</th>
              <th>Mjesto</th>
              <th>Kontakt</th>
            </tr>
          </thead>
          <tbody>
            {kupci &&
              kupci.map((kupac, index) => (
                <tr key={index}>
                  <td>{kupac.ime}</td>
                  <td>{kupac.prezime}</td>
                  <td>{kupac.ulica}</td>
                  <td>{kupac.mjesto}</td>
                  <td>{kupac.kontakt}</td>

                  <td>
                    <Button
                      onClick={() => obrisi(kupci.sifra)}
                      variant="danger"
                    >
                      Obriši
                    </Button>

                    <Button
                      onClick={() => {
                        navigate(`/kupci/${kupci.sifra}`);
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
    </>
  );
}
