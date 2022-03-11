import { Component, Input, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { HistorialCompraInterface } from 'src/app/services/interfaces/historial-compra.interface';
import { OrdenCompraInterface } from 'src/app/services/interfaces/orden-compra.interface';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.css']
})
export class CodigoQrComponent implements OnInit {

  constructor() { }
  @Input()
  data: OrdenCompraInterface = {
    id: 1,
    cantidad_boletos: 1,
    fecha_compra: '2020-01-01',
    usuario: 1,
    viaje: 1,
    codigo_qr: '123456789'
  };

  ngOnInit(): void {
  }
  title = 'app';
  elementType = NgxQrcodeElementTypes.URL;
  value = this.data.codigo_qr;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
}
