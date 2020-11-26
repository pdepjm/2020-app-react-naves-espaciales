import { NaveDeCarga, NaveDeResiduos, NaveDePasajeros, NaveDeCombate } from '../Dominio/naves'
import { MouseEvent, useState } from 'react'
import { naves } from './App'
import './Nave.css'
import React from 'react'
import imgNaveDeCarga from './img/NaveDeCarga.png'
import imgNaveDePasajeros from './img/NaveDePasajeros.png'
import imgNaveDeResiduos from './img/NaveDeResiduos.png'
import imgNaveDeCombate from './img/NaveDeCombate.png'


type NaveTypes = typeof naves[0]
type NaveProps = { nave: NaveTypes }

function ComponenteNave(props: NaveProps) {
  const [{ nave }, setNave] = useState(props)

  return (
    <div className="Nave">
      <div className="Nave-Seccion">
        <Avatar nave={nave} />
      </div>

      <div className="Nave-Seccion">
        <Atributos nave={nave} />
      </div>

      <div className="Nave-Seccion">
        <Acciones nave={nave} setNave={setNave} />
      </div>
    </div>
  )
}

export default ComponenteNave

function Avatar({ nave }: NaveProps) {
  const imagenes = [ imgNaveDeCarga, imgNaveDePasajeros, imgNaveDeResiduos, imgNaveDeCombate ]
  return (<>
    <img src={imagenes.find( src => src.indexOf(nave.constructor.name) >=0 )} />
    <p>Tipo: {nave.constructor.name}</p>
  </>)
}


function Atributos({ nave }: NaveProps) {
  return (
    <div className="Atributos">
      <label>{nave.velocidad} km/seg</label>

      {(nave instanceof NaveDeCarga)
        ? <label>{nave.carga} kg</label>
        : null
      }

      {(nave instanceof NaveDeResiduos)
        ? <label>{nave.selladaAlVacio ? '' : 'No'} Sellada</label>
        : null
      }

      {(nave instanceof NaveDePasajeros)
        ? <label>Alarma {nave.alarma ? 'activada' : 'desactivada'}</label>
        : null
      }

      {(nave instanceof NaveDeCombate)
        ? <label>Último mensaje: {nave.ultimoMensaje()}</label>
        : null
      }
    </div>)
}

type AccionesNaveProps = { setNave: (naveProps: NaveProps) => void } & NaveProps

function Acciones({ nave, setNave }: AccionesNaveProps) {

  const propulsar = (event: MouseEvent) => {
    event.preventDefault() //TODO: Abstraer
    nave.propulsar()
    setNave({ nave }) //TODO: Abstraer
  }

  const prepararParaViajar = (event: MouseEvent) => {
    event.preventDefault() //TODO: Abstraer
    nave.prepararseParaViajar()
    setNave({ nave }) //TODO: Abstraer
  }

  const encontrarConEnemigo = (event: MouseEvent) => {
    event.preventDefault() //TODO: Abstraer
    nave.encontrarConEnemigo()
    setNave({ nave }) //TODO: Abstraer
  }

  return (
    <div className="Acciones">
      <button onClick={propulsar}>
        Propulsar
    </button>

      <button onClick={prepararParaViajar}>
        Preparar para viajar
    </button>

      <button onClick={encontrarConEnemigo}>
        Encontrarse con enemigo
    </button>
    </div>)
}