// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() 
  appTitle: string =""; //from parent component?!

  public status: string = "";
  public accessToken: string = "";
  public idToken: string = "";
  public refreshToken: string = "";
  
  constructor(private authService: AuthService) { // dependency injection
    
   } 

   public ngOnInit():void {
     this.authService.info();
    
    this.authService.checkAuthenticated().then(state => {
      if (state)
        console.log("[double checked] Sessão iniciada!");
      else
        console.log("[double checked] Sessão não iniciada!");
      this.refresh();
    });

    this.authService.getAccessToken().then(
      res => this.accessToken = res.getJwtToken()).catch(() => console.log("no current user"));
    this.authService.getIdToken().then(
        res => this.idToken = res.getJwtToken()).catch(() => console.log("no current user"));
    this.authService.getRefreshToken().then(
      res => this.refreshToken = res.getToken()).catch(() => console.log("no current user"));    
  }

  refresh() {
    this.status = this.authService.userAuthenticated ? "connected" : "disconnected";
  }

  doLogin()
  {
    console.log("doLogin", this.authService.userAuthenticated);
    this.authService.doAmplifyLogin();    
  }

  doLogout()
  {
    console.log("doLogout", this.authService.userAuthenticated);
    this.authService.doAmplifyLogout();
  }
}