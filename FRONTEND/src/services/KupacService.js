import { HttpService } from "./HttpService";

const naziv = "/Kupac";

async function get() {
  return await HttpService.get(naziv)
    .then((odgovor) => {
      //console.table(odgovor.data);
      return odgovor.data;
    })
    .catch((e) => {
      //console.log(e);
      return e;
    });
}

async function post(kupac) {
  return await HttpService.post(naziv, kupac)
    .then((odgovor) => {
      //console.table(odgovor.data);
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      //console.log(e);
      return { greska: true, poruka: e };
    });
}

async function put(sifra, kupac) {
  return await HttpService.put(naziv + "/" + sifra, kupac)
    .then((odgovor) => {
      //console.table(odgovor.data);
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      //console.log(e);
      return { greska: true, poruka: e };
    });
}

async function _delete(sifra) {
  return await HttpService.delete(naziv + "/" + sifra)
    .then((odgovor) => {
      //console.table(odgovor.data);
      return { greska: false, poruka: odgovor.data.poruka };
    })
    .catch((e) => {
      //console.log(e);
      return { greska: true, poruka: e };
    });
}

async function getBySifra(sifra) {
  return await HttpService.get(naziv + "/" + sifra)
    .then((o) => {
      return { greska: false, poruka: o.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

export default {
  get,
  post,
  _delete,
  getBySifra,
  put,
};
