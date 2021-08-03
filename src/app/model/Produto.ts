import { User } from "./User"
import { Categoria } from "./Categoria"

export class Produto{
  public id: number
  public nome: string
  public descricao: string
  public preco: number
  public multimidia: string
  public curtidas: number
  public categoria: Categoria
  public usuario: User
}
