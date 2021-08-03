import { Produto } from "./Produto"

export class Categoria{
  public id: number
  public nome: string
  public descricao: string
  public palavraChave: string
  public produto: Produto[]
}
