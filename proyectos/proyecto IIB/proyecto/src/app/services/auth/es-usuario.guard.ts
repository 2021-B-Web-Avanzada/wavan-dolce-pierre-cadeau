import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class EsUsuarioGuard {
    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            const esUsuario = this._authService.usuarioLogeado.tipo_Usuario ==='usuario';
        if (!esUsuario) {
            this._router.navigate(['/forbidden']);
        }
        return esUsuario;
    }
}
