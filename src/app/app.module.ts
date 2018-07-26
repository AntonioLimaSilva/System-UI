import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastyModule } from 'ng2-toasty';

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
import { EstadoService } from './estado/estado.service';
import { CidadeService } from './cidade/cidade.service';
import { ErrorHandlerService } from './core/error-handler.service';
import { PesquisaPessoasComponent } from './pessoa/pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroDocumentoComponent } from './documento/cadastro-documento/cadastro-documento.component';
import { DocumentoService } from './documento/documento.service';
import { PesquisaDocumentosComponent } from './documento/pesquisa-documentos/pesquisa-documentos.component';
import { ModalRemoveComponent } from './shared/modal-remove/modal-remove.component';
import { AssistidoService } from './assistido/assistido.service';
import { CadastroAssistidoComponent } from './assistido/cadastro-assistido/cadastro-assistido.component';
import { TableComponent } from './shared/table/table.component';
import { PaginationComponent } from './shared/pagination/pagination.component';

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
    PesquisaPessoasComponent,
    CadastroDocumentoComponent,
    PesquisaDocumentosComponent,
    ModalRemoveComponent,
    CadastroAssistidoComponent,
    TableComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    EstadoService,
    CidadeService,
    PessoaService,
    DocumentoService,
    AssistidoService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
