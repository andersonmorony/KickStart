import web3 from './web3'
import compileFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(compileFactory.interface),
    '0x5A5BAc272045c13B9093D397765c006F620878ea'
);

export default instance;