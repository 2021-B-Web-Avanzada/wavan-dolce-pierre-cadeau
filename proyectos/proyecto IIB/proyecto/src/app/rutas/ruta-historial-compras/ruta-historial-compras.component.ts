import { Component, OnInit } from '@angular/core';
import { HistorialCompraService } from 'src/app/services/http/historial-compras.service';
import { HistorialCompraInterface } from 'src/app/services/interfaces/historial-compra.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalCodigoQrComponent } from 'src/app/componentes/modal-codigo-qr/modal-codigo-qr.component';
import { OrdenCompraInterface } from 'src/app/services/interfaces/orden-compra.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ViajeService } from 'src/app/services/http/viajes.service';
import { ViajeInterface } from 'src/app/services/interfaces/viaje.interface';

@Component({
  selector: 'app-ruta-historial-compras',
  templateUrl: './ruta-historial-compras.component.html',
  styleUrls: ['./ruta-historial-compras.component.css']
})
export class RutaHistorialComprasComponent implements OnInit {

  historial: OrdenCompraInterface[] = [];
  cols: any[] = [];
  loading: boolean = true;

  viajes: ViajeInterface[] = [];


  constructor(
    private historialService: HistorialCompraService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly viajeService: ViajeService
  ) {


  }

  ngOnInit() {

    this.viajeService.mostrarViajes().subscribe(
      (viajes: any) => {
        this.viajes = viajes;
      }
    );

    const historialData$ = this.historialService.mostrarOrdenesCompra(this.authService.usuarioLogeado.id);
    historialData$.subscribe(
      (data: OrdenCompraInterface[]) => {
        this.historial = data
        this.loading = false;
        console.log(this.groupBy(this.historial, 'viaje'));
      }
    );

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'cantidad_boletos', header: 'Cantidad Boletos' },
      { field: 'fecha_compra', header: 'Fecha' },
    ];
  }

  abrirModal(a: HistorialCompraInterface) {
    const referenciaDialogo = this.dialog.open(
      ModalCodigoQrComponent,
      {
        data: a
      });

    const despuesCerrado$ = referenciaDialogo.afterClosed();
    despuesCerrado$.subscribe(
      (data) => {
        console.log({ data });
      }
    );
  }
  groupBy(xs: any[], key: string) {
    return xs.reduce(function (rv, x) {
      console.log(x);
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  obtnerNombreViaje(id: number) {
    const v = this.viajes.find(x => x.id === id);
    return v?.ciudad_origen + ' - ' + v?.ciudad_destino;
  }
}
