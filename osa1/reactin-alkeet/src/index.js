import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    );
};

const Sisalto = (props) => {
    console.log(props);
    return (
        <div>
            <Osa osa={props.osa1.nimi} tehtavia={props.osa1.tehtavia} />
            <Osa osa={props.osa2.nimi} tehtavia={props.osa2.tehtavia} />
            <Osa osa={props.osa3.nimi} tehtavia={props.osa3.tehtavia} />
        </div>
    );
};

const Osa = (props) => {
    return (
        <p>{props.osa} {props.tehtavia}</p>
    );
};

const Yhteensa = (props) => {
    return (
        <p>Yhteensä {props.tehtavia}</p>
    );
};

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (
        <div>
            <Otsikko kurssi={kurssi}></Otsikko>
            <Sisalto osa1={osa1} osa2={osa2} osa3={osa3}></Sisalto> {/* Ei kovin´ eleganttia mutta kuinka muuten ilman loopia? */}
            <Yhteensa tehtavia={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia}></Yhteensa>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)