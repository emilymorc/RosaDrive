import {Component, OnInit} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActivatedRoute, Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit{

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  signIn() {
    console.log("entra")
    const url = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signIn';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.6'
    });

    const body = {
      email: 'alicesmith@example.com',
      password: 'admin'
    };

    this.http.post(url, body, { headers }).subscribe(
      (response) => {
        // Maneja la respuesta exitosa aquí
        console.log('Respuesta:', response);
      },
      (error) => {
        // Maneja el error aquí
        console.error('Error:', error);
      }
    );
  }

  submitForm() {
    const url = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signIn';

    const body = {
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Your-User-Agent'
    });

    this.http.post(url, body, { headers }).subscribe(
      response => {
        console.log('Response:', response);
        // Puedes manejar la respuesta aquí, por ejemplo, redireccionar al usuario a otra página
      },
      error => {
        console.error('Error:', error);
        // Manejar el error aquí, como mostrar un mensaje de error al usuario
      }
    );
  }

  ngOnInit(): void {
  }





}
