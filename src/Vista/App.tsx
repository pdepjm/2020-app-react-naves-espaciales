import logo from './img/logo.svg'
import carpi from './img/carpi.png'
import './App.css'
import { NaveDeCarga, NaveDeResiduos, NaveDePasajeros, NaveDeCombate } from '../Dominio/naves'
import Nave from './Nave'
import React from 'react'

export const naves = [new NaveDeCarga(), new NaveDeCarga(), new NaveDeResiduos(), new NaveDePasajeros(15), new NaveDePasajeros(20), new NaveDeCombate()]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Naves Espaciales</h1>
        <p><code>con ReactJS</code> <a target="blank" href="https://reactjs.org/"><img src={logo} className="App-logo" alt="logo" /></a></p>
        <img src={carpi} className="Carpincho" alt="logo" />
      </header>
      {naves.map((unaNave, i) => <Nave key={i} nave={unaNave} />)}
    </div>
  )
}

export default App
