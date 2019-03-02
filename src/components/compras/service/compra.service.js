import axios from 'axios';
import { endpoint } from '../../../../env';

const ENDPOINT = `${endpoint.BASE}/compras`;

const listar = async (page = '', size = '', pesquisa = '') => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.get(`${ENDPOINT}/?page=${page}&size=${size}&pesquisa=${pesquisa}`);
    let contagem;
    if (resposta.data.pagination) {
      contagem = resposta.data.pagination.rowCount;
    }
    resolve({ dados: resposta.data.data, contagem });
  } catch (erro) {
    reject(erro);
  }
});


const obter = async id => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.get(`${ENDPOINT}/${id}`);
    resolve(resposta.data);
  } catch (erro) {
    reject(erro);
  }
});

const saldo = async id => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.get(`${ENDPOINT}/pessoa/${id}`);
    resolve(resposta.data);
  } catch (erro) {
    reject(erro);
  }
});

const listarcompras = async id => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.get(`${ENDPOINT}/pessoa/compras/${id}`);
    resolve(resposta.data);
  } catch (erro) {
    reject(erro);
  }
});

const salvar = async compra => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.post(`${ENDPOINT}`, compra);
    resolve(resposta);
  } catch (erro) {
    reject(erro);
  }
});

const editar = async (id, compra) => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.put(`${ENDPOINT}/${id}`, compra);
    resolve(resposta);
  } catch (erro) {
    reject(erro);
  }
});

export default {
  listar,
  salvar,
  editar,
  obter,
  saldo,
  listarcompras,
};
