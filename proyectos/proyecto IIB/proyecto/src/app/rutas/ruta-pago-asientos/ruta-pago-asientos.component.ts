import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from 'src/app/services/http/pago.service';
import { ViajeService } from 'src/app/services/http/viajes.service';
import { luhnValidator } from 'src/app/validators/luhnValidator';
import { getValidationConfigFromCardNo } from 'src/app/helpers/card.helper';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HistorialCompraService } from 'src/app/services/http/historial-compras.service';
import { OrdenCompraInterface } from 'src/app/services/interfaces/orden-compra.interface';
import { AsientosCompraService } from 'src/app/services/http/asientos-compra.service';
import { AsientoCompraInterface } from 'src/app/services/interfaces/asiento-compra.interface';
import { CooperativaInterface } from 'src/app/services/interfaces/cooperativa.interface';
import { CooperativasService } from 'src/app/services/http/cooperativas.service';


@Component({
  selector: 'app-ruta-pago-asientos',
  templateUrl: './ruta-pago-asientos.component.html',
  styleUrls: ['./ruta-pago-asientos.component.css']
})
export class RutaPagoAsientosComponent implements OnInit {
  idViaje = 0;
  valorAPagar = 0;
  form: any;
  withoutMaterialForm?: FormGroup;
  formGroup?: FormGroup;
  seleccionados = this.pagoService.asientos.length;
  cardNumberGroup?: FormGroup;
  columnas = 4;
  nombre_cooperativa = "";

  constructor(
    private readonly viajeService: ViajeService,
    private readonly pagoService: PagoService,
    private readonly activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly historialCompraService: HistorialCompraService,
    private readonly asientosCompraService: AsientosCompraService,
    private readonly cooperativaService: CooperativasService,
    private readonly router: Router
  ) {
    this.getId();
  }

  ngOnInit(): void {
    this.getCooperativa(this.viaje.cooperativa);
    this.cardNumberGroup = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        luhnValidator()
      ]),
      dateCard: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        dateCardValidator(/^(0\d|1[0-2])\/\d{2}$/)
      ]),
      cvc: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])
    })


  }

  getCooperativa(id: number) {
    this.cooperativaService.buscarCooperativa(id).subscribe(
      (cooperativaEncontrada: CooperativaInterface) => {
        this.nombre_cooperativa = cooperativaEncontrada.nombre_cooperativa;
      }
    );
  }

  llenarAsientos() {
    this.longitud = Array(this.calcularFilas()).fill(0);
    console.log(this.calcularFilas());
    this.viaje.asientos = []
    this.viaje.asientos.splice(0, this.viaje.asientos.length);
    for (let i = 0; i < this.viaje.total_asientos; i++) {
      this.viaje.asientos.push(
        { "id": i + 1, "numero": i + 1, "estado": "libre" },
      )
    }

    this.pagoService.asientos.forEach(asiento => {
      this.viaje.asientos[asiento.numero - 1].estado = "seleccionado";
    });
  }

  confirmarPago() {
    if (this.cardNumberGroup?.valid) {
      const cantidad = this.pagoService.asientos.length;
      const fechaCompra = new Date();
      const fecha = fechaCompra.getFullYear() + "-" + (fechaCompra.getMonth() + 1) + "-" + fechaCompra.getDate();
      const usuarioId = this.authService.usuarioLogeado.id;
      const viajeId = this.idViaje as number;
      const codigoQR = this.generarCodigoQR(fecha, cantidad);

      let dato = {
        "cantidad_boletos": cantidad,
        "fecha_compra": fecha,
        "usuario": usuarioId,
        "viaje": viajeId,
        "codigo_qr": codigoQR
      } as OrdenCompraInterface

      this.historialCompraService.crearHistorialCompra(dato).subscribe(
        (data) => {
          console.log(data);
          const id = data.id;
          this.pagoService.asientos.forEach(asiento => {
            let asientoCompra = {
              "asiento": asiento.numero,
              "orden_compra": id
            } as AsientoCompraInterface
            this.asientosCompraService.insertarAsientoCompra(asientoCompra).subscribe(
              (data) => {
                console.log(data);
                this.router.navigate(['/historial-compras']);
              }
            );
          });
        }
      )
      console.log(dato);
    }
  }

  generarCodigoQR(fecha: string, cantidad: number) {
    const as = this.pagoService.asientos.map(asiento => asiento.numero).join(',');
    return `${this.authService.usuarioLogeado.cedula} ${this.authService.usuarioLogeado.nombre} ${this.authService.usuarioLogeado.apellido} ${this.viaje.ciudad_origen}-${this.viaje.ciudad_destino} ${fecha} ${cantidad}[${as}]`;
  }

  calcularFilas() {
    return Math.ceil(this.viaje.total_asientos / this.columnas);
  }

  longitud = Array(10).fill(0);

  viaje = {
    "id": "1",
    "ciudad_origen": "Quito",
    "ciudad_destino": "Riobamba",
    "fecha": "2020-06-01",
    "hora": "10:30:00",
    "precio": 100,
    "total_asientos": 36,
    "cooperativa": 1,
    "asientos": [
      { "id": 1, "numero": 1, "estado": "libre" },
      { "id": 2, "numero": 1, "estado": "libre" },
      { "id": 3, "numero": 1, "estado": "libre" },
      { "id": 4, "numero": 1, "estado": "libre" },
      { "id": 5, "numero": 1, "estado": "libre" },
      { "id": 6, "numero": 1, "estado": "libre" },
      { "id": 7, "numero": 1, "estado": "ocupado" },
      { "id": 8, "numero": 1, "estado": "libre" },
      { "id": 9, "numero": 1, "estado": "libre" },
      { "id": 10, "numero": 1, "estado": "libre" },
      { "id": 11, "numero": 1, "estado": "libre" },
      { "id": 12, "numero": 1, "estado": "libre" },
      { "id": 13, "numero": 1, "estado": "libre" },
      { "id": 14, "numero": 1, "estado": "libre" },
      { "id": 15, "numero": 1, "estado": "libre" },
      { "id": 16, "numero": 1, "estado": "libre" },
      { "id": 17, "numero": 1, "estado": "ocupado" },
      { "id": 18, "numero": 1, "estado": "libre" },
      { "id": 19, "numero": 1, "estado": "libre" },
      { "id": 20, "numero": 1, "estado": "libre" },
    ]
  }


  getId() {
    const parametrosConsulta$ = this.activatedRoute.params;
    parametrosConsulta$.subscribe(
      (queryParams) => {
        this.idViaje = queryParams['idViaje'];
        this.getViaje();
      }
    );
  }

  getViaje() {
    this.viajeService.buscarViaje(this.idViaje).subscribe(
      (viaje: any) => {
        this.viaje = viaje;
        this.calcularValorApagar();
        console.log(this.viaje);
        this.llenarAsientos()
      }
    );
  }

  calcularValorApagar() {
    this.valorAPagar = this.pagoService.asientos.length * this.viaje.precio;
  }

  getCardNumberControl() {
    return this.cardNumberGroup && this.cardNumberGroup.get('cardNumber');
  }

  cardMaskFunction(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }

}

export function dateCardValidator(dateRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = dateRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
