// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment'; // external setttings
import { AuthService } from './shared/services/auth.service';

@Component({ //metadata
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AWSome Builder Blog';
  userInfo = 'unauthenticated';

  showMenu: boolean = false;
  public static environmentName = environment.environmentName;;
  public static environmentUrl = environment.apiUrl;

  links = [    
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/tests', icon: 'public', title: 'Simple Tests' }
  ];

  constructor(public authAWSome: AuthService,
    private router: Router) { // in order to navigate using code instead of UI/navigation-bar

    this.authAWSome.showMenuEmitter.subscribe(
      show => {
        this.showMenu = show;

        if (show) {           
          this.authAWSome.getCurrentUserInfo().then(user => {
            console.log("User: ", user)
            this.userInfo = user;
          });
        }
        else
          this.userInfo = "unauthenticated";
      }      
    );
  }

  checkUserInfo() {
    console.log("*** checkUserInfo ***");
    this.authAWSome.info();
  }
  
  public login() {
    this.router.navigateByUrl("/login");
  }
}