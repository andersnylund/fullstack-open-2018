import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            votes: {}
        };
    }

    updateAnecdote = () => {
        const rand = Math.floor(Math.random() * this.props.anecdotes.length);
        console.log(rand);
        this.setState({ selected: rand });
    };

    addVote = () => {
        const selectedNum = this.state.selected;
        const votesCopy = { ...this.state.votes };

        if (selectedNum in votesCopy) {
            votesCopy[selectedNum] += 1;
            this.setState({ votes: votesCopy });
        } else {
            votesCopy[selectedNum] = 1;
            this.setState({ votes: votesCopy });
        }
    };

    render() {

        const votesOfSelected = this.state.votes[this.state.selected] ? this.state.votes[this.state.selected] : 0;

        let mostVotes = {
            anecdote: "",
            votes: 0
        };

        for (let key in this.state.votes) {
            if (this.state.votes[key] >= mostVotes.votes) {
                mostVotes = {
                    anecdote: this.props.anecdotes[key],
                    votes: this.state.votes[key]
                };
            }
        }

        return (
            <div>
                <div>
                    {this.props.anecdotes[this.state.selected]}
                </div>
                <div>
                    <button onClick={() => this.addVote()}>vote</button>
                    <button onClick={() => this.updateAnecdote()}>next anecdote</button>
                </div>
                <div>
                    <p>has {votesOfSelected} votes</p>
                </div>
                <h3>anecdote with most votes</h3>
                <p>{mostVotes.anecdote}</p>
                <p>has {mostVotes.votes} votes</p>
            </div>
        );
    };
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)