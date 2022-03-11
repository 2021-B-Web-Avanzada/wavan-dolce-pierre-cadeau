import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CooperativaInterface} from "../../services/interfaces/cooperativa.interface";
import {CooperativasService} from "../../services/http/cooperativas.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ruta-registro-cooperativa',
  templateUrl: './ruta-registro-cooperativa.component.html',
  styleUrls: ['./ruta-registro-cooperativa.component.css']
})
export class RutaRegistroCooperativaComponent implements OnInit {

  formInsertarCooperativa!: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cooperativaService: CooperativasService,
    private readonly router:Router
  ) {
    this.prepararformulario()
  }

  ngOnInit(): void {}

  prepararformulario(){
    this.formInsertarCooperativa = this.formBuilder.group(
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
    if(this.formInsertarCooperativa!.valid){
      var datos ={
        nombre_cooperativa:this.formInsertarCooperativa?.get('nombre')?.value,
        telefono:this.formInsertarCooperativa?.get('telefono')?.value,
        ciudad_matriz:this.formInsertarCooperativa?.get('ciudad_matriz')?.value,
        direccion_matriz:this.formInsertarCooperativa?.get('direccion_matriz')?.value,
      }
      this.cooperativaService.insertarCooperativa(datos).subscribe({
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
