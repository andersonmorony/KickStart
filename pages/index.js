import React, { Component } from 'react';
import Factory from '../ethereum/factory'
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await Factory.methods.getDeployedCampaigns().call();

        return { campaigns };        
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: 'campaign',
                fluid: true
            }            
        });

        return <Card.Group items={items} />;
    }


    render() {
        return (
            <div>
                {this.renderCampaigns()}
            </div>
        )
    }

}

export default CampaignIndex;