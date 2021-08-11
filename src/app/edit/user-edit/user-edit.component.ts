import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

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

      alert('As senhas estão incorretas.')
    } else {

      this.authService.putUser(this.user).subscribe((resp: User) =>{
        this.user = resp
        this.router.navigate(['/inicio'])

        alert('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nomeCompleto = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/login'])

        })

    }



  }










}





