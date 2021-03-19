// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideosPutResponse } from '../models/videos.model';
import { AppComponent } from 'src/app/app.component';

const BASE_URL = AppComponent.environmentUrl;

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private resource = "videos";

  constructor(private _http: HttpClient) { }

  private getUrl() : string {
    return BASE_URL + this.resource;    
  }

  private getUrlById(id) : string {
    return `${this.getUrl()}/${id}`;
  }

  public putVideosFullResponse(id: string): Observable<HttpResponse<VideosPutResponse>> { //any
    var url = this.getUrlById(id);
    console.log("[putVideosFullResponse] URL: ", url);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'}),
      observe: 'response' as const, // <--- VERY IMPORTANT FRAGMENT (as const)
    };
    
    const httpBody = "just a hardcoded body for testing purposes";
    
    return this._http.put<VideosPutResponse>(url, httpBody, httpOptions); // we need to pass the body (null)
  }

  public putVideosFullResponseAuth(id: string, token: string): Observable<HttpResponse<VideosPutResponse>> { //any
    var url = this.getUrlById(id);
    console.log("[putVideosFullResponseAuth] URL: ", url);
    console.log("[putVideosFullResponseAuth] token: ", token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}),
      observe: 'response' as const, // <--- VERY IMPORTANT FRAGMENT (as const)
    };

    const httpBody = "just a hardcoded body for testing purposes";
    
    return this._http.put<VideosPutResponse>(url, httpBody, httpOptions); // we need to pass the body (null)
  }

  public putFileS3(fileUploadUrl, contentType, file): Observable<any> { 
    console.log("[putFileS3] url: ", fileUploadUrl);
    console.log("[putFileS3] type: ", contentType);    
    //this will be used to upload all files to AWS S3
    const headers = new HttpHeaders(
      {
        'Content-Type': contentType        
      });    


    //NEEDS Cross-origin resource sharing (CORS) AS Bucket Permissions!!!
    const req = new HttpRequest(
        "PUT",
        fileUploadUrl,
        file,
        {
            headers: headers//,
            //reportProgress: true, //This is required for track upload process
        });
    
    return this._http.request(req);    
  }

  public getVideoUrl (token: string, video: string) : Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}),
      observe: 'response' as const // <--- VERY IMPORTANT FRAGMENT (as const)
    };
    
    console.log("URL: ", this.getUrlById(video.trim()));
    return this._http.get<any>(this.getUrlById(video.trim()), httpOptions);
  }
}