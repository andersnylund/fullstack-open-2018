import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    );
};

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.sisalto.o1} tehtavia={props.sisalto.t1} />
            <Osa osa={props.sisalto.o2} tehtavia={props.sisalto.t2} />
            <Osa osa={props.sisalto.o3} tehtavia={props.sisalto.t3} />
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
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    const sisalto = {
        o1: osa1,
        t1: tehtavia1,
        o2: osa2,
        t2: tehtavia2,
        o3: osa3,
        t3: tehtavia3
    };

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