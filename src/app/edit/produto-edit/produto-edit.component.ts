import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  user: User = new User()
  idUser = environment.id
  userId: number

  produto: Produto = new Produto()
  listaProduto: Produto[]

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number
  tipoCategoria: number

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    if(environment.token == ''){
      alert('Sua sessão expirou. Faça o login novamente.')
      this.router.navigate(['/login'])
    }
     let id =this.route.snapshot.params['id'];
     this.findByIdExperiencia(id)
  }

  categoriaId(event: any) {
    this.tipoCategoria = event.target.value

  }

  findByIdExperiencia(id: number){
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=> {
      this.produto = resp
    })
  }

  atualizar(){
    console.log(this.produto)
    this.produtoService.putProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto = resp
    alert('Experiência atualizada com sucesso!')
    this.router.navigate(['/home'])
    })

  }
}
