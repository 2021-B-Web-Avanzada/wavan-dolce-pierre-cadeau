import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class EsAdministradorGuard {
    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            console.log(this._authService.usuarioLogeado);
            const esAdministrador = this._authService.isAdmin();
        if (!esAdministrador) {
            this._router.navigate(['']);
        }
        return esAdministrador;
    }
}
