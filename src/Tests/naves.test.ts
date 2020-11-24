import { NaveDeCarga, NaveDeResiduos, NaveDePasajeros, NaveDeCombate, ataque } from '../Dominio/naves'

describe("Nave de carga", () => {
  let naveVacia: NaveDeCarga
  let naveLlena: NaveDeCarga

  beforeEach(() => {
    naveVacia = new NaveDeCarga()
    naveLlena = new NaveDeCarga()
    // Puedo cambiar los atributos desde afuera
    naveLlena.carga = 500000
    naveLlena.velocidad = 290000
  })

  test("sobrecargada", () => {
    expect(naveLlena.sobrecargada()).toBeTruthy()
  })

  test("no sobrecargada", () => {
    expect(naveVacia.sobrecargada()).toBeFalsy()
  })

  test("excedida de velocidad", () => {
    expect(naveLlena.excedidaDeVelocidad()).toBeTruthy()
  })

  test("no excedida de velocidad", () => {
    expect(naveVacia.excedidaDeVelocidad()).toBeFalsy()
  })

  test("recibir amenaza", () => {
    naveLlena.recibirAmenaza()
    expect(naveVacia.carga).toBe(0)
  })

  test("propulsar nave de carga sin velocidad", () => {
    naveVacia.propulsar()
    expect(naveVacia.velocidad).toBe(20000)
  })
})

describe("Nave de carga de residuos", () => {

  let naveVacia: NaveDeResiduos
  let naveLlena: NaveDeResiduos

  beforeEach(() => {
    naveVacia = new NaveDeResiduos()
    naveLlena = new NaveDeResiduos()
    naveLlena.carga = 5000
    naveLlena.velocidad = 10000
  })

  test("recibe amenaza", () => {
    naveLlena.recibirAmenaza()
    expect(naveLlena.velocidad).toBe(0)
    expect(naveLlena.carga).toBe(5000)
  })

  test("Una nave de residuos radiactivos sin velocidad y que no está sellada al prepararse para viajar queda con velocidad de 15.000 kms/seg y sellada al vacío", () => {
    naveVacia.prepararseParaViajar()
    expect(naveVacia.velocidad).toBe(15000)
    expect(naveVacia.selladaAlVacio).toBeTruthy()
  })
})

describe("Nave de pasajeros", () => {
  let naveSinPasajeros: NaveDePasajeros
  let naveConPasajeros: NaveDePasajeros

  beforeEach(() => {
    naveSinPasajeros = new NaveDePasajeros()
    naveConPasajeros = new NaveDePasajeros()
    naveConPasajeros.cantidadDePasajeros = 296
    naveConPasajeros.velocidad = 290000
  })

  test("velocidad maxima sin pasajeros", () => {
    expect(naveSinPasajeros.velocidadMaximaLegal()).toBe(75000)
  })

  test("velocidad maxima con pasajeros", () => {
    expect(naveConPasajeros.velocidadMaximaLegal()).toBe(1000 - 200)
  })

  test("esta en peligro", () => {
    expect(naveConPasajeros.estaEnPeligro()).toBeTruthy()
  })

  test("no esta en peligro", () => {
    expect(naveSinPasajeros.estaEnPeligro()).toBeFalsy()
  })

  test("recibir amenaza", () => {
    naveSinPasajeros.recibirAmenaza()
    expect(naveSinPasajeros.alarma).toBeTruthy()
  })

  test("nave de pasajeros q viaja a 290000 queda en 300000", () => {
    naveConPasajeros.propulsar()
    expect(naveConPasajeros.velocidad).toBe(300000)
  })

  test("Una nave de pasajeros que viaja a 290.000 kms/seg al prepararse para viajar queda con velocidad de 300.000 kms/seg", () => {
    naveConPasajeros.prepararseParaViajar()
    expect(naveConPasajeros.velocidad).toBe(300000)
  })

  test("una nave de pasajeros sin velocidad al encontrarse con un enemigo queda con velocidad de 20.000 kms/seg y su alarma en caso de emergencia activada", () => {
    naveSinPasajeros.encontrarConEnemigo()
    expect(naveSinPasajeros.velocidad).toBe(20000)
    expect(naveSinPasajeros.alarma).toBeTruthy()
  })
})

describe("Nave de combate", () => {

  let naveEnReposo: NaveDeCombate
  let naveEnAtaque: NaveDeCombate

  beforeEach(() => {
    naveEnReposo = new NaveDeCombate()
    naveEnAtaque = new NaveDeCombate()
    naveEnAtaque.modo = ataque
  })

  test("no esta invisible en reposo", () => {
    expect(naveEnReposo.estaInvisible()).toBeFalsy()
  })

  test("esta invisible en ataque", () => {
    expect(naveEnAtaque.estaInvisible()).toBeTruthy()
  })

  test("no esta invisible en ataque", () => {
    naveEnAtaque.velocidad = 20000
    expect(naveEnAtaque.estaInvisible()).toBeFalsy()
  })

  test("recibir amenaza en reposo", () => {
    naveEnReposo.recibirAmenaza()
    expect(naveEnReposo.ultimoMensaje()).toBe("¡RETIRADA!")
  })

  test("recibir amenaza en ataque", () => {
    naveEnAtaque.recibirAmenaza()
    expect(naveEnAtaque.ultimoMensaje()).toBe("Enemigo encontrado")
  })

  test("Una nave de combate en modo ataque sin velocidad al prepararse para viajar emite el mensaje Volviendo a la base y queda con velocidad de 15.000 kms/seg", () => {
    naveEnAtaque.prepararseParaViajar()
    expect(naveEnAtaque.velocidad).toBe(15000)
    expect(naveEnAtaque.ultimoMensaje()).toBe("Volviendo a la base")
  })

  test("Una nave de combate en modo reposo sin velocidad al prepararse para viajar emite el mensaje Saliendo en mision, queda en modo ataque y con velocidad de 15.000 kms/seg", () => {
    naveEnReposo.prepararseParaViajar()
    expect(naveEnReposo.velocidad).toBe(15000)
    expect(naveEnReposo.ultimoMensaje()).toBe("Saliendo en mision")
  })
})