import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class TipoUsuarioGuard {

    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.usuarioLogeado.tipo_Usuario === 'Admin') {
            this._router.navigate(['/listarViajes']);
        }else if(this._authService.usuarioLogeado.tipo_Usuario === 'usuario'){
            this._router.navigate(['/comprarPasajes']);
        }
        return this._authService.isLogin();
    }
}
