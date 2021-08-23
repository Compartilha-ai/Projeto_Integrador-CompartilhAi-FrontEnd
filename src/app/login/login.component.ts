import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  meuFormGroup: FormGroup;


  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService,
    private formBuilder: FormBuilder
  ) {
    this.meuFormGroup = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      senha: ['', [
        Validators.required,
        Validators.minLength(6)]]
    })
   }

  ngOnInit(){
    window.scroll(0,0)
  }

  entrar(){
    this.auth.login(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp
      environment.token = this.userLogin.token
      environment.nomeCompleto = this.userLogin.nomeCompleto
      environment.id = this.userLogin.id
      environment.foto = this.userLogin.foto
      environment.tipo = this.userLogin.tipo

      console.log(environment.id)
      this.router.navigate(['/home'])
    }, error => {
      if(error.status == 401){
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos')
      }
    })
  }

}
