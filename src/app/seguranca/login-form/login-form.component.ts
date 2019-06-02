import { Router } from '@angular/router';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  ngOnInit(): void {
    this.title.setTitle('Login BlueEconomic');
  }

  constructor(private auth: AuthService,
    private title: Title,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
    .then(() =>{
      this.router.navigate(['/lancamentos']);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

}
