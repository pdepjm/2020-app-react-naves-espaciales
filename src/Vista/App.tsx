import logo from './logo.svg';
import './App.css';
import { NaveDeCarga, NaveDeResiduos, NaveDePasajeros, NaveDeCombate } from '../Dominio/naves';
import Nave from './Nave';

export const naves = [new NaveDeCarga(), new NaveDeResiduos(), new NaveDePasajeros(15), new NaveDeCombate()]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {naves.map((unaNave, i) => <Nave key={i} nave={unaNave} />)}
    </div>
  );
}

export default App;
