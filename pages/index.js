import React, { Component } from 'react';
import Factory from '../ethereum/factory'
import { Grid, Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styles from '../styles/index.module.css';

import Layout from '../components/Layout'

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await Factory.methods.getDeployedCampaigns().call();

        return { campaigns };        
    }

    state = { campaigns: this.props.campaigns };

    
    render() {
        return (
            <div>
                <Layout>
                   <div className={`container-fluid ${styles.content}`}>
                       <div className="row">
                        <div className={`col-12 ${styles.box}`}>
                            <h1>CAMPAIGNS</h1>
                            <h3>on the world's first & largest NFT marketplace</h3>
                            <div className="d-grid col-5 mx-auto">
                                <button className="btn btn-lg btn-outline-light" type="button">Create new campaign</button>
                            </div>
                        </div>
                            <div className={`row ${styles.campaigns}`}>
                                {this.state.campaigns.map(campaign => {
                                    return(
                                    <div className="col-sm-3">
                                        <div className={`card ${styles.customCards}`}>
                                        <div className="card-body">
                                            <h5 className="card-title">Contract</h5>
                                            <p className="card-text">{campaign}</p>
                                            <a href="#" className="btn btn-primary">See more</a>
                                        </div>
                                    </div>
                                </div>
                                    )
                                })}
                                
                            </div>
                       </div>
                   </div>
                </Layout>
            </div>
        )
    }

}

export default CampaignIndex;