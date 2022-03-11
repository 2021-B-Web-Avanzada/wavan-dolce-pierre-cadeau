import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { CooperativasService } from 'src/app/services/http/cooperativas.service';
import {CooperativaInterface} from "../../services/interfaces/cooperativa.interface";
import {ViajeInterface} from "../../services/interfaces/viaje.interface";

@Component({
  selector: 'app-ruta-actualizar-cooperativa',
  templateUrl: './ruta-actualizar-cooperativa.component.html',
  styleUrls: ['./ruta-actualizar-cooperativa.component.css']
})
export class RutaActualizarCooperativaComponent implements OnInit {

  formActualizarCooperativa!: FormGroup
  cooperativa:CooperativaInterface={
    id:0,nombre_cooperativa:"",telefono:"",ciudad_matriz:"",direccion_matriz:""
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cooperativaService: CooperativasService,
    private readonly router:Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.prepararformulario()
  }

  ngOnInit(): void {
    const parametrosConsulta$ = this.activatedRoute
      .params;
    parametrosConsulta$
      .subscribe(
        {
          next : (queryParams)=>{
            return this.cooperativaService.buscarCooperativa(+queryParams['idCooperativa']).subscribe(
              {
                next: (datos:CooperativaInterface) => {
                  this.cooperativa=datos
                  this.formActualizarCooperativa.get('nombre')?.setValue(datos.nombre_cooperativa)
                  this.formActualizarCooperativa.get('telefono')?.setValue(datos.telefono)
                  this.formActualizarCooperativa.get('ciudad_matriz')?.setValue(datos.ciudad_matriz)
                  this.formActualizarCooperativa.get('direccion_matriz')?.setValue(datos.direccion_matriz)
                },
                error: (error) => {
                  console.error({error});
                }
              }
            )
          },
          error: (error) => {
            console.error({error});
          },
          complete: ()=>{
          }
        }
      )
  }

  prepararformulario(){
    this.formActualizarCooperativa = this.formBuilder.group(
      {
        nombre: new FormControl ({value: "", disabled:false}, [Validators.required,]
        ),
        telefono: new FormControl({value: "", disabled:false}, [Validators.required,]
        ),
        ciudad_matriz: new FormControl({value: "", disabled:false}, [Validators.required,]
        ),
        direccion_matriz: new FormControl({value: "", disabled:false},  [Validators.required,]
        )
      }
    );
  }

  insertarCooperativa(){
    if(this.formActualizarCooperativa!.valid){
      var datos ={
        nombre_cooperativa:this.formActualizarCooperativa?.get('nombre')?.value,
        telefono:this.formActualizarCooperativa?.get('telefono')?.value,
        ciudad_matriz:this.formActualizarCooperativa?.get('ciudad_matriz')?.value,
        direccion_matriz:this.formActualizarCooperativa?.get('direccion_matriz')?.value,
      }
      this.cooperativaService.actualizarCooperativaPorId(this.cooperativa.id!,datos).subscribe({
        next:()=>{
          this.router.navigate(['listarCooperativas'])
        },
        error:(error)=>{
          console.error(error)
        }
      })
    }

  }

}
