import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documento } from '../../core/model';
import { DocumentoService } from '../documento.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'npj-cadastro-documento',
  templateUrl: './cadastro-documento.component.html'
})
export class CadastroDocumentoComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private documentoService: DocumentoService,
    private toastyService: ToastyService,
    private activetedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.configure();

    const id = this.activetedRoute.snapshot.params['id'];
    
    if(id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.documentoService.findById(id).subscribe(documento => {
      console.log(documento)
      this.formGroup.setValue(documento);
    })
  }

  configure() {
    this.formGroup = this.formBuilder.group({
      id: [],
      descricao: this.formBuilder.control('', Validators.required),
      nome: this.formBuilder.control('', Validators.required),
      contentType: [],
      tamanho: [],
      isPrincipal: []
    });
  }

  inputFileChange(event) {
   this.selectedFiles = event.target.files;

  if(this.selectedFiles.item(0).size < 100000) {
    this.progress.percentage = 0;
  
     this.currentFileUpload = this.selectedFiles.item(0)
     this.documentoService.upload(this.currentFileUpload).subscribe(file => {
       if (file.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * file.loaded / file.total);
       } else if (file instanceof HttpResponse) {
          let doc = JSON.parse(file.body.toString());
    
          this.formGroup.controls['nome'].patchValue(doc.fileName);
          this.formGroup.controls['contentType'].patchValue(doc.contentType);
          this.formGroup.controls['tamanho'].patchValue(doc.size);
       }
     }, ex => this.toastyService.error('Erro fazendo upload do arquivo!'))
  
     this.selectedFiles = undefined

    } else {
      this.toastyService.info('Tamanho máximo permitido (2KB)');
    }  
  }

  remove() {
    this.selectedFiles = undefined;
    this.currentFileUpload = undefined;
    this.formGroup.controls['nome'].patchValue('');
  }

  save(documento: Documento) {
    if (this.isUpdate) {
      this.update(documento);
    } else {
      this.add(documento);
    }
  }
  
  add(documento: Documento) {  
    documento.isPrincipal = documento.isPrincipal === null ? false : documento.isPrincipal;
    
    this.documentoService.save(documento)
      .subscribe(documento => {
        null;
        this.formGroup.reset();
        this.currentFileUpload = undefined;
  
        this.toastyService.success('Documento salvo com sucesso!');
      },
      ex => this.toastyService.error('Erro salvando documento!'));
  }

  update(documento: Documento) {
    this.documentoService.update(documento).subscribe(documento => {
      console.log(documento);

      this.toastyService.success('Documento atualizado com sucesso!');
    },
    ex => this.toastyService.error('Erro atualizando documento!'))
  }

  hasFilename() {
    return Boolean(this.formGroup.get('nome').value);
  }

  get isUpdate() {
    return Boolean(this.formGroup.get('id').value);
  }

}
