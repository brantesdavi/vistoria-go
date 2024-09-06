import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
const IMG_DIR = "stored-image"

interface LocalFile{
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cadastroForm: FormGroup;
  photo: any;
  dadosJSON: string | null = null;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: [''],
      cnh: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      selfie: ['', Validators.required],
    });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl
    });
    this.photo = image;
    this.cadastroForm.patchValue({ selfie: image.dataUrl });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;
      this.dadosJSON = JSON.stringify(formData, null, 2);
      console.log('Dados cadastrados:', formData);
    }
  }

  exibirDadosJSON() {
    alert(this.dadosJSON);
  }
}
