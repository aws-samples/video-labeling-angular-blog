// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'; //, UrlTree
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({ // need this to later inject into the route...
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService : AuthService, private _router : Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean { //Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    
      // Authentication/Authorization code here...
      if (this._authService.isUserAuthenticated())
        return true;
    
      this._router.navigate(['login']);
      return false;
  }  
}