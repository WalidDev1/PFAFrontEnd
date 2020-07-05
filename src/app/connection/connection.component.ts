import { Component, OnInit } from '@angular/core';

import { client } from '../service/client.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  email:string;
  password:string;
  message:string = "";
  show = false ;
  constructor(private client: client, private router: Router ) { 
    this.client.getMessage().subscribe((value) => {
      if(value == "isok"){
        this.router.navigate(['']);
      }else{
        this.message = value;
        this.show = true ;
      }
   });
  }

  ngOnInit(): void {
   
  }

  setErreur(){
    var spam = <HTMLInputElement>document.getElementById('erreur');
    spam.innerText = this.message;
  }

  OnclickCnx(){
    this.show = false ;
    var form = new FormData();
    form.append('mail',this.email);
    form.append('pass',this.password);
    this.client.logIn(form);
    
  }
}
