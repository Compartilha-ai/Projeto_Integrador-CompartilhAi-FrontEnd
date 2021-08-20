import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  meuFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService,
    private formBuilder: FormBuilder,
  ) {
    this.meuFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      foto: ['', Validators.required],
      senha: ['', [
        Validators.required,
        Validators.minLength(6)]],
      confirmSenha: ['', Validators.required],
      dataNasc: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    })
   }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.tipoUsuario
    if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertDanger("As senhas estão incorretas.")
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/login'])
        this.alertas.showAlertSuccess("Usuário cadastrado com sucesso!")
      })
    }

  }

}
