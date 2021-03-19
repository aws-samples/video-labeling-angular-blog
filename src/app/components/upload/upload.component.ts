// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { VideosService } from 'src/app/shared/services/videos.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public httpResponseStatus;
  public httpResponseHeaders;
  public httpResponseBody;

  private fileToUpload;
  public nomeArquivo: string = "";
  
  public preSignedURL: string = "";

  constructor(
    private videoService: VideosService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  public inputFileChange(e: Event): void {
    // todo validate input data
    var element = e.target as HTMLInputElement;

    if (null !== element.files) {
      this.fileToUpload = element.files[0];
      this.nomeArquivo = this.fileToUpload.name;
    }

    //console.log(evento);
    console.log(`[inputFileChange] ${this.nomeArquivo}`);

    this.preSignedURL = "Loading...";
  }

  public buttonGeneratePreSignUrl(evento: Event): void {
    console.log("*** Get Pre-Signed URL... ***");

    this.videoService.putVideosFullResponse(this.nomeArquivo)
      .subscribe(response => {
        this.httpResponseStatus = response.status;
        this.httpResponseHeaders = response.headers;
        this.httpResponseBody = response.body;
      },
        error => {
          console.log("*** error ***");
          console.log(error);
          var responseError = error as HttpErrorResponse;

          this.httpResponseStatus = responseError.status; 
          this.httpResponseBody = responseError.headers;
          this.httpResponseBody = responseError.error;
        });
  }

  public buttonGeneratePreSignUrlAuth(event: Event): void {
    console.log("*** Get Auth Pre-Signed URL... ***");

    this.authService.getAccessToken().then(
      res => {
        var accessToken = res.getJwtToken();

        this.videoService.putVideosFullResponseAuth(this.nomeArquivo, accessToken)
        .subscribe(response => {
          this.httpResponseStatus = response.status;
          this.httpResponseHeaders = response.headers;
          this.httpResponseBody = response.body;

          this.preSignedURL = this.httpResponseBody.url;          
        },
          error => {
            console.log("*** error ***");
            console.log(error);
            var responseError = error as HttpErrorResponse;
  
            this.httpResponseStatus = responseError.status;
            this.httpResponseBody = responseError.headers;
            this.httpResponseBody = responseError.error;
          });
      }
    );    
  }

  public buttonUploadFileToS3(event: Event): void {    
    const fileuploadurl = this.preSignedURL;    
    //once the presigned url is received the next service call will upload the file.
    this.videoService.putFileS3(fileuploadurl, "video/mp4", this.fileToUpload).subscribe(
      next => {
        let response = next;        
        this.preSignedURL = 'Uploaded Started...'; 
      },
      err => this.preSignedURL = 'Observer got an error: ' + err,
      () => {
        console.log('Observer got a complete notification');
        this.preSignedURL = 'Uploaded Completed!';
      }  
    );    
    //handle HttpEvent progress or response and update view
  }
}