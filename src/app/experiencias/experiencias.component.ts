import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
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
    console.log(this.produto)
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) =>{
      this.produto = resp
      console.log(this.produto)
      alert('Produto cadastrado com sucesso!')
      this.findAllProduto()
      this.produto = new Produto()
    })
  }

}
