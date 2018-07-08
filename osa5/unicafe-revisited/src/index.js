import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'; 
import counterReducer from './reducer';

const store = createStore(counterReducer);

const Statistiikka = ({ onZero }) => {

  const state = store.getState();

  const palautteita = state.good + state.ok + state.bad;

  if (palautteita === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>Ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>Hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>Neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>Huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>Keskiarvo</td>
            <td>{((state.good * 1) + (state.bad * -1)) / palautteita}</td>
          </tr>
          <tr>
            <td>Hyviä</td>
            <td>{`${state.good / (palautteita)} %`}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={onZero}>nollaa tilasto</button>
    </div >
  )
}


class App extends React.Component {
  klik = (nappi) => {
    store.dispatch({ type: nappi });
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={() => this.klik('GOOD')}>Hyvä</button>
        <button onClick={() => this.klik('OK')}>Neutraali</button>
        <button onClick={() => this.klik('BAD')}>Huono</button>
        <Statistiikka onZero={() => this.klik('ZERO')}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp();
store.subscribe(renderApp);