import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CadastroPessoaComponent } from './pessoa/cadastro-pessoa/cadastro-pessoa.component';
import { PesquisaPessoasComponent } from './pessoa/pesquisa-pessoas/pesquisa-pessoas.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pessoas/nova', component: CadastroPessoaComponent },
    { path: 'pessoas/:id', component: CadastroPessoaComponent },
    { path: 'pessoas', component: PesquisaPessoasComponent }
]