import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ViajeService } from "../../services/http/viajes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ViajeInterface } from "../../services/interfaces/viaje.interface";
import { CooperativaInterface } from "../../services/interfaces/cooperativa.interface";
import { CooperativasService } from 'src/app/services/http/cooperativas.service';

@Component({
  selector: 'app-ruta-registrar-viajes',
  templateUrl: './ruta-registrar-viajes.component.html',
  styleUrls: ['./ruta-registrar-viajes.component.css']
})
export class RutaRegistrarViajesComponent implements OnInit {
  formInsertarViaje!: FormGroup
  cooperativas: CooperativaInterface[] = []
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly viajeService: ViajeService,
    private readonly cooperativaService: CooperativasService,
    private readonly router: Router
  ) {
    this.prepararformulario()
  }

  ngOnInit(): void {
    this.cooperativaService
      .mostrarCooperativas()
      .subscribe({
        next: (datos: CooperativaInterface[]) => {
          this.cooperativas = datos

        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  prepararformulario() {
    this.formInsertarViaje = this.formBuilder.group(
      {
        origen: new FormControl({ value: "", disabled: false }, [Validators.required,]
        ),
        destino: new FormControl({ value: "", disabled: false }, [Validators.required,]
        ),
        fecha: new FormControl({ value: "", disabled: false }, [Validators.required,]
        ),
        asientos: new FormControl({ value: "", disabled: false }, [Validators.required,]
        ),
        precio: new FormControl({ value: "", disabled: false }, [Validators.required,]
        ),
        cooperativa: new FormControl({ value: "", disabled: false }, [Validators.required,]
        ),
      }
    );
  }

  insertarViaje() {
    if (this.formInsertarViaje!.valid) {
      var datos = {
        ciudad_origen: this.formInsertarViaje?.get('origen')?.value,
        ciudad_destino: this.formInsertarViaje?.get('destino')?.value,
        fecha: this.formInsertarViaje?.get('fecha')?.value,
        total_asientos: this.formInsertarViaje?.get('asientos')?.value,
        precio: this.formInsertarViaje?.get('precio')?.value,
        cooperativa: this.formInsertarViaje?.get('cooperativa')?.value
      }
      console.log(datos)
      this.viajeService.insertarViaje(datos).subscribe({
        next: () => {
          this.router.navigate(['listarViajes'])
        },
        error: (error) => {
          console.error(error)
        }
      })
    }

  }

}
