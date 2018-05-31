import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    );
};

const Sisalto = (props) => {
    return (
        props.sisalto
    );
};

const Yhteensa = (props) => {
    return (
        <p>Yhteensä {props.tehtavia}</p>
    );
};

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    const sisalto =
        <div>
            <p>{osa1} {tehtavia1}</p>
            <p>{osa2} {tehtavia2}</p>
            <p>{osa3} {tehtavia3}</p>
        </div>

    return (
        <div>
            <Otsikko kurssi={kurssi}></Otsikko>
            <Sisalto sisalto={sisalto}></Sisalto>
            <Yhteensa tehtavia={tehtavia1 + tehtavia2 + tehtavia3}></Yhteensa>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)