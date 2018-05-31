import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
}

const Statistics = (props) => {

    const { hyva, neutraali, huono } = props.stats;

    const keskiarvo = () => {
        const summa = hyva * 1 + huono * -1;
        const arvostelut = hyva + neutraali + huono;
        const keskiarvo = summa / arvostelut;
        return isNaN(keskiarvo) ? 0 : keskiarvo;
    };

    const positiivisia = () => {
        const positiivisia = hyva / (hyva + neutraali + huono);
        return isNaN(positiivisia) ? 0 : positiivisia * 100;
    };

    if (hyva === 0 && neutraali === 0 && huono === 0) {
        return <div>ei yhtään palautetta annettu</div>
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="Hyvä" number={hyva}></Statistic>
                    <Statistic text="Neutraali" number={neutraali}></Statistic>
                    <Statistic text="Huono" number={huono}></Statistic>
                    <Statistic text="Keskiarvo" number={keskiarvo()}></Statistic>
                    <Statistic text="Positiivisia" number={positiivisia()} unit="%"></Statistic>
                </tbody>
            </table>
        </div>
    );
}

const Statistic = ({ text, number, unit }) => {
    return (
        <tr>
            <td>{text}</td><td>{number} {unit}</td>
        </tr>
    );
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    setFieldValue = (field, value) => {
        return () => {
            this.setState({ [field]: value })
        };
    };

    render() {

        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={this.setFieldValue("hyva", this.state.hyva + 1)} text="Hyvä" />
                <Button handleClick={this.setFieldValue("neutraali", this.state.neutraali + 1)} text="Neutraali" />
                <Button handleClick={this.setFieldValue("huono", this.state.huono + 1)} text="Huono" />
                <h2>Statistiikka</h2>
                <Statistics stats={this.state}></Statistics>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)