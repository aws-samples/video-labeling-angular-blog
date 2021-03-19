// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Amplify Configuration
//https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#create-authentication-service
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './environments/aws-exports';
Amplify.configure(awsconfig);
// End Amplify Configuration

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
