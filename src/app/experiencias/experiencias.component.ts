import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cadastrarProduto(){
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) =>{
      this.produto = resp
      alert('Produto cadastrado com sucesso!')
      this.findAllProduto()
      this.produto = new Produto()
    })
  }

}
