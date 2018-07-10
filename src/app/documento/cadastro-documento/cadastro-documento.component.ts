import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documento } from '../../core/model';
import { DocumentoService } from '../documento.service';

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
    private documentoService: DocumentoService
  ) { }

  ngOnInit() {
    this.configure();
  }

  configure() {
    this.formGroup = this.formBuilder.group({
      descricao: this.formBuilder.control('', Validators.required),
      nome: [],
      contentType: [],
      tamanho: [],
      isPrincipal: []
    });
  }

  inputFileChange(event) {
   this.selectedFiles = event.target.files;

   this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0)
    this.documentoService.upload(this.currentFileUpload).subscribe(file => {
      if (file.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * file.loaded / file.total);
      } else if (file instanceof HttpResponse) {
        let doc = JSON.parse(file.body.toString());
        console.log(doc);
      }
    }, e => console.log(e))

    this.selectedFiles = undefined
   
  }

  save(documento: Documento) {
    documento.isPrincipal = documento.isPrincipal === null ? false : documento.isPrincipal;
    console.log(documento)
  }

}
