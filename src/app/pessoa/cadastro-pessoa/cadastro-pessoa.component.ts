import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Rx';

import { Estado, Cidade, EstadoCivil, Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';
import { EstadoService } from '../../estado/estado.service';
import { CidadeService } from '../../cidade/cidade.service';
import { API_URL } from '../../api-url';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'npj-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html'
})
export class CadastroPessoaComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;

  estadosCivis: EstadoCivil[] = [
    {label: 'Solteiro(a)', value: 'SOLTEIRO' },
    {label: 'Casado(a)', value: 'CASADO' },
    {label: 'Divorciado(a)', value: 'DIVORCIADO' }
  ]

  sexos: any[] = [
    {label: 'Masculino', value: 'MASCULINO'},
    {label: 'Feminino', value: 'FEMININO'}
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
  url: any;

  formulario: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.configure();
    this.configDatePicker();

    this.estadoService.findAll().subscribe(estados => this.estados = estados);

    const id = this.activatedRoute.snapshot.params['id'];

    if(id) {
      this.load(id);
    }
  }

  findAllCidadesBy(idEstado: number = -1) {
    this.cidadeService.findByEstadoId(idEstado)
      .subscribe(cidades => this.cidades = cidades);
  }

  salvar(pessoa: Pessoa) {
    if(this.editando) {
      this.update(pessoa);
    } else {
      this.add(pessoa);
    }
  }
  
  add(pessoa: Pessoa) {
    pessoa.idoso = this.idoso;
    pessoa.portadorDeficiencia = this.portadorDeficiencia;
    pessoa.atendimentoPreferencial = this.atendimentoPreferencial;
    pessoa.foto = this.foto;
    pessoa.contentType = this.contentType;
  
    this.pessoaService.save(pessoa)
      .subscribe((id) => {
        this.formulario.reset();
        this.removeFoto();
        
        this.toastyService.success('Pessoa adicionada com sucesso!');
      },
      error => {
        this.toastyService.error('Erro adicionada pessoa!');
        return Observable.throw(this.errorHandlerService.handle(error));
    });
  }

  update(pessoa: Pessoa) {
    pessoa.foto = this.foto;
    pessoa.contentType = this.contentType;

    this.pessoaService.update(pessoa).subscribe(pessoa => {
      this.toastyService.success('Pessoa atualizada com sucesso!');
    
    }, error => {
      this.toastyService.error('Erro atualizada pessoa!');
      return Observable.throw(this.errorHandlerService.handle(error));
    });   
  }

  load(id: number) {
    this.pessoaService.findById(id).subscribe(pessoa => {
      const p = pessoa;
      this.findAllCidadesBy(p.endereco.estado.id);
      p.dataNascimento = moment(p.dataNascimento).toDate();
      this.url = this.getImagePath(p.foto);

      this.formulario.setValue(p);
    },
    error => {
        this.toastyService.error('Erro ao buscar pessoa!');
        return Observable.throw(this.errorHandlerService.handle(error));
    });
  }

  configure() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      pseudonimo: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      foneResidencial: this.formBuilder.control(''),
      foneCelular: this.formBuilder.control('', [Validators.required]),
      foto: [],
      contentType: [],
      sexo: [],
      rg: this.formBuilder.control('', [Validators.pattern(this.numberPattern)]),
      cpf: this.formBuilder.control('', [Validators.required]),     
      dataNascimento: this.formBuilder.control('', [Validators.required]),
      naturalidade: this.formBuilder.control(''),
      nacionalidade: this.formBuilder.control(''),
      profissao: this.formBuilder.control(''),
      estadoCivil: this.formBuilder.control('', [Validators.required]),
      idoso: [],
      portadorDeficiencia: [],
      atendimentoPreferencial: [],
      endereco: this.formBuilder.group({
        id: [],
        logradouro: this.formBuilder.control('', Validators.required),
        bairro: this.formBuilder.control(''),
        cep: this.formBuilder.control('', Validators.required),
        estado: this.formBuilder.group({
          id: [],
          nome: []
        }),
        cidade: this.formBuilder.group({
          id: this.formBuilder.control('', Validators.required),
          nome: []
        })
      }),
      observacao: []
    });
  }

  inputFileChange(event) {
    if(event.target.files && event.target.files[0]) {
      const files = event.target.files[0];

      this.pessoaService.upload(files).subscribe(
        arquvio => {
          this.foto = arquvio.fileName;
          this.contentType = arquvio.contentType;
          this.url = this.getImagePathTemp(this.foto);
        },
        error => {
          this.toastyService.error('Error ao enviar foto');
          return Observable.throw(this.errorHandlerService.handle(error));
      });
    }
  }

  removeFoto() {
    this.foto = undefined;
    this.contentType = undefined;
    this.url = undefined;
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

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  getImagePath(filename: any) {
    let url = filename === "" || filename === null ? `${API_URL}/fotos/thumbnail.pessoa.mock.png` : `${API_URL}/fotos/thumbnail.${filename}`;
    return url;
  }

  getImagePathTemp(filename: any) {
    let url = `${API_URL}/fotos/temp/${filename}`;
    return url;
  }

}
