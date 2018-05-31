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

        const keskiarvo = () => {
            const { hyva, neutraali, huono } = this.state;
            const summa = hyva * 1 + huono * -1;
            const arvostelut = hyva + neutraali + huono;
            const keskiarvo = summa / arvostelut;
            return isNaN(keskiarvo) ? 0 : keskiarvo;
        };

        const positiivisia = () => {
            const { hyva, neutraali, huono } = this.state;
            const positiivisia = hyva / (hyva + neutraali + huono);
            return isNaN(positiivisia) ? 0 : positiivisia * 100;
        };

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
                <div>Keskiarvo {keskiarvo()}</div>
                <div>Positiivisia {positiivisia()} %</div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)