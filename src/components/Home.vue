<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Pessoa">
          <b-dropdown-item :to="{ name: 'pessoa' }" >
            Pessoa
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'cadastrarpessoa' }">
            Cadastrar Pessoas
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Compras">
          <b-dropdown-item :to="{ name: 'compras' }" >
            Compras
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'cadastrarcompra' }">
            Cadastrar Compras
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Produtos">
          <b-dropdown-item :to="{ name: 'produto' }" >
            Produtos
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'cadastrarproduto' }">
            Cadastrar Produtos
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
</style>

