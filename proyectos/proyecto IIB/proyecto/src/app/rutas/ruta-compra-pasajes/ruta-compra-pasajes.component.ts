import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioInterface } from 'src/app/services/interfaces/usuario.interface';
import { ViajeService } from 'src/app/services/http/viajes.service';
import { ViajeInterface } from 'src/app/services/interfaces/viaje.interface';

@Component({
  selector: 'app-ruta-compra-pasajes',
  templateUrl: './ruta-compra-pasajes.component.html',
  styleUrls: ['./ruta-compra-pasajes.component.css']
})
export class RutaCompraPasajesComponent implements OnInit {

  usuario!: UsuarioInterface;
  ciudadOrigen = '';
  ciudadDestino = '';
  fechaViaje = '';
  viajes = []

  constructor(
    private readonly _authService: AuthService,
    private readonly viajeService: ViajeService,
  ) { 
  }

  ngOnInit(): void {
    this.viajeService.mostrarViajesVigentes().subscribe(
      (viajes: any) => {
        this.viajes = viajes;
      }
    );
  }

  onChangeOrigen(newValue: any) {
    this.viajeService.mostrarViajesVigentes().subscribe(
      (viajes: any) => {
        this.viajes = viajes;
        this.viajes = this.buscarViajesPorOrigen(this.ciudadOrigen, this.ciudadDestino, this.fechaViaje)
      }
    );
  }

  onChangeDestino(newValue: any) {
    this.viajeService.mostrarViajesVigentes().subscribe(
      (viajes: any) => {
        this.viajes = viajes;
        this.viajes = this.buscarViajesPorDestino(this.ciudadOrigen, this.ciudadDestino, this.fechaViaje)
      }
    );
  }

  onChangeFecha(newValue: any) {
    this.viajeService.mostrarViajesVigentes().subscribe(
      (viajes: any) => {
        this.viajes = viajes;
        this.viajes = this.buscarViajesPorFecha(this.ciudadOrigen, this.ciudadDestino, this.fechaViaje)
      }
    );
  }

  buscarViajesPorOrigen(ciudadOrigen: string, ciudadDestino: string, fechaViaje: string) {
    console.log(ciudadOrigen + "-" + ciudadDestino + "-" + fechaViaje);
    if (ciudadOrigen !== '' && ciudadDestino !== '' && fechaViaje !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
          && viaje.ciudad_destino.toLowerCase().includes(ciudadDestino.toLowerCase())
          && viaje.fecha === fechaViaje;
      });
    }
    else if (ciudadOrigen !== '' && ciudadDestino !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
          && viaje.ciudad_destino.toLowerCase().includes(ciudadDestino.toLowerCase())
      });
    } else if (fechaViaje !== '' && ciudadOrigen !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
          && viaje.fecha.toLowerCase().includes(fechaViaje.toLowerCase())
      });
    }
    else if (ciudadOrigen !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
      });
    }
    return this.viajes
  }

  buscarViajesPorDestino(ciudadOrigen: string, ciudadDestino: string, fechaViaje: string) {
    console.log(ciudadOrigen + "-" + ciudadDestino + "-" + fechaViaje);
    if (ciudadOrigen !== '' && ciudadDestino !== '' && fechaViaje !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
          && viaje.ciudad_destino.toLowerCase().includes(ciudadDestino.toLowerCase())
          && viaje.fecha === fechaViaje;
      });
    }
    else if (ciudadOrigen !== '' && ciudadDestino !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
          && viaje.ciudad_destino.toLowerCase().includes(ciudadDestino.toLowerCase())
      });
    }
    else if (ciudadDestino !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_destino.toLowerCase().includes(ciudadDestino.toLowerCase())
      });
    }
    return []
  }

  buscarViajesPorFecha(ciudadOrigen: string, ciudadDestino: string, fechaViaje: string) {
    console.log(ciudadOrigen + "-" + ciudadDestino + "-" + fechaViaje);
    if (ciudadOrigen !== '' && ciudadDestino !== '' && fechaViaje !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
          && viaje.ciudad_destino.toLowerCase().includes(ciudadDestino.toLowerCase())
          && viaje.fecha === fechaViaje;
      });
    }
    else if (fechaViaje !== '' && ciudadDestino !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.fecha.toLowerCase().includes(fechaViaje.toLowerCase())
          && viaje.ciudad_destino.toLowerCase().includes(ciudadDestino.toLowerCase())
      });
    } else if (fechaViaje !== '' && ciudadOrigen !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.ciudad_origen.toLowerCase().includes(ciudadOrigen.toLowerCase())
          && viaje.fecha.toLowerCase().includes(fechaViaje.toLowerCase())
      });
    }
    else if (fechaViaje !== '') {
      return this.viajes.filter(function (viaje: ViajeInterface) {
        return viaje.fecha.toLowerCase().includes(fechaViaje.toLowerCase())
      });
    }
    return []
  }

  
}
