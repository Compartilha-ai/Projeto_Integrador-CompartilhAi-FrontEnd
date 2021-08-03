import { Produto } from "./Produto"

export class User{
  public id: number
  public nomeCompleto: string
  public email: string
  public senha: string
  public dataNascimento: Date
  public foto: string
  public tipo: string
  public produto: Produto[]
}
