import React, { Component } from 'react';
import Factory from '../ethereum/factory'
import styles from '../styles/home.module.css';
import Link from 'next/link'

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
                            <img src="https://img.icons8.com/fluency/88/000000/ethereum.png"/>
                            <h1>CAMPAIGNS</h1>
                            <h3>Create your new campaign with our tecnology</h3>
                            <div className="d-grid col-5 mx-auto">
                            <Link href={`campaigns/new`}>
                                <button className="btn btn-lg btn-light" type="button">Create new campaign</button>
                            </Link>
                            </div>
                        </div>
                            <div className={`row ${styles.campaigns}`}>
                                {this.state.campaigns.map(campaign => {
                                    return(
                                    <div className="col-sm-3">
                                        <div className={`card ${styles.customCards}`}>
                                        <div className="card-body">
                                        <img src="https://img.icons8.com/color-glass/38/000000/contract.png"/>
                                            <h5 className="card-title">Contract</h5>
                                            <p className="card-text">{campaign}</p>
                                            <Link href={`campaigns/${campaign}`}>
                                            <a href="#" className="btn btn-info">See more</a>
                                            </Link>
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