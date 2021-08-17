import { ProdutoService } from './../service/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';
import { NgxMercadopagoService } from 'ngx-mercadopago';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  produtoId: number
  produto: Produto = new Produto()

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private window: Window,
    private ngxMpService: NgxMercadopagoService,
    ) { }

  ngOnInit(){
    this.produtoId = this.route.snapshot.params["id"]
    this.findByIdProduto(this.produtoId)

  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp
    })
  }

}



