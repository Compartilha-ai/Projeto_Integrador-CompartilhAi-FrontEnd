import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }


  getByIdUser (id: number): Observable<User> {
    return this.http.get<User>(`https://compartilhai.herokuapp.com/usuarios/${id}`)
  }

  login(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://compartilhai.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('https://compartilhai.herokuapp.com/usuarios/cadastrar', user)
  }

  putUser(user: User): Observable<User>{
    return this.http.put<User>('https://compartilhai.herokuapp.com/usuarios/alterar', user)
  }

  logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }

  vendedor () {
    let ok: boolean = false

    if (environment.tipo == 'vendedor') {
      ok = true
    }

    return ok
  }
}
