// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component, OnInit } from '@angular/core';
import { TestsService } from '../../shared/services/tests.service';

@Component({
  selector: 'app-test',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit { // implements OnInit => good-practice for life-cycle hook

  public testResponse = "loading..."; 
  
  public test2Response;
  public test2Headers;
  public test2Body = "LOADING";

  public test3Response = "loading...";

  public test4Response;
  public test4Headers;
  public test4Body = "LOADING";

  constructor(private testsService: TestsService) { } // IT NEEDS PRIVATE to be added as a class member!

  ngOnInit(): void { // e.g. of life-cycle hook
    // initialization of the component
    this.refresh();
  } 

  private refresh() : void {  
    this.load();
  }
  
  private load() : void {    

    this.testsService.putAboutFullResponse().subscribe(response => 
      {
        console.log("Retorno do PUT abaixo...");
        console.log(response);        

        this.test4Body = response.body;
        this.test4Headers = response.headers;
        this.test4Response = response.status;
      });
    
    this.testsService.getIdResponse().subscribe(response => 
      {        
        this.test3Response = response.body;        
      });

    this.testsService.getVersionFullResponse().subscribe(response => 
    {
      console.log("Retorno do GET abaixo...");
      console.log(response);

      this.test2Body = response.body;
      this.test2Headers = response.headers;
      this.test2Response = response.status;
    });

    // full response
    this.testsService.allWithFullResponse()
    .subscribe(tests => 
      { 
        this.testResponse = tests.body;

        console.log(`Resposta: ${tests.status} - ${tests.statusText}`);
        // resp is of type `HttpResponse<any>`        
        console.log("Headers: ", tests.headers.keys());
        // And access the body directly.
        console.log("Body: ", tests.body);   
      }); 
  }
}