import produce from "immer";

import Grid from "./grid.jsx";

export default class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      time: 0,
      totalWords: 25,
      value: "",
    };
    this.submitBox = null;
  }

  componentDidMount() {
    this.submitBox.focus();
  }

  handleChange = (e) => {
    this.setState(
      produce((state) => {
        state.value = e.target.value;
      })
    );
  };

  submit = (e) => {
    e.preventDefault();
    this.setState(
      produce((state) => {
        state.value = "";
      })
    );
    this.props.onword(this.state.value);
  };

  render() {
    return (
      <div className="level">
        <div className="toolbar">
          <button className="gray" onClick={this.props.onquit}>
            Quit
          </button>
          <span className="time">Time: {this.state.time}</span>
          <span className="score">
            Words: {this.props.words.length} of {this.state.totalWords}
          </span>
        </div>
        <Grid level={this.props.level.slice(-1)} />
        <div className="inputs">
          <div className="words">
            {this.props.words.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
          <form onSubmit={this.submit}>
            <input
              onChange={this.handleChange}
              type="text"
              value={this.state.value}
              ref={(el) => {this.submitBox = el;}}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}
