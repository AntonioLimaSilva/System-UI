import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Estado, Cidade, EstadoCivil, Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';
import { EstadoService } from '../../estado/estado.service';
import { CidadeService } from '../../cidade/cidade.service';

@Component({
  selector: 'npj-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html'
})
export class CadastroPessoaComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;

  estadosCivis: EstadoCivil[] = [
    {label: 'Solteiro(a)', value: "SOLTEIRO"},
    {label: 'Casado(a)', value: "CASADO"},
    {label: 'Divorciado(a)', value: "DIVORCIADO"}
  ]

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  estados: Estado[];
  cidades: Cidade[];
  foto: string;
  contentType: string;
  idoso: boolean = false;
  portadorDeficiencia: boolean = false;
  atendimentoPreferencial: boolean = false;

  formulario: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurar();
    this.configDatePicker();
    this.estadoService.findAll().subscribe(estados => this.estados = estados);
  }

  buscarCidadesDoEstado(idEstado: number = -1) {
    this.cidadeService.findByEstadoId(idEstado)
      .subscribe(cidades => this.cidades = cidades);
  }

  salvar(pessoa: Pessoa) {
    pessoa.idoso = this.idoso;
    pessoa.portadorDeficiencia = this.portadorDeficiencia;
    pessoa.atendimentoPreferencial = this.atendimentoPreferencial;
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
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      foneResidencial: this.formBuilder.control(''),
      foneCelular: this.formBuilder.control('', [Validators.required]),
      rg: this.formBuilder.control('', [Validators.pattern(this.numberPattern)]),
      cpf: this.formBuilder.control('', [Validators.required]),     
      dataNascimento: this.formBuilder.control('', [Validators.required]),
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

  fieldChangeIdoso(value: any) {
    this.idoso = value.currentTarget.checked;
  }

  fieldChangePortador(value: any) {
    this.portadorDeficiencia = value.currentTarget.checked;
  }

  fieldChangeAtendimento(value: any) {
    this.atendimentoPreferencial = value.currentTarget.checked;
  }

  configDatePicker() {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY'
    });
  }

}
