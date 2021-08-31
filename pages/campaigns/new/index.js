import React, { Component }from 'React';
import Layout from '../../../components/Layout';
import styles from './new.module.css';

import Factory from '../../../ethereum/factory';
import web3 from '../../../ethereum/web3';

class NewCampaign extends Component {

    state = { minimumValue: '', addressContract: '', disabled: false, message: '', messageType: '', messageShow: false};

     onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();
        
        this.setState({disabled: true, messageShow: true, message: 'Wait some seconds while the contract to been creating...', messageType: 'alert-warning'});
        try{
            const result = await Factory.methods.createCampaign(this.state.minimumValue).send({
                from: accounts[0]
            });

            this.setState({addressContract: result, disabled: false, message: 'Contract created with success', messageType: 'alert-success'});

        }catch(error){
            console.log(error.message);
            this.setState({disabled: false, message: error.message, messageType: 'alert-danger'});
        }


    };

    render(){
        return(
            <Layout>
            <div className={`container ${styles.container}`}>
                    <form className="form row" onSubmit={this.onSubmit}>
                        
                        {this.state.messageShow ?         
                            <div class={`alert ${this.state.messageType} alert-dismissible fade show`} role="alert">
                                    {this.state.message}
                            </div>
                        : ''}
                        <h3>Create a new campaign</h3>
                        <p>To create a new campaign you need to define the minimum value for the campaign</p>

                        <div className="form-group">
                            <input required type="number" value={this.state.minimumValue}  onChange={event => this.setState({minimumValue: event.target.value})} className="form-control" placeholder="Minimum value in Wei"/>
                        </div>
                        <div className="d-grid col-12 mx-auto">
                            {this.state.disabled ? 
                                <button className="btn btn btn-primary" disabled type="submit">Creating....</button>
                                :<button className="btn btn btn-primary"  type="submit">Create new campaign </button>}
                            
                        </div>
                    </form>

            </div>
            </Layout>
        );
    }
}

export default NewCampaign;