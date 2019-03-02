<template>
  <b-card>
    <b-row slot="header" class="align-items-end">
      <h5 class="ml-2">{{titulo}}</h5>
    </b-row>
    <el-form
      @submit.prevent.native="isNovoCadastro ? salvar() : atualizar()"
      :model="pessoa"
      :rules="regras"
      ref="pessoa"
      label-position="top"
    >
      <h1>Valor devido: {{devido}}</h1>
      <b-row>
        <b-col cols="12" md="12">
          <el-form-item prop="pagou">
            <el-checkbox v-model="pessoa.pagou">Pagou?</el-checkbox>
          </el-form-item>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12">
          <el-form-item label="Nome" prop="nome">
            <el-input placeholder="Nome do pessoa" v-model="pessoa.nome"></el-input>
          </el-form-item>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12">
          <el-form-item label="Senha" prop="senha">
            <el-input placeholder="Senha" type="password" v-model="pessoa.senha"></el-input>
          </el-form-item>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="12">
          <el-button type="primary" v-if="isNovoCadastro" @click.prevent="verifica()">Salvar</el-button>
          <el-button type="primary" v-else @click.prevent="verifica()">Atualizar</el-button>
          <el-button @click.prevent="voltar()">Voltar</el-button>
        </b-col>
      </b-row>
    </el-form>

    <template>
      <el-table class="my-5" :data="compras" ref="compras">
        <el-table-column prop="produto.nome" label="Produto"></el-table-column>
        <el-table-column prop="quantidade" label="Quantidade"></el-table-column>
        <el-table-column prop="valor" label="Valor da Compra"></el-table-column>
      </el-table>
    </template>
  </b-card>
</template>
<script>
import pessoasService from './service/pessoa.service';
import comprasService from '../compras/service/compra.service';

export default {
  data() {
    return {
      pessoa: {},
      compras: [],
      devido: '',
      regras: {
        nome: [
          {
            required: true,
            message: 'Nome Obrigatorio',
            trigger: 'blur'
          }
        ],
        senha: [
          {
            required: true,
            message: 'Senha Obrigatoria',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    titulo() {
      return this.$route.params.id ? 'Atualizar Pessoa' : 'Nova Pessoa';
    },
    isNovoCadastro() {
      return this.$route.params.id === undefined;
    }
  },
  methods: {
    voltar() {
      this.$router.push({ name: 'pessoa' });
    },
    async verifica() {
      if (this.pessoa.pagou === true) {
        this.$prompt('Adicione a senha de administrador', 'Senha', {
          confirmButtonText: 'Salvar',
          cancelButtonText: 'Canclear'
        })
          .then((valor) => {
            if (valor.value === 'acampp2019') {
              this.salvar();
            } else {
              this.$message({
                type: 'info',
                message: 'Senha incorreta'
              });
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: 'Cancelado'
            });
          });
      } else if (this.pessoa.pagou === false || this.pessoa.pagou === undefined) {
        if (this.$route.params.id !== 0) {
          this.atualizar();
        } else {
          this.salvar();
        }
      }
    },
    async salvar() {
      this.$refs.pessoa.validate(async (valida) => {
        if (valida) {
          try {
            await pessoasService.salvar(this.pessoa);
            this.$notify({
              title: 'Sucesso',
              message: 'Pessoa gravada com sucesso',
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
      this.$refs.pessoa.validate(async (valida) => {
        if (valida) {
          try {
            await pessoasService.editar(this.$route.params.id, this.pessoa);
            this.voltar();
            this.$notify({
              title: 'Sucesso',
              message: 'Pessoa atualizada com sucesso',
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
        this.pessoa = await pessoasService.obter(this.$route.params.id);
        this.compras = await comprasService.listarcompras(this.$route.params.id);
        const resposta = await comprasService.saldo(this.$route.params.id);
        const teste1 = JSON.stringify(resposta[0]);
        const teste2 = teste1.replace('sum(`valor', '');
        const teste3 = teste2.replace('{"`)":', '');
        this.devido = teste3.replace('}', '');
        if (this.pessoa.pagou === 1) {
          this.$set(this.pessoa, 'pagou', true);
        } else {
          this.$set(this.pessoa, 'pagou', false);
        }
      } catch (erro) {
        this.voltar();
      }
    }
  }
};
</script>
