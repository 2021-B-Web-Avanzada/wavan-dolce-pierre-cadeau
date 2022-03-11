import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {CooperativaInterface} from "../../services/interfaces/cooperativa.interface";
import {CooperativasService} from "../../services/http/cooperativas.service";

@Component({
  selector: 'app-ruta-lista-cooperativas',
  templateUrl: './ruta-lista-cooperativas.component.html',
  styleUrls: ['./ruta-lista-cooperativas.component.css']
})
export class RutaListaCooperativasComponent implements OnInit {

  formGroup !: FormGroup
  cooperativas:CooperativaInterface[] = [];
  @ViewChild('dt1')
  dt: Table | undefined;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cooperativaService : CooperativasService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.formGroup = new FormGroup(
      {
        buscar: new FormControl (
          {value: "", disabled:false}
        )
      }
    );
  }

  ngOnInit(): void {
    this.cooperativaService
      .mostrarCooperativas()
      .subscribe({
        next: (datos:CooperativaInterface[]) => {
          this.cooperativas=datos;
          this.leerConsulta()
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
  actualizarCooperativa(id:number){
    this.router.navigate(['/actualizarCooperativa',id])
  }
  insertarCooperativa(){
    this.router.navigate(['/registroCooperativa'])
  }
  buscar(){
    var query=this.formGroup.get('buscar')?.value
    this.dt?.filterGlobal(query,'contains')
    if(query===""){
      this.router.navigate(['/listarCooperativas'])
    }else{
      this.router.navigate(['/listarCooperativas'],{queryParams:{search:query}})
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
