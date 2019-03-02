<template>
  <div>
    <b-card>
      <b-row slot="header" class="align-items-end">
        <h5 class="ml-2">Compras</h5>
        <b-col class="text-right">
          <el-input
            class="mx-2"
            style="width: 200px"
            placeholder="Pesquisar"
            :data-name="'pesquisar'"
            v-model="pesquisa"
            @keyup.enter.native="carregarLista()"
          ></el-input>
          <el-button type="primary" @click.prevent="carregarLista()">Buscar</el-button>
          <el-button type="success" @click.prevent="cadastrar()">Novo</el-button>
        </b-col>
      </b-row>
      <template>
        <el-table :data="compras" ref="compras">
          <el-table-column prop="pessoa.nome" label="Pessoa"></el-table-column>
          <el-table-column prop="produto.nome" label="Produto"></el-table-column>
          <el-table-column prop="quantidade" label="Quantidade"></el-table-column>
          <el-table-column prop="valor" label="Valor"></el-table-column>
          <el-table-column width="250" label="Ações" align="center">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" @click.prevent="editar(scope.row)">Editar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </b-card>
    <el-pagination
      background
      @current-change="carregarLista"
      align="center"
      layout="prev, pager, next"
      :total="paginacao.total"
    ></el-pagination>
  </div>
</template>
<script>
import service from './service/compra.service';

export default {
  data() {
    return {
      paginacao: {
        atual: 1,
        total: undefined
      },
      pesquisa: '',
      compras: []
    };
  },
  methods: {
    async carregarLista(page = 1) {
      this.paginacao.atual = page;
      try {
        const resposta = await service.listar(page, undefined, this.pesquisa);
        this.compras = resposta.dados;
        this.paginacao.total = resposta.contagem;
      } catch (erro) {
        this.notificarErro(erro);
      } finally {
        this.pesquisa = '';
      }
    },
    editar(row) {
      this.$router.push({ name: 'editarcompra', params: { id: row.compra_id } });
    },
    cadastrar() {
      this.$router.push({ name: 'cadastrarcompra' });
    }
  },
  created() {
    this.carregarLista();
  }
};
</script>
