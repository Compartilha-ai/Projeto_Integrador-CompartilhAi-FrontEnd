import { ProdutoService } from './../service/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../model/Produto';



declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  paidFor = false
  produtoId: number
  produto: Produto = new Produto()

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.produtoId = this.route.snapshot.params["id"]
    this.findByIdProduto(this.produtoId)


    // paypal
paypal.Buttons({
  createOrder: (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        description: 'Experiências Compartilhai',
        amount: {
          currency_code: 'BRL',
          value: this.produto.preco
        }
      }]
    })
  },
  onApprove: async (data: any, actions: any) => {
    const order = await actions.order.capture()
    this.paidFor = true
    console.log(order)
  },
  onError: (err: any) => {
    console.log(err)
  }
})
  .render(this.paypalElement.nativeElement)

}

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp
    })
  }
}
