import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  tipoMensagem: string

  meuFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.meuFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      contato: ['', Validators.required],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    })
   }

  ngOnInit() {
  }

  tipoMessage(event: any) {
    this.tipoMensagem = event.target.value
  }

  public sendEmail(e: Event) {
    emailjs.sendForm('service_afwva5f', 'template_zzcxp5a', e.target as HTMLFormElement, 'user_nvCsIMv98MavivEFJDtyi')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text)
        alert('Mensagem enviada com sucesso!')
      }, (error) => {
        console.log(error.text)
        alert('Formulário inválido')
      });
  }
  
}
