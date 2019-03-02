<template>
  <b-card>
    <b-row slot="header" class="align-items-end">
      <h5 class="ml-2">{{titulo}}</h5>
    </b-row>
    <el-form
      @submit.prevent.native="isNovoCadastro ? salvar() : atualizar()"
      :model="compra"
      :rules="regras"
      ref="compra"
      label-position="top"
    >
      <b-row>
        <b-col cols="12" md="4">
          <el-form-item label="Pessoa" prop="pessoa_id">
            <el-select v-model="compra.pessoa_id" placeholder="Pessoa">
              <el-option
                v-for="pessoa in pessoas"
                :key="pessoa.pessoa_id"
                :label="pessoa.nome"
                :value="pessoa.pessoa_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </b-col>
        <b-col cols="12" md="4">
          <el-form-item label="Produto" prop="produto">
            <el-select v-model="compra.produto" placeholder="Produto">
              <el-option
                v-for="produto in produtos"
                :key="produto.produto_id"
                :label="produto.nome"
                :value="produto"
              ></el-option>
            </el-select>
          </el-form-item>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="3">
          <el-form-item label="Quantidade" prop="quantidade">
            <el-input placeholder="Quantidade" type="number" v-model="compra.quantidade"></el-input>
          </el-form-item>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12" class="my-2">
          <el-button type="primary" v-if="isNovoCadastro" @click.prevent="salvar()">Salvar</el-button>
          <el-button type="primary" v-else @click.prevent="atualizar()">Atualizar</el-button>
          <el-button @click.prevent="voltar()">Voltar</el-button>
        </b-col>
      </b-row>
    </el-form>
  </b-card>
</template>
<script>
import service from './service/compra.service';
import servicePessoa from '../pessoa/service/pessoa.service';
import serviceProdutos from '../produto/service/produto.service';

export default {
  data() {
    return {
      compra: {},
      pessoas: [],
      produtos: [],
      regras: {
        pessoa_id: [
          {
            required: true,
            message: 'Pessoa Obrigatorio',
            trigger: 'blur'
          }
        ],
        quantidade: [
          {
            required: true,
            message: 'Quantidade Obrigatoria',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    titulo() {
      return this.$route.params.id ? 'Atualizar Compra' : 'Nova Compra';
    },
    isNovoCadastro() {
      return this.$route.params.id === undefined;
    }
  },
  methods: {
    voltar() {
      this.$router.push({ name: 'compras' });
    },
    async salvar() {
      this.$refs.compra.validate(async (valida) => {
        const objecto = {
          valor: this.compra.quantidade * this.compra.produto.valor,
          pessoa_id: this.compra.pessoa_id,
          produto_id: this.compra.produto.produto_id,
          quantidade: this.compra.quantidade
        };
        if (valida) {
          try {
            await service.salvar(objecto);
            this.$notify({
              title: 'Sucesso',
              message: 'COmpra gravada com sucesso',
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
      this.$refs.compra.validate(async (valida) => {
        const objecto = {
          valor: this.compra.quantidade * this.compra.produto.valor,
          pessoa_id: this.compra.pessoa_id,
          produto_id: this.compra.produto.produto_id,
          quantidade: this.compra.quantidade
        };
        if (valida) {
          try {
            await service.editar(this.$route.params.id, objecto);
            this.voltar();
            this.$notify({
              title: 'Sucesso',
              message: 'Compra atualizada com sucesso',
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
    const resposta1 = await servicePessoa.listar(undefined, undefined, undefined);
    this.pessoas = resposta1.dados;
    console.log('PESSOAS', this.pessoas);
    const resposta = await serviceProdutos.listar(undefined, undefined, undefined);
    this.produtos = resposta.dados;
    if (this.$route.params.id) {
      try {
        this.compra = await service.obter(this.$route.params.id);
      } catch (erro) {
        this.voltar();
      }
    }
  }
};
</script>
