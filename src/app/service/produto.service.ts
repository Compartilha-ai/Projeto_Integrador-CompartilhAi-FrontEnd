// Este é o Service de Experiencias

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>('https://compartilhai.herokuapp.com/produto')
  }

  getByIdProduto(id: number): Observable<Produto>{
    return this.http.get<Produto>(`https://compartilhai.herokuapp.com/produto/${id}`)
  }

  getByNomeProduto(nome: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`https://compartilhai.herokuapp.com/produto/nome/${nome}`)
  }

  getByPrecoMaiorProduto(preco: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(`https://compartilhai.herokuapp.com/produto/precomaior/${preco}`)
  }

  getByPrecoMenorProduto(preco: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(`https://compartilhai.herokuapp.com/produto/precomenor/${preco}`)
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('https://compartilhai.herokuapp.com/produto', produto)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://compartilhai.herokuapp.com/produto', produto)
  }

  putCurtirProduto(id: number): Observable<Produto>{
    return this.http.put<Produto>(`https://compartilhai.herokuapp.com/produto/curtir/${id}`, id)
  }

  putDescurtirProduto(id: number): Observable<Produto>{
    return this.http.put<Produto>(`https://compartilhai.herokuapp.com/produto/descurtir/${id}`, id)
  }

  deleteProduto(id: number) {
    return this.http.delete(`https://compartilhai.herokuapp.com/produto/${id}`)
  }
}
