abstract class Nave {
  velocidad = 0

  propulsar() {
    this.aumentarVelocidad(20000)
  }

  prepararseParaViajar() {
    this.aumentarVelocidad(15000)
  }

  aumentarVelocidad(cantidad: number) {
    this.velocidad = this.velocidad + cantidad
    if (this.velocidad > 300000) { this.velocidad = 300000 }
  }

  encontrarConEnemigo() {
    this.recibirAmenaza()
    this.propulsar()
  }

  abstract recibirAmenaza(): void
}

export class NaveDeCarga extends Nave {

  carga = 0

  sobrecargada() { return this.carga > 100000 }

  excedidaDeVelocidad() { return this.velocidad > 100000 }

  recibirAmenaza() {
    this.carga = 0
  }
}

export class NaveDeResiduos extends NaveDeCarga {
  selladaAlVacio = false

  recibirAmenaza() {
    this.velocidad = 0
  }
  prepararseParaViajar() {
    super.prepararseParaViajar()
    this.selladaAlVacio = true
  }
}

export class NaveDePasajeros extends Nave {

  alarma = false
  /*readonly */ cantidadDePasajeros = 0

  tripulacion() { return this.cantidadDePasajeros + 4 }

  velocidadMaximaLegal() { return 300000 / this.tripulacion() - (this.cantidadDePasajeros > 100 ? 200 : 0) }

  estaEnPeligro() { return this.velocidad > this.velocidadMaximaLegal() || this.alarma }

  recibirAmenaza() {
    this.alarma = true
  }
}

export class NaveDeCombate extends Nave {

  modo: ModoDeCombate = reposo
  readonly mensajesEmitidos: string[] = []

  emitirMensaje(mensaje: string) {
    this.mensajesEmitidos.push(mensaje)
  }

  ultimoMensaje() { return this.mensajesEmitidos.reverse()[0] }

  estaInvisible() { return this.velocidad < 10000 && this.modo.invisible() }

  recibirAmenaza() {
    this.modo.recibirAmenaza(this)
  }

  prepararseParaViajar() {
    super.prepararseParaViajar()
    this.modo.prepararseViaje(this)
  }
  cambiarModo(nuevoModo: ModoDeCombate) {
    this.modo = nuevoModo
  }
}

interface ModoDeCombate {
  recibirAmenaza(nave: NaveDeCombate): void
  prepararseViaje(nave: NaveDeCombate): void
  invisible(): boolean
}

export const reposo = {

  invisible() { return false },

  recibirAmenaza(nave: NaveDeCombate) {
    nave.emitirMensaje("¡RETIRADA!")
  },

  prepararseViaje(nave: NaveDeCombate) {
    nave.emitirMensaje("Saliendo en mision")
    nave.cambiarModo(ataque)
  },
}

export const ataque = {

  invisible() { return true },

  recibirAmenaza(nave: NaveDeCombate) {
    nave.emitirMensaje("Enemigo encontrado")
  },

  prepararseViaje(nave: NaveDeCombate) {
    nave.emitirMensaje("Volviendo a la base")

  },
}
