// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { HttpClientModule } from '@angular/common/http'; // REST client

// Internationalization (PT-BR)
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// UI
import { MaterialModule } from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 

// My Components
import { HomeComponent } from './components/home/home.component';
import { TestsComponent } from './components/tests/tests.component';
import { LoginComponent } from './components/login/login.component';

// My Services...
import { TestsService } from './shared/services/tests.service';
import { AuthService } from './shared/services/auth.service';
import { LabelsService } from './shared/services/labels.service';
import { VideosService } from './shared/services/videos.service';

import { UploadComponent } from './components/upload/upload.component';
import { VideosComponent } from './components/videos/videos.component';

registerLocaleData(ptBr) 

@NgModule({
  imports: [ // imports are for modules
    BrowserModule,
    AppRoutingModule, // Navigation routes in app-routing.module.ts (routing table) - best practice to have it in a separated module
    BrowserAnimationsModule, 
    MaterialModule,
    HttpClientModule, // obviously, to make HTTP calls (added by Angular CLI).
    FormsModule, ReactiveFormsModule // to work with (template) forms
  ],
  declarations: [ // declarations are for components
    AppComponent,
    HomeComponent,
    TestsComponent,
    LoginComponent,
    UploadComponent,
    VideosComponent
  ],
  providers: [ // providers are for services
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // force to use locale pt-BR
    TestsService,
    AuthService, VideosService, LabelsService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }