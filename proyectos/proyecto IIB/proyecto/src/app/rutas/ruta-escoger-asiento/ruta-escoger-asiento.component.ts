import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CooperativasService } from 'src/app/services/http/cooperativas.service';
import { PagoService } from 'src/app/services/http/pago.service';
import { ViajeService } from 'src/app/services/http/viajes.service';
import { CooperativaInterface } from 'src/app/services/interfaces/cooperativa.interface';

@Component({
  selector: 'app-ruta-escoger-asiento',
  templateUrl: './ruta-escoger-asiento.component.html',
  styleUrls: ['./ruta-escoger-asiento.component.css']
})
export class RutaEscogerAsientoComponent implements OnInit {
  idViaje = 0;
  nombre_cooperativa = ''

  //viaje!: ViajeInterface

  constructor(
    private readonly viajeService: ViajeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly pagoService: PagoService,
    private readonly cooperativaService: CooperativasService,
  ) {
    this.getId();

  }

  getCooperativa(id: number) {
    this.cooperativaService.buscarCooperativa(id).subscribe(
      (cooperativaEncontrada: CooperativaInterface) => {
        this.nombre_cooperativa = cooperativaEncontrada.nombre_cooperativa;
      }
    );
  }

  getId() {
    const parametrosConsulta$ = this.activatedRoute.params;
    parametrosConsulta$.subscribe(
      (params) => {
        this.idViaje = params['idViaje'];
        this.getViaje();
      }
    );
  }

  getViaje() {
    this.viajeService.buscarViaje(this.idViaje).subscribe(
      (viaje: any) => {
        this.viaje = viaje;
        this.llenarAsientos();
      }
    );
  }

  llenarAsientos() {
    console.log(this.viaje.id);
    this.viajeService.obtenerAsientosViaje(this.viaje.id).subscribe(
      (asientos: any) => {
        this.longitud = Array(this.calcularFilas()).fill(0);
        
        this.viaje.asientos = []
        this.viaje.asientos.splice(0, this.viaje.asientos.length);
        for (let i = 0; i < this.viaje.total_asientos; i++) {
          this.viaje.asientos.push(
            { "id": i + 1, "numero": i + 1, "estado": "libre" },
          )
        }
        
        console.log(asientos);
        asientos.forEach((asiento: { asiento: number; }) => {
          this.viaje.asientos[asiento.asiento - 1].estado = "ocupado";
        });
      }
    )



  }

  seleccionados = 0;

  ngOnInit(): void {
    this.getCooperativa(this.viaje.cooperativa);
  }
  columnas = 4;

  calcularFilas() {
    return Math.ceil(this.viaje.total_asientos / this.columnas);
  }

  longitud = Array(10).fill(0);

  viaje = {
    "id": 1,
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


  contarSeleccionados() {
    this.seleccionados = this.viaje.asientos.filter(asiento => asiento.estado === 'seleccionado').length
  }


}
