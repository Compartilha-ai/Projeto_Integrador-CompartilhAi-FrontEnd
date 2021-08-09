import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';
import { ContatoComponent } from './contato/contato.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaComponent } from './categoria/categoria.component';
import { MinhasExperienciasComponent } from './minhas-experiencias/minhas-experiencias.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    ExperienciasComponent,
    ContatoComponent,
    SobreNosComponent,
    LoginComponent,
    CadastrarComponent,
    HomeComponent,
    CategoriaComponent,
    MinhasExperienciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
