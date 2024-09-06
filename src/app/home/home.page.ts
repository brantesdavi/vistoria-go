import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome: string = '';
  cpf: string = '';
  rg: string = '';
  telefone: string = '';
  endereco: string = '';
  cnh: string = '';
  photo: string = '';
  login: string = '';
  senha: string = '';

  constructor() {}

  cadastrar() {
    const vistoriador = {
      nome: this.nome,
      // ... outros campos
    };
  
    localStorage.setItem('vistoriador', JSON.stringify(vistoriador));
    console.log('Dados salvos:', vistoriador);
  }

}
