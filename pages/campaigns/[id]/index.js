import React, { Component } from "react"
import campaign from "../../../ethereum/campaign"
import web3 from '../../../ethereum/web3'
import Layout from "../../../components/Layout"

import styles from "./styles.module.css"

class Campaign extends Component {

    state = { valueContributed: '', disabled: false, showMessage: false, messageType: '', message: ''}

  static async getInitialProps(props) {
    const summary = await campaign(props.query.id).methods.getSummary().call();

    return {
      minimumContribution: summary[0],
      requestsCount: summary[1],
      balance: summary[2],
      approvalCount: summary[3],
      manager: summary[4],
      address: props.query.id
    };
  }

  doContributionsForm = async (event) => {
    event.preventDefault();

    this.setState({disabled: true, message:'Wait some seconds while the contribution is added...', showMessage: true, messageType: 'alert-warning'});

    try{
        const account = await web3.eth.getAccounts();
        console.log(account);
        
        await campaign(this.props.address).methods.contribute().send({
            from: account[0],
            value: this.state.valueContributed
        });
        
        this.setState({disabled: false, message:'Contribution made with success', messageType: 'alert-success'});

    } catch(e){
        console.log(e);        
        this.setState({disabled: false, message: e.message, messageType: 'alert-danger'});
    }

  }

  render() {
    return (
      <Layout>
        <div className={`container ${styles.container}`}>
            
          <div class={`alert alert-info ${styles.alert}`} role="alert">
            <strong>Manager of this contract:</strong> {this.props.manager}
          </div>
          
          <div class="row">
            <div class="col-sm-3">
              <div class={`card ${styles.card}`}>
                <div class="card-body">
                  <h5 class="card-title">Minimum Contribution (Wei)</h5>
                  <h3 class="card-text">{this.props.minimumContribution}</h3>
                  <p>You must contribute at least this much wei to become an approvers.</p>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class={`card ${styles.card}`}>
                <div class="card-body">
                  <h5 class="card-title">Balance  (Ether)</h5>
                  <h4 class="card-text">{web3.utils.fromWei(this.props.balance, 'ether')}</h4>
                  <p>This balance is how much money this campaign has left to spend.</p>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class={`card ${styles.card}`}>
                <div class="card-body">
                  <h5 class="card-title">Requests</h5>
                  <h3 class="card-text">{this.props.requestsCount}</h3>
                  <p>A request tries to withdraw money from the contract. Requests much be approved by approvers.</p>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class={`card ${styles.card}`}>
                <div class="card-body">
                  <h5 class="card-title">Approval</h5>
                  <h3 class="card-text">{this.props.approvalCount}</h3>
                  <p>How much of people that already have contribution.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
              <div className={`col-md-6 ${styles.form}`}>
                  <h3>Do make joins with one contribution</h3>
                    <p>Minimum value is 100 wei</p>
                  <form className="form" onSubmit={this.doContributionsForm}>
                      <div className="form-group">
                          <input required className="form-control" onChange={event => this.setState({valueContributed: event.target.value})} placeholder="0.00" type="number" name="" value={this.state.valueContributed}/>
                      </div>
                      <div className="d-grid">
                        <button className="btn btn btn-info" disabled={this.state.disabled} type="submit">Contribute</button>
                          
                      </div>
                      {this.state.showMessage 
                      ? <div class={`alert ${this.state.messageType} ${styles.alert}`} role="alert">
                        {this.state.message} 
                       </div>
                       : '' }
                  </form>
              </div>              
          </div>
        </div>
      </Layout>
    );
  }
}

export default Campaign;
