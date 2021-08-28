const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const campaignFactoryBuilder = require('../ethereum/build/CampaignFactory.json');
const campaignBuilder = require('../ethereum/build/Campaign.json');

let accounts;
let Factory;
let addressCampaign;
let campaign;

beforeEach( async () => {

    accounts = await web3.eth.getAccounts();

    Factory = await new web3.eth.Contract(JSON.parse(campaignFactoryBuilder.interface))
                                            .deploy({data: campaignFactoryBuilder.bytecode})
                                            .send({from: accounts[0], gasPrice: 5000000000, gas: 1000000});

    await Factory.methods.createCampaign('100').send({
        from: accounts[0],
        gasPrice: 5000000000,
        gas: 1000000
    });

    [addressCampaign] = await Factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(
        JSON.parse(campaignBuilder.interface),
        addressCampaign
    );

});

describe('Campaign', () => {
    it('should had a campaign contract and factory', () => {
        assert.ok(campaign.options.address);
        assert.ok(Factory.options.address);
    });

    it('should have a contribution', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: '110'
        });
        const isApprovals = await campaign.methods.approvels(accounts[0]).call();
        const countApprovals = await campaign.methods.countApprovels().call();
        assert(isApprovals)
        assert.equal(countApprovals, 1);
    });

    it('should not have a contribution', async () => {
        try{
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: '000'
            });
            assert(false);
        } catch(err)
        {
            const countApprovals = await campaign.methods.countApprovels().call();
            assert.equal(countApprovals, 0);
            assert(true);
        }
    });

    it('should create new request', async () => {
        await campaign.methods
            .createRequest('Description', '400', accounts[1])
            .send({
                 from: accounts[0], 
                 gas: '1000000'
            });

        let request = await campaign.methods.requests(0).call();

        assert.equal(request.description, 'Description');
        assert.equal(request.value, 400);
        assert.equal(request.recipient, accounts[1]);
        assert.equal(request.complete, false);
        assert.equal(request.CountApprovels, 0)

    });

    it('should approval request', async () => {
       
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: '110'
        });
        await campaign.methods
        .createRequest('Description', '400', accounts[1])
        .send({
             from: accounts[0], 
             gas: '1000000'
        });
        await campaign.methods.approvalRequest(0).send({
            from: accounts[0]
        });
        let request = await campaign.methods.requests(0).call();

        
        assert.equal(request.CountApprovels, 1);
    });
});