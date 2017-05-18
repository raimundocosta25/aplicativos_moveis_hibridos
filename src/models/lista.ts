import { Ponto } from './ponto';
import { Usuario } from './usuario';

export class Lista{
  ponto:Ponto = new Ponto();
  usuarios:Array<Usuario> = new Array<Usuario>();
}
