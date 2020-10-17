import { Lancamento } from './../entity/Lancamento';
import { getManager } from 'typeorm';

export class LancamentoController {

    async salvar(lancamento: Lancamento) {
        const lancamentoSalvo = await getManager().save(lancamento);
        return lancamentoSalvo;
    }
    
    async recuperarPorId(id: number) {
        const lancamento = await getManager().findOne(Lancamento, id);
        return lancamento;
    }
    
    async recuperarTodos() {
        const lancamentos = await getManager().find(Lancamento);
        return lancamentos;
    }

    async deletarLancamento(id: number){
        let lancamento = await getManager().findOne(Lancamento, id);
        if(lancamento) {
            await getManager().delete(Lancamento,id);
            return true;
        }
        return false;
    }

    async alterarLancamento(id:number, lancamento: Lancamento) {
        let novoLancamento = await getManager().findOne(Lancamento,id);
        if(novoLancamento) {
            await getManager().save(lancamento);
            return true;
        };
        return false;
    }
}