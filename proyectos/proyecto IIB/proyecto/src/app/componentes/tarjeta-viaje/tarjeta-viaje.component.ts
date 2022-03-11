import { Component, Input, OnInit } from '@angular/core';
import { CooperativasService } from 'src/app/services/http/cooperativas.service';
import { CooperativaInterface } from 'src/app/services/interfaces/cooperativa.interface';
import { ViajeInterface } from 'src/app/services/interfaces/viaje.interface';

@Component({
  selector: 'app-tarjeta-viaje',
  templateUrl: './tarjeta-viaje.component.html',
  styleUrls: ['./tarjeta-viaje.component.css']
})
export class TarjetaViajeComponent implements OnInit {
  nombre_cooperativa = ''
  constructor(
    //cooperativa service
    private readonly cooperativaService: CooperativasService,
  ) { }

  ngOnInit(): void {
    this.getCooperativa(this.viaje.cooperativa);
  }

  @Input()
  viaje!: ViajeInterface;

  getCooperativa(id: number) {
    this.cooperativaService.buscarCooperativa(id).subscribe(
      (cooperativaEncontrada: CooperativaInterface) => {
        this.nombre_cooperativa = cooperativaEncontrada.nombre_cooperativa;
      }
    );
  }


}
