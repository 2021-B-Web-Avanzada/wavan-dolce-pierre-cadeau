import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { PagoService } from "../http/pago.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AsientosGuard {
    constructor(private readonly _pagoService: PagoService,
        private readonly _router: Router,
        private readonly activatedRoute: ActivatedRoute,) { }
    idViaje = 0;

    ngOnInit(): void {
        this.getId()
    }
    
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const hayAsientos = this._pagoService.asientos.length > 0;
        if (!hayAsientos) {
            console.log("viaje: "+this.idViaje);
            this._router.navigate(['/comprarPasajes']);
        }
        return hayAsientos;
    }

    getId() {
        const parametrosConsulta$ = this.activatedRoute.params;
        parametrosConsulta$.subscribe(
            (queryParams) => {
                this.idViaje = queryParams['idViaje'];
                console.log("viaje: "+this.idViaje);
            }
        );
    }
}
