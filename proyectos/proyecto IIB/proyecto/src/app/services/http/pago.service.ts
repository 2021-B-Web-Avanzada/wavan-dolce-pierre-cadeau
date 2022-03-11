import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ViajeInterface } from "../interfaces/viaje.interface";
import { HistorialCompraInterface } from '../interfaces/historial-compra.interface';
import { ViajeCreateInterface } from "../interfaces/viaje-create.interface";
import { AsientoInterface } from '../interfaces/asiento.interface';



@Injectable({
  providedIn: 'any'
})
export class PagoService {

  asientos: AsientoInterface[] = [];

  constructor(
  ) {
    this.fValidarTarjeta("4594242010298117");
  }

  fValidarTarjeta(codigo: string) {
    var msg = "Valor incorrecto";
    const VISA = /^4[0-9]{3}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/;
    const MASTERCARD = /^5[1-5][0-9]{2}-?[0-9]{4}-?[0-9]{4}-?[0-9]   {4}$/;
    const AMEX = /^3[47][0-9-]{16}$/;
    const CABAL = /^(6042|6043|6044|6045|6046|5896){4}[0-9]{12}$/;
    const NARANJA = /^(589562|402917|402918|527571|527572|0377798|0377799)[0-9]*$/;


    console.log("Res: " + this.luhn(codigo))
    console.log("Res: " + codigo.match(MASTERCARD))


    /*if (this.luhn(codigo)) {
      if (opt == "VISA" && !codigo.match(VISA)) {
        alert(msg);
      }
      if (opt == "MASTERCARD" && !codigo.match(MASTERCARD)) {
        alert(msg);
      }
      if (opt == "NARANJA" && !codigo.match(NARANJA)) {
        alert(msg);
      }
      if (opt == "CABAL" && !codigo.match(CABAL)) {
        alert(msg);
      }
      if (opt == "AMEX" && !codigo.match(AMEX)) {
        alert(msg);
      }
    } else {
      alert(msg);
    }*/
  }

  luhn(value: string) {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;
    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");
    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);
      if (bEven && (nDigit *= 2) > 9) nDigit -= 9; nCheck += nDigit; bEven = !bEven;
    }
    return (nCheck % 10) == 0;
  }
}
