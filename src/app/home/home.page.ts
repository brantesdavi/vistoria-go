import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cadastroForm: FormGroup;
  photo: any;
  dadosJSON: string | null = null;

  readonly cpfMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };

  readonly rgMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/],
  };

  readonly telefoneMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cnhMask: MaskitoOptions = {
    mask: Array(11).fill(/\d/),
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

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
    console.log(this.photo)

  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;
      console.log('Selfie dataUrl:', formData.selfie);  // Exibe o valor da selfie
      this.dadosJSON = JSON.stringify(formData, null, 2);
      console.log('Dados cadastrados:', formData);
    }
  }
  

  exibirDadosJSON() {
    alert(this.dadosJSON);
  }
}
