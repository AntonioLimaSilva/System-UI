import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarLeftComponent } from './core/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './core/sidebar-right/sidebar-right.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './npj-routing.module';
import { CadastroPessoaComponent } from './pessoa/cadastro-pessoa/cadastro-pessoa.component';
import { InputContentComponent } from './shared/input-content/input-content.component';
import { SelectComponent } from './shared/select/select.component';
import { PessoaService } from './pessoa/pessoa.service';
import { HttpModule } from '@angular/http';
import { EstadoService } from './estado/estado.service';
import { CidadeService } from './cidade/cidade.service';
import { PesquisaPessoasComponent } from './pessoa/pesquisa-pessoas/pesquisa-pessoas.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    FooterComponent,
    HomeComponent,
    CadastroPessoaComponent,
    InputContentComponent,
    SelectComponent,
    PesquisaPessoasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [EstadoService, CidadeService, PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
