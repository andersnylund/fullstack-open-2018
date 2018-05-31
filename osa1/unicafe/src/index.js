import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    render() {

        return (
            <div>
                <h1>Anna palautetta</h1>
                <button onClick={() => this.setState({ hyva: this.state.hyva + 1 })}>Hyvä</button>
                <button onClick={() => this.setState({ neutraali: this.state.neutraali + 1 })}>Neutraali</button>
                <button onClick={() => this.setState({ huono: this.state.huono + 1 })}>Huono</button>
                <h2>Statistiikka</h2>
                <div>Hyvä {this.state.hyva}</div>
                <div>Neutraali {this.state.neutraali}</div>
                <div>Huono {this.state.huono}</div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)