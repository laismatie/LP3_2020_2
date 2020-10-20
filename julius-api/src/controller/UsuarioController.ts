import { Lancamento } from './../entity/Lancamento';
import { getManager, MoreThanOrEqual, LessThan } from 'typeorm';
import { Usuario } from './../entity/Usuario';

export class UsuarioController {
     async salvar(usuario: Usuario) {
        const usuarioSalvo = await getManager().save(usuario);
        return usuarioSalvo;
     }

     async recuperarTodos() {
         const usuarios= await getManager().find(Usuario);
         return usuarios;
     }

     async recuperarPorId(idUsuario: number) {
         const usuario= await getManager().findOne(Usuario, idUsuario);
         return usuario;
     }

     async recuperarLancamentosDoUsuario(idUsuario: number) {
        const usuario = await getManager().findOne(Usuario, idUsuario, {
            relations: ['lancamentos']
        });
        return usuario.lancamentos;
     }

     async recuperarLancamentosEntradasPositivas(idUsuario: number) {
        const lancamentos = await getManager().find(Lancamento, {
            where: {
                usuario: idUsuario,
                valor: MoreThanOrEqual(0)
            },
        });
        return lancamentos;
     }
     async recuperarLancamentosEntradasNegativas(idUsuario: number) {
        const lancamentos = await getManager().find(Lancamento, {
            where: {
                usuario: idUsuario,
                valor: LessThan(0)
            },
        });
        return lancamentos;
     }


}