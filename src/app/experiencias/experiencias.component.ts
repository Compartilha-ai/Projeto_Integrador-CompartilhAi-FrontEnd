import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  user: User = new User()
  idUser = environment.id
  id = environment.id

  produto: Produto = new Produto()
  listaProduto: Produto[]

  categoria: Categoria = new Categoria()
  tipoCategoria: number
  produtoPost: string

  constructor(
    public authService: AuthService,
    private produtoService: ProdutoService,
    private alertas: AlertasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.findByIdUser()
    this.findAllProduto()

  }


  findByIdUser () {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  findAllProduto(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) =>{
      this.listaProduto = resp
    })
  }

  categoriaId(event: any) {
    this.tipoCategoria = event.target.value

  }

  cadastrarProduto(){
    this.categoria.id = this.tipoCategoria
    this.produto.categoria = this.categoria

    this.user.id = this.idUser
    this.produto.usuario = this.user

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) =>{
      this.produto = resp
      this.alertas.showAlertSuccess('Produto cadastrado com sucesso!')
      this.findAllProduto()
      this.produto = new Produto()
    })
  }


  findByProdutoPostagem(){
    if(this.produtoPost == ''){
      this.findAllProduto()
    } else {
      this.produtoService.getByNomeProduto(this.produtoPost).subscribe((resp: Produto[])=> {
        this.listaProduto = resp
      })
    }

  }

  logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok = true
    }
    else{
      this.alertas.showAlertInfo('Cadastre-se ou faça login para efetuar a sua compra!')
      this.router.navigate(['/login'])
    }
  }
}