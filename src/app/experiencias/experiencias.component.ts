import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  produto: Produto = new Produto()
  listaProduto: Produto[]

  categoria: Categoria = new Categoria()
  tipoCategoria: number

  constructor(
    private router: Router,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
   this.findAllProduto()
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
