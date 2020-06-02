import {Inject, Injectable,} from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http'
import {from, Observable} from 'rxjs';
import { Storage} from '@ionic/storage';


@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor{
    private token = ''
    constructor(private storage: Storage){}

    //Intercept all outgoing http requests to add user token for authentication

    
    intercept(
        
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        this.storage.get('token').then(val => {
            this.token = val
        })
        
        console.log(this.token)
        req = req.clone({
            setHeaders: {
                'Content-Type'  : 'application/json; charset=utf-8',
                Accept          : 'application/json',
                Authorization   : 'Bearer ' + this.storage
            },
        });
        return next.handle(req);
    }


   

}
