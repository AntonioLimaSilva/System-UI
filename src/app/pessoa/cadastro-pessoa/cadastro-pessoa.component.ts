import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Estado, Cidade, EstadoCivil, Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';
import { EstadoService } from '../../estado/estado.service';
import { CidadeService } from '../../cidade/cidade.service';

@Component({
  selector: 'npj-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html'
})
export class CadastroPessoaComponent implements OnInit {

  estadosCivis: EstadoCivil[] = [
    {label: 'Solteiro(a)', value: "SOLTEIRO"},
    {label: 'Casado(a)', value: "CASADO"},
    {label: 'Divorciado(a)', value: "DIVORCIADO"}
  ]

  estados: Estado[];
  cidades: Cidade[];
  foto: string;
  contentType: string;

  formulario: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurar();
    this.estadoService.findAll().subscribe(estados => this.estados = estados);
  }

  buscarCidadesDoEstado(idEstado: number = -1) {
    this.cidadeService.findByEstadoId(idEstado)
      .subscribe(cidades => this.cidades = cidades);
  }

  salvar(pessoa: Pessoa) {
    pessoa.foto = this.foto;
    pessoa.contentType = this.contentType;

    this.pessoaService.save(pessoa)
      .subscribe((id) => {
        this.formulario.reset();
      });
  }

  configurar() {
    this.formulario = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      pseudonimo: this.formBuilder.control('', [Validators.required]),
      idoso: this.formBuilder.control(''),
      portadorDeficiencia: this.formBuilder.control(''),
      atendimentoPreferencial: this.formBuilder.control(''),
      email: this.formBuilder.control('', [Validators.required]),
      foneResidencial: this.formBuilder.control(''),
      foneCelular: this.formBuilder.control('', [Validators.required]),
      rg: this.formBuilder.control(''),
      cpf: this.formBuilder.control('', [Validators.required]),     
      dataNascimento: this.formBuilder.control(''),
      naturalidade: this.formBuilder.control(''),
      nacionalidade: this.formBuilder.control(''),
      profissao: this.formBuilder.control(''),
      estadoCivil: this.formBuilder.control('', [Validators.required]),
      endereco: this.formBuilder.group({
        logradouro: this.formBuilder.control('', Validators.required),
        bairro: this.formBuilder.control(''),
        cep: this.formBuilder.control('', Validators.required),
        cidade: this.formBuilder.group({
          id: this.formBuilder.control('', Validators.required)
        })
      })    
    });
  }

  inputFileChange(event) {
    if(event.target.files && event.target.files[0]) {
      const files = event.target.files[0];

      this.pessoaService.upload(files).subscribe(
        arquvio => {
          this.foto = arquvio.fileName;
          this.contentType = arquvio.contentType;
        });
    }
  }

}
