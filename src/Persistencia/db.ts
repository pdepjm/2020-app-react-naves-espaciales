import { Nave, NaveDeCarga, NaveDeResiduos, NaveDePasajeros, NaveDeCombate } from '../Dominio/naves'

const NAVES = 'NAVES'

type NaveData = Partial<Nave> & { tipo: TipoNave}
type TipoNave = 'NaveDeCarga' | 'NaveDeResiduos' | 'NaveDePasajeros' | 'NaveDeCombate'

const serializarNave = (nave: Nave) => ({tipo: nave.constructor.name, ...nave})

const crearNaveBase = (tipo: TipoNave) => {
  switch (tipo) {
    case 'NaveDeCarga': return new NaveDeCarga()
    case 'NaveDeResiduos': return new NaveDeResiduos()
    case 'NaveDePasajeros': return new NaveDePasajeros()
    case 'NaveDeCombate': return new NaveDeCombate()
  }
}

const crearNave = ({tipo, ...data}: NaveData) => Object.assign(crearNaveBase(tipo), data)

const db = {
  guardarNaves(naves: Nave[]) {
    const data = naves.map(serializarNave)
    localStorage.setItem(NAVES, JSON.stringify(data))
  },

  cargarNaves() : Nave[] | undefined {
    const data = localStorage.getItem(NAVES)
    if (!data) return undefined
    return JSON.parse(data).map(crearNave)
  },

  borrarTodo() {
    localStorage.removeItem(NAVES)
  }
}

export default db