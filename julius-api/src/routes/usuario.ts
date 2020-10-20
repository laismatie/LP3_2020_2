import { Usuario } from './../entity/Usuario';
import { UsuarioController } from './../controller/UsuarioController';
import { Router } from 'express';

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo usuário
 */
routerUsuario.post('/', async (req, res) => {
    const {nome, email} = req.body;
    const usuario = new Usuario(nome, email);
    const usuarioSalvo = await usuarioCtrl.salvar(usuario);
    res.json(usuarioSalvo);
});    

/**
 * Serviço para recuperar todos os usuários
 */
routerUsuario.get('/', async (req, res) => {
    const usuarios= await usuarioCtrl.recuperarTodos();
    res.json(usuarios);
});

/**
 * Serviço para recuperar os lançamentos de um usuário
 */
routerUsuario.get('/lancamentos/:idUsuario', async(req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosDoUsuario(idUsuario);
    res.json(lancamentos);
});

/**
 * Serviço para retornar os ganhos
 */
routerUsuario.get('/lancamentos/entradas/:idUsuario', async(req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosEntradasPositivas(idUsuario);
    res.json(lancamentos);
});

/**
 * Serviço para retornar os gastos
 */
routerUsuario.get('/lancamentos/gastos/:idUsuario', async(req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosEntradasNegativas(idUsuario);
    res.json(lancamentos);
});


