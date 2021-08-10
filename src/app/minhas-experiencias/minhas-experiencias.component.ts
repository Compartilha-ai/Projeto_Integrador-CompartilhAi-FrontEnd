import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-minhas-experiencias',
  templateUrl: './minhas-experiencias.component.html',
  styleUrls: ['./minhas-experiencias.component.css']
})
export class MinhasExperienciasComponent implements OnInit {

  user: User = new User()
  idUser = environment.id
  userId : number

  produto: Produto = new Produto()
  listaProduto: Produto[]

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert('Sua sessão expirou. Faça o login novamente.')
      this.router.navigate(['/login'])
    }

    
    this.findAllProduto()
    this.userId=this.route.snapshot.params['id']
    this.findByIdUser(this.userId)
  }


  findAllProduto(){

   this.produtoService.getAllProduto().subscribe((resp: Produto[]) =>{
      this.listaProduto = resp
    })

    this.findByIdUser(this.userId)
  }


  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.user = resp
    })
  }


}
