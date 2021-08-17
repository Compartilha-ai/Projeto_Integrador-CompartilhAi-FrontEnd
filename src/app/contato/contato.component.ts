import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  tipoMensagem: string

  constructor() { }

  ngOnInit() {
  }

  tipoMessage(event: any) {
    this.tipoMensagem = event.target.value
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_afwva5f', 'template_zzcxp5a', e.target as HTMLFormElement, 'user_nvCsIMv98MavivEFJDtyi')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text)
        alert('Mensagem enviada com sucesso!')
      }, (error) => {
        console.log(error.text);
      });
  }
  
}
