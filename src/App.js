import React, {Component} from 'react'
import { AlgoButton, Pipeline} from 'pipeline-express-react'
import { AlgoOpt, AlgoAppCallWTxn } from 'pipeline-ui'
import './index.css'

const myAlgoWallet = Pipeline.init();
const finderOptions = [
  { value: 'Front', label: 'Front' },
  { value: 'End', label: 'End' },
  { value: 'Any Where', label: 'Any Where' }
]

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      main: true,
      myAddress: "",
      recipient: "PHILMO7LWKWMTSC6O73SJUJBHD7U5JU4RBODNWN37VVRT7ARMTTJHLS7YA",
      amount: 3000,
      appArgs: "",	    
      note: "",
      txID: ""
    }
  }

  inputRecipient = (event) => {
    this.setState({ recipient: event.target.value });
  }

  inputAmount = (event) => {
    this.setState({amount: event.target.value});
  }

  inputNote = (event) => {
    this.setState({note: event.target.value});
  }

  handleCheckChange = () => {
  this.setState({main: ! this.state.main}, () => Pipeline.main = this.state.main)

  }


  render() {
  return <div align="center" class="card">    
  <h1>phil.works</h1>
  <h2>Address Finder</h2>
  <h2>Under Maintainence while service indexer syncs to MainNet.</h2>
  <h4>Use the form below to start a search request for an Algorand vanity address.</h4>		  
  <div class="toggle-select">
    <h5>
      MainNet:
    </h5>
  <input
      className="form-check-input"
      name="mainnet" 
      type="checkbox"
      checked={this.state.main}
      onChange={this.handleCheckChange} />
  </div>
      <AlgoButton wallet={myAlgoWallet} context={this} returnTo={"myAddress"} />
      <h3>{"My Address: " + this.state.myAddress}</h3>
      <AlgoOpt appId={1} />
      <br></br>		  
      <form>
        <label class="form-label">
          Desired Text:
          <input type="text" class="form-control" onChange={this.inputNote} />
        </label><br></br>
        <label class="form-label">
         Send MicroAlgo (anything over 3k is a tip):
          <input type="number" class="form-control" onChange={this.inputAmount} defaultValue={3000} />
        </label>
      </form>
      <AlgoAppCallWTxn
      index={0} //If ASA, must be a numeric index value !== 0
      appArgs={[ 'str:FindMeThisName', 'str:Rekey', 'str:test', 'str:Front'  ]}
      recipient={this.state.recipient} //string value
      amount={this.state.amount} //integer value in micro Algos
      note={this.state.note} //string value
      myAddress={this.state.myAddress} //string value
      wallet={myAlgoWallet} //reference to an instance of Pipeline.init(); that is called once when the app is initialized
      context={this}
      returnTo={"txID"}// string value of state key to return the transaction id
      />
      <h3>{"Transaction ID: " + this.state.txID}</h3>
   </div>
  }
}

export default App;
