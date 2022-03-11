import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class EstaLogeadoGuard {

    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this._authService.estaLogeado) {
            //console.log(this._authService.usuarioLogeado);
            this._router.navigate(['']);
        }
        return this._authService.estaLogeado
    }
}
