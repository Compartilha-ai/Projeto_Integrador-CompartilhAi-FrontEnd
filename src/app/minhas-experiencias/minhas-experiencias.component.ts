import { Categoria } from './../model/Categoria';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-minhas-experiencias',
  templateUrl: './minhas-experiencias.component.html',
  styleUrls: ['./minhas-experiencias.component.css']
})
export class MinhasExperienciasComponent implements OnInit {

  verificaProd: boolean = false

  user: User = new User()
  idUser = environment.id
  userId: number

  produto: Produto = new Produto()
  listaProduto: Produto[]

  listaCategoria: Categoria[]

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua sessão expirou. Faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.userId = this.route.snapshot.params["id"]
    this.findByIdUser(this.userId)

    this.getAllCategoria()
    this.getAllProduto()
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  getAllProduto() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[])=>{
      this.listaProduto = resp
    })
  }
}
