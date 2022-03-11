import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CooperativaInterface } from "../../services/interfaces/cooperativa.interface";
import { ViajeService } from "../../services/http/viajes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ViajeInterface } from "../../services/interfaces/viaje.interface";
import { CooperativasService } from 'src/app/services/http/cooperativas.service';

@Component({
  selector: 'app-ruta-actualizar-viaje',
  templateUrl: './ruta-actualizar-viaje.component.html',
  styleUrls: ['./ruta-actualizar-viaje.component.css']
})
export class RutaActualizarViajeComponent implements OnInit {

  formActualizarViaje!: FormGroup
  viaje: ViajeInterface = {
    id: 0, ciudad_origen: "", ciudad_destino: "", fecha: "", precio: 0, cooperativa: 0, total_asientos: 0
  }
  cooperativas: CooperativaInterface[] = []
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly viajeService: ViajeService,
    private readonly cooperativaService: CooperativasService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.prepararformulario()
  }

  ngOnInit(): void {
    this.cargarCategorias()
    const parametrosConsulta$ = this.activatedRoute
      .params;
    parametrosConsulta$
      .subscribe(
        {
          next: (queryParams) => {
            return this.viajeService.buscarViaje(+queryParams['idViaje']).subscribe(
              {
                next: (datos: ViajeInterface) => {
                  this.viaje = datos;
                  const f = new Date(datos.fecha).toISOString().slice(0,16);
                  this.formActualizarViaje.get('origen')?.setValue(datos.ciudad_origen)
                  this.formActualizarViaje.get('destino')?.setValue(datos.ciudad_destino)
                  this.formActualizarViaje.get('fecha')?.setValue(f)
                  this.formActualizarViaje.get('asientos')?.setValue(datos.total_asientos)
                  this.formActualizarViaje.get('precio')?.setValue(datos.precio)
                  this.formActualizarViaje.get('cooperativa')?.setValue(datos.cooperativa)
                },
                error: (error) => {
                  console.error({ error });
                }
              }
            )
          },
          error: (error) => {
            console.error({ error });
          },
          complete: () => {
          }
        }
      )
  }

  cargarCategorias() {
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
    this.formActualizarViaje = this.formBuilder.group(
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

  actualizarViaje() {
    if (this.formActualizarViaje!.valid) {
      var datos = {
        ciudad_origen: this.formActualizarViaje?.get('origen')?.value,
        ciudad_destino: this.formActualizarViaje?.get('destino')?.value,
        fecha: this.formActualizarViaje?.get('fecha')?.value,
        hora: this.formActualizarViaje?.get('hora')?.value,
        total_asientos: this.formActualizarViaje?.get('asientos')?.value,
        precio: this.formActualizarViaje?.get('precio')?.value,
        cooperativa: this.formActualizarViaje?.get('cooperativa')?.value
      }
      this.viajeService.actualizarViajePorId(this.viaje.id!, datos).subscribe({
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
