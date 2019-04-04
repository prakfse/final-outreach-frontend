import { Injectable } from "@angular/core";
import { UserService } from "src/app/shared/user.service";
import { Router } from "@angular/router";
import { HttpHandler, HttpRequest, HttpInterceptor } from "@angular/common/http";
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //console.log('Hi auth.inter');
        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            const clonedReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            return next.handle(clonedReq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigate(['/signin']);
                        }
                    }
                )
            );
        }
    }
}