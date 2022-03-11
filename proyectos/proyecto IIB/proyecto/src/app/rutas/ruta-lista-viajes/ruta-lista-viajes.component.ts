import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCodigoQrComponent } from 'src/app/componentes/modal-codigo-qr/modal-codigo-qr.component';
import { HistorialCompraService } from 'src/app/services/http/historial-compras.service';
import { HistorialCompraInterface } from 'src/app/services/interfaces/historial-compra.interface';
import {ViajeInterface} from "../../services/interfaces/viaje.interface";
import {ViajeService} from "../../services/http/viajes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Table} from "primeng/table";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CooperativasService} from "../../services/http/cooperativas.service";
import {CooperativaInterface} from "../../services/interfaces/cooperativa.interface";

@Component({
  selector: 'app-ruta-lista-viajes',
  templateUrl: './ruta-lista-viajes.component.html',
  styleUrls: ['./ruta-lista-viajes.component.css']
})
export class RutaListaViajesComponent implements OnInit {
  formGroup !: FormGroup
  viajes:ViajeInterface[] = [];
  cooperativas:CooperativaInterface[] = [];
  @ViewChild('dt1')
  dt: Table | undefined;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly viajeService : ViajeService,
    private readonly cooperativaService : CooperativasService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {this.formGroup = new FormGroup(
    {
      buscar: new FormControl (
        {
          value: "",
          disabled:false
        }
      )
    }
  ); }



  ngOnInit(): void {
    this.viajeService
      .mostrarViajes()
      .subscribe({
        next: (datos:ViajeInterface[]) => {
          this.viajes=datos;
          this.cooperativaService
            .mostrarCooperativas()
            .subscribe({
              next: (datos:CooperativaInterface[]) => {
                this.cooperativas=datos
                this.leerConsulta()
              },
              error: (error) => {
                console.error({error});
              }
            })
        },
        error: (error) => {
          console.error({error});
        }
      })
  }

  leerConsulta(){
    this.activatedRoute.queryParams.subscribe(
      {
        next:(queryParams)=>{
          this.formGroup.get('buscar')?.setValue(queryParams['search'])
          setTimeout(()=>{
            return this.dt?.filterGlobal(queryParams['search'],'contains')
          },100)
        }
      }
    )
  }
  //
  // mostrarDetalle(id:number){
  //   this.router.navigate(['/generos',id])
  // }

  getCooperativa(id:number){
    return this.cooperativas.filter(cooperativa => cooperativa.id===id)[0].nombre_cooperativa
  }
  actualizarViaje(id:number){
    this.router.navigate(['/actualizarViaje',id])
  }
  insertarViaje(){
    this.router.navigate(['/registrarViaje'])
  }
  buscar(){
    var query=this.formGroup.get('buscar')?.value
    this.dt?.filterGlobal(query,'contains')
    if(query===""){
      this.router.navigate(['/listarViajes'])
    }else{
      this.router.navigate(['/listarViajes'],{queryParams:{search:query}})
    }

  }
  // eliminarGenero(id:number){
  //   this.generoService.eliminarGenero(id).subscribe({
  //       next:()=>{
  //         this.ngOnInit()
  //       }
  //     }
  //   )
  // }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
}
