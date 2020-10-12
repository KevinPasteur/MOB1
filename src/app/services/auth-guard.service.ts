import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Storage} from '@ionic/storage';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,private storage: Storage) {}

  public authenticated: Boolean
 
  canActivate(route: ActivatedRouteSnapshot ): boolean {

    this.storage.get('token').then(val => {
      if (val == null) {
        this.router.navigate(["login"]);
        return false;
      }
    })

    return true;
  }
}