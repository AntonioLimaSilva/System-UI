import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CadastroPessoaComponent } from './pessoa/cadastro-pessoa/cadastro-pessoa.component';
import { PesquisaPessoasComponent } from './pessoa/pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroDocumentoComponent } from './documento/cadastro-documento/cadastro-documento.component';
import { PesquisaDocumentosComponent } from './documento/pesquisa-documentos/pesquisa-documentos.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pessoas/nova', component: CadastroPessoaComponent },
    { path: 'pessoas', component: PesquisaPessoasComponent },
    { path: 'pessoas/:id', component: CadastroPessoaComponent },
    { path: 'documentos/novo', component: CadastroDocumentoComponent },
    { path: 'documentos', component: PesquisaDocumentosComponent },
    { path: 'documentos/:id', component: CadastroDocumentoComponent }
]