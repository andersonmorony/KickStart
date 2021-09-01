pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function  createCampaign(uint minimum) public{
       address newCampaignsAddress = new Campaign(minimum, msg.sender);
       deployedCampaigns.push(newCampaignsAddress);
    }
    
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
    
}

contract Campaign {
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint CountApprovels;
        mapping(address => bool) approvels;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvels;
    uint public countApprovels;
    
    modifier RestrictedToManager(){
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address created) public{
        manager = created;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
    
        approvels[msg.sender] = true;
        countApprovels++;
    }
    
    function createRequest(string description, uint value, address recipient) public RestrictedToManager{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            CountApprovels: 0
        });
        
        requests.push(newRequest);
    }
    
    function approvalRequest(uint index) public {
        
        Request storage request =requests[index];
        
        require(approvels[msg.sender]);
        require(!request.approvels[msg.sender]);
        
        request.approvels[msg.sender] = true;
        request.CountApprovels++;
        
    }
    
    function finalizeRequest(uint index) public {
        
        Request storage request = requests[index];
        
        require(!request.complete);
        require(request.CountApprovels > (countApprovels/2));
        
        request.recipient.transfer(request.value);
        
        request.complete = true;
        
    }

    function getSummary() public view returns(uint, uint,uint, uint, address){
        return (
            minimumContribution,
            requests.length,
            address(this).balance,
            countApprovels,
            manager
        );
    }

    function getCountRequest() public view returns(uint){
        return(
            requests.length
            );
        
    }
}