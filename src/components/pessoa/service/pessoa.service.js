import axios from 'axios';
import { endpoint } from '../../../../env';

const ENDPOINT = `${endpoint.BASE}/pessoa`;

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

const salvar = async pessoa => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.post(`${ENDPOINT}`, pessoa);
    resolve(resposta);
  } catch (erro) {
    reject(erro);
  }
});

const editar = async (id, pessoa) => new Promise(async (resolve, reject) => {
  try {
    const resposta = await axios.put(`${ENDPOINT}/${id}`, pessoa);
    resolve(resposta);
  } catch (erro) {
    reject(erro);
  }
});

export default {
  listar,
  salvar,
  editar,
  obter
};
