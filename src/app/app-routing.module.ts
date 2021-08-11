import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ContatoComponent } from './contato/contato.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MinhasExperienciasComponent } from './minhas-experiencias/minhas-experiencias.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'sobre', component: SobreNosComponent},
  {path: 'produto', component: ExperienciasComponent},
  {path: 'minhas-experiencias/:id', component: MinhasExperienciasComponent},
  {path: 'produto-edit/:id' , component: ProdutoEditComponent},
  {path: 'produto-delete/:id' , component: ProdutoDeleteComponent},
  {path: 'checkout/:id' , component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
