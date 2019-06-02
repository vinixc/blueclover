import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoasService } from 'app/pessoas/pessoas.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos= [
    {label: 'Receita', value:'RECEITA'},
    {label: 'Despesa', value:'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoasService: PessoasService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo Lançamentos');


    const codigolancamento = this.route.snapshot.params['codigo'];

    if(codigolancamento){
      this.carregarLancamento(codigolancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando(){
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizarLancamento(form);
    }else{
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl){
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.toasty.success('Lançamento adicionado com sucesso!');

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl){
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;

      this.toasty.success('Lançamento alterado com sucesso!');
      this.atualizarTituloEdicao();

      this.router.navigate(['/lancamentos', lancamento.codigo]);

    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  carregarCategorias(){
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
    return this.pessoasService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map( p => ({ label: p.nome, value: p.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl){
    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);


    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
