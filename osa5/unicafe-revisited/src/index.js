import React from 'react'
import ReactDOM from 'react-dom'

const Statistiikka = () => {
  const palautteita = 0

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
            <td></td>
          </tr>
          <tr>
            <td>Neutraali</td>
            <td></td>
          </tr>
          <tr>
            <td>Huono</td>
            <td></td>
          </tr>
          <tr>
            <td>Keskiarvo</td>
            <td></td>
          </tr>
          <tr>
            <td>Positiivisia</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {

  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>Hyvä</button>
        <button onClick={this.klik('OK')}>Neutraali</button>
        <button onClick={this.klik('BAD')}>Huono</button>
        <Statistiikka />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
