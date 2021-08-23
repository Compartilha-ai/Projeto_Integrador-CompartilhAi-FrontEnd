import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User=  new User ()
  idUser = environment.id
  userId: number
  confirmarSenha: string
  tipoUsuario: string

  nome = environment.nomeCompleto
  tipo = environment.tipo
  foto = environment.foto

  meuFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
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

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }


    this.findByIdUser(this.idUser)
    this.idUser = this.route.snapshot.params["id"]
  }


  confirmSenha(event: any) {

    this.confirmarSenha = event.target.value


  }


  tipoUser(event: any){
     this.tipoUsuario = event.target.value


    }


    findByIdUser(id: number){
      this.authService.getByIdUser(id).subscribe((resp: User)=>{
        this.user = resp
      })
    }




  atualizar(){
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha){

      this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else {

      this.authService.putUser(this.user).subscribe((resp: User) =>{
        this.user = resp
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')
    
        this.router.navigate(['/login'])

      })

    }



  }










}





