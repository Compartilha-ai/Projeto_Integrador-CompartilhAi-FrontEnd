import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  tipoMensagem: string

  meuFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertas: AlertasService
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
    window.scroll(0,0)
  }

  tipoMessage(event: any) {
    this.tipoMensagem = event.target.value
  }

  public sendEmail(e: Event) {
    emailjs.sendForm('service_afwva5f', 'template_zzcxp5a', e.target as HTMLFormElement, 'user_nvCsIMv98MavivEFJDtyi')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text)
        this.alertas.showAlertSuccess('Mensagem enviada com sucesso!')
      }, (error) => {
        console.log(error.text)
        this.alertas.showAlertDanger('Formulário inválido')
      });
  }

}
