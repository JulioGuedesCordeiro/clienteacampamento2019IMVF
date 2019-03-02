/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './src/components/Home.vue';
import Pessoa from './src/components/pessoa/Pessoa.vue';
import CadastrarPessoa from './src/components/pessoa/Cadastrar-Pessoa.vue';
import Compras from './src/components/compras/Listar-Compras.vue';
import CadastrarCompras from './src/components/compras/Cadastrar-Compras.vue';
import CadastrarProduto from './src/components/produto/Cadastrar-Produto.vue';
import Produto from './src/components/produto/Produto.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/pessoa',
          name: 'pessoa',
          component: Pessoa,
        },
        {
          path: '/pessoa/cadastrar',
          name: 'cadastrarpessoa',
          component: CadastrarPessoa,
        },
        {
          path: '/pessoa/editar/:id',
          name: 'editarpessoa',
          component: CadastrarPessoa,
        },
        {
          path: '/compras',
          name: 'compras',
          component: Compras,
        },
        {
          path: '/compras/cadastrar',
          name: 'cadastrarcompra',
          component: CadastrarCompras,
        },
        {
          path: '/compras/editar/:id',
          name: 'editarcompra',
          component: CadastrarCompras,
        },
        {
          path: '/produto',
          name: 'produto',
          component: Produto,
        },
        {
          path: '/produto/cadastrar',
          name: 'cadastrarproduto',
          component: CadastrarProduto,
        },
        {
          path: '/produto/editar/:id',
          name: 'editarproduto',
          component: CadastrarProduto,
        },
      ],
    },
  ]
});

