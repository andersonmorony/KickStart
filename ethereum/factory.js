import web3 from './web3'
import compileFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(compileFactory.interface),
    '0x8c252192aa7B7DD4D139c9D55E1615e4666070bA'
);

export default instance;