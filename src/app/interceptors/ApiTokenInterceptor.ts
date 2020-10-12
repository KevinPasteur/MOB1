import {Inject, Injectable,} from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http'
import {from, Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage} from '@ionic/storage';


@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor{
    private token = ''
    constructor(private storage: Storage){}

    //Intercept all outgoing http requests to add user token for authentication  
    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
      
    
        return from(this.storage.get('token'))
        .pipe(
          switchMap(token => {
            
             const headers = req.headers
                      .set('Authorization', 'Bearer ' + token)
                      .append('Content-Type', 'application/json');
             const requestClone = req.clone({
               headers 
              });
            return next.handle(requestClone);
          })
         );
    }

  



   

}
