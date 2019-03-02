<template>
  <b-card>
    <b-row slot="header" class="align-items-end">
      <h5 class="ml-2">{{titulo}}</h5>
    </b-row>
    <el-form
      @submit.prevent.native="isNovoCadastro ? salvar() : atualizar()"
      :model="produto"
      :rules="regras"
      ref="produto"
      label-position="top"
    >
      <b-row>
        <b-col cols="12" md="12">
          <el-form-item label="Nome do Produto" prop="nome">
            <el-input placeholder="Nome do produto" v-model="produto.nome"></el-input>
          </el-form-item>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12">
          <el-form-item label="Valor" prop="valor">
            <el-input placeholder="Valor" type="number" v-model="produto.valor"></el-input>
          </el-form-item>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="12">
          <el-button type="primary" v-if="isNovoCadastro" @click.prevent="salvar()">Salvar</el-button>
          <el-button type="primary" v-else @click.prevent="atualizar()">Atualizar</el-button>
          <el-button @click.prevent="voltar()">Voltar</el-button>
        </b-col>
      </b-row>
    </el-form>
  </b-card>
</template>
<script>
import produtoService from './service/produto.service';

export default {
  data() {
    return {
      produto: {},
      regras: {
        nome: [
          {
            required: true,
            message: 'Nome Obrigatorio',
            trigger: 'blur'
          }
        ],
        valor: [
          {
            required: true,
            message: 'Valor obrigatorio',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    titulo() {
      return this.$route.params.id ? 'Atualizar Produto' : 'Novo Produto';
    },
    isNovoCadastro() {
      return this.$route.params.id === undefined;
    }
  },
  methods: {
    voltar() {
      this.$router.push({ name: 'produto' });
    },
    async salvar() {
      this.$refs.produto.validate(async (valida) => {
        if (valida) {
          try {
            await produtoService.salvar(this.produto);
            this.$notify({
              title: 'Sucesso',
              message: 'Produto gravado com sucesso',
              type: 'success'
            });
            this.voltar();
          } catch (erro) {
            this.$notify({
              title: 'Erro',
              message: 'Algo deu errado',
              type: 'warning'
            });
          }
        } else {
          return false;
        }
      });
    },
    async atualizar() {
      this.$refs.produto.validate(async (valida) => {
        if (valida) {
          try {
            await produtoService.editar(this.$route.params.id, this.produto);
            this.voltar();
            this.$notify({
              title: 'Sucesso',
              message: 'Produto atualizada com sucesso',
              type: 'success'
            });
          } catch (erro) {
            this.$notify({
              title: 'Erro',
              message: 'Algo deu errado',
              type: 'warning'
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  async created() {
    if (this.$route.params.id) {
      try {
        this.produto = await produtoService.obter(this.$route.params.id);
      } catch (erro) {
        this.voltar();
      }
    }
  }
};
</script>
