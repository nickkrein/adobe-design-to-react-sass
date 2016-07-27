class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Nav />
        <Scores />
        <Footer />
      </div>
    )
  }
}

class Nav extends React.Component {
  render() {
    return (
      <header> 
        <a className="prosearch-logo" href="./index.html"></a>
        <div className="header-right"> 
          <p>Wolfpack Trainer</p>
          <a className="wolfpack-logo" href="#"></a>
        </div>
      </header>
    )  
  }
}

class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = { personal: "", group: "", completed: 98, submitted: { personal: 0, group: 0 }};
    this.handlePersonalChange = this.handlePersonalChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  handlePersonalChange(e) {
    this.setState({ personal: e.target.value });
  }

  handleGroupChange(e) {
    this.setState({ group: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    let personal = Math.round((this.state.personal.trim() / this.state.completed) * 100);
    let group = Math.round((this.state.group.trim() / this.state.completed) * 100);
    this.setState({submitted: { personal: personal, group: group }});

    this.setState({personal: "", group: ""});
    this.refs.personal.focus();
  }

  componentDidMount() {
    this.refs.personal.focus();
  }

  render() {
    return (
      <section className="scores-container">

        <p className="scores-header">SUCCESS ANIMATION</p>

        <form className="scores-form" enctype="text/plain" onSubmit={this.handleSubmit.bind(this)}>

          <div className="input-container">
            <label for="personal">Personal Score</label>
            <input type="number" min="0" max={this.state.completed} id="personal" value={this.state.personal} onChange={this.handlePersonalChange} ref="personal" required /> 
          </div>

          <div className="input-container">
            <label for="group">Group Score</label>
            <input type="number" min="0" max={this.state.completed} id="group" value={this.state.group} onChange={this.handleGroupChange} required /> 
          </div>

          <input className="submit" type="submit" value="Submit" />

        </form>
        
        <ProgressBars scores={this.state.submitted} completed={this.state.completed} />

      </section>
    )
  }
}

class ProgressBars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {personal: 0, group: 0, completed: props.completed};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({personal: nextProps.scores.personal || 0, group: nextProps.scores.group || 0, completed: nextProps.completed})
  }

  render() {
    let youStyle = this.state.personal;
    let groupStyle = this.state.group;

    return (
      <div className="progress-container">
        
        <ReactMotion.Motion defaultStyle={{x: 0}} style={{x : ReactMotion.spring(youStyle, {stiffness: 113, damping: 18.5})}}>
          {({x}) => {
            return (
              <p className="you-score" style={{ left: (x - 4.5) + '%' }}>
              You
              <br /> 
              <span>{Math.round(x)}%</span>
            </p> 
            )
          }}
        </ReactMotion.Motion>  
        
        <div className="progress-bars">
          
          <ReactBootstrap.ProgressBar className="personal-bar" now={this.state.personal} label={`${this.state.personal}%`} srOnly />
          
          <ReactBootstrap.ProgressBar className="group-bar" now={this.state.group} label={`${this.state.group}%`} srOnly />

        </div>
        
        <ReactMotion.Motion defaultStyle={{x: 0}} style={{x : ReactMotion.spring(groupStyle, {stiffness: 113, damping: 18.5})}}>
          {({x}) => {
            return (
              <p className="group-score" style={{ left: (x - 4.5) + '%' }}>
              Group
              <br />
              <span>{Math.round(x)}%</span>
              </p> 
            )
          }}
        </ReactMotion.Motion>

        <p className="docs-reviewed">{this.state.completed}/100 Documents Reviewed</p>

      </div>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>Matter: Oppenheimer Funds v JPMMF Mutual Funds (40) | Run: Mutual Funds for Everyone (30)</p>
      </footer>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
