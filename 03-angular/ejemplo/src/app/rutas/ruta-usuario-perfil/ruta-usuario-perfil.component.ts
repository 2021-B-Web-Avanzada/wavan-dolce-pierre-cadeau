import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalEjemploComponent } from 'src/app/componentes/modales/modal-ejemplo/modal-ejemplo.component';
import { UserJphInterface } from 'src/app/servicios/http/interfaces/user-jph.interface';
import { UserJPHService } from 'src/app/servicios/http/user-jph.service';

@Component({
  selector: 'app-ruta-usuario-perfil',
  templateUrl: './ruta-usuario-perfil.component.html',
  styleUrls: ['./ruta-usuario-perfil.component.scss']
})
export class RutaUsuarioPerfilComponent implements OnInit {
  idUsuario = 0;
  valorKnob = 36;
  usuarioActual?: UserJphInterface;
  formGroup?: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userJPHService: UserJPHService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const parametrosRuta$ = this.activatedRoute.params;
    parametrosRuta$.subscribe(
      (parametrosRuta) => {
        console.log(parametrosRuta);
        this.idUsuario = +parametrosRuta['idUsuario'];
        this.buscarUsuario(this.idUsuario);
      },
      () => {
      },
      () => {
      }
    );
  }

  private prepararFormulario() {
    this.formGroup = this.formBuilder.group({
      email: new FormControl({
        value: this.usuarioActual ? this.usuarioActual.email : '',
        disabled: false//this.usuarioActual
      },
        [Validators.required,
        Validators.email]),
      esAdministrador: new FormControl(true)
    });

    const cambio$ = this.formGroup.valueChanges;
    cambio$.subscribe(
      (data) => {
        if (this.formGroup?.valid) {
          console.log('valido');
        } else {
          console.log('invalido');
        }
      }
    );
  }

  buscarUsuario(id: number) {
    const buscarUsuario$ = this.userJPHService.buscarUno(id);
    buscarUsuario$.subscribe(
      (data) => {
        this.usuarioActual = data;
        this.prepararFormulario();
      },
      (error) => {
        console.log(error);
      },
      () => {
      }
    );
  }

  prepararObjeto() {
    if (this.formGroup?.valid) {
      const email = this.formGroup.get('email')
      if (email) {
        return {
          email: email.value,
        }
      }
    } else {
      console.log('invalido');
    }
    return {
      email: '',
    }
  }

  actualizarUsuario() {
    if (this.usuarioActual) {
      const valorAActualizar = this.prepararObjeto();
      const actualizarUsuario$ = this.userJPHService.actualizarPorID(this.usuarioActual.id, valorAActualizar);
      actualizarUsuario$.subscribe(
        (data) => {
          console.log({ data });
          const url = ['/app', 'usuario'];
          this.router.navigate(url);
        },
        (error) => {
          console.log(error);
        },
        () => {
        }
      );

    }
  }

  items = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        console.log('update');
      }
    }, {
      label: 'Setup',
      icon: 'pi pi-cog',
      routerLink: ['/setup']
    }]

  guardar() {
    console.log('save');
  }
  model = {
    left: true,
    middle: false,
    right: false
  }

  openDialog() {
    const referenciaDialogo = this.dialog.open(
      ModalEjemploComponent,
      {
        data:
          { animal: 'panda' }
      });

    const despuesCerrado$ = referenciaDialogo.afterClosed();
    despuesCerrado$.subscribe(
      (data) => {
        console.log({ data });
      }
    );
  }
}
