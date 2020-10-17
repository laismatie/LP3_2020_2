import { Lancamento } from './../entity/Lancamento';
import { UsuarioController } from './../controller/UsuarioController';
import { LancamentoController } from './../controller/LancamentoController';
import { Router } from 'express';

export const routerLancamento = Router();
const lancamentoCtrl = new LancamentoController();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo lançamento
 */
routerLancamento.post('/', async(req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    if (usuario) {
        const lancamento = new Lancamento(valor, descricao, data, usuario);
        const lancamentoSalvo = await lancamentoCtrl.salvar(lancamento);
        res.json(lancamentoSalvo);
    } else {
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
    }
});

/**
 * Serviço para alteração do lançamento
 */
routerLancamento.put('/:id', async(req, res) => {
    const idLancamento = parseInt(req.params.id);
    const { valor, descricao, data, idUsuario } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    const lancamento =  new Lancamento(valor, descricao, data, usuario);
    lancamento.id = idLancamento
    await lancamentoCtrl.alterarLancamento(idLancamento, lancamento);

    if(lancamento){
        res.status(200).json({ mensagem: 'Lançamento atualizado com sucesso' });
    }else{
        res.status(404).json({ mensagem: 'Lançamento não encontrado' });
    }
});

/**
 * Serviço para excluir um lançamento
 */
routerLancamento.delete('/:id', async (req, res) => {
    const idLancamento = parseInt(req.params.id);
    const lancamento = await lancamentoCtrl.deletarLancamento(idLancamento);
    if(lancamento){
        res.status(204).json({ mensagem: 'Lançamento excluído com sucesso.' });
    }else{
        res.status(404).json({ mensagem: 'Lançamento não encontrado' });
    }
   
});

/**
 * Serviço para recuperar todos os lançamentos
 */
routerLancamento.get('/', async (req, res) => {
    const lancamentos= await lancamentoCtrl.recuperarTodos();
    res.json(lancamentos);
});