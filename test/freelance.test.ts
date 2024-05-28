import { expect } from 'chai';
import { Contract, Wallet } from "zksync-ethers";
import { getWallet, deployContract, LOCAL_RICH_WALLETS } from '../deploy/utils';
import * as ethers from "ethers";

describe('Freelance ', ()=>{

    const freelancerName = "Test Freelancer";
    const freelancerSkills = "Solidity, JavaScript";
    const freelancerCountry = 'Nigeria'
    const freelancerGigTitle = 'I will design and develop a dApp'
    const images = ['https://image.com/freelancerImage','https://image.com/gigImage']
    const freelancerGigDesc = 'Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using '
    const starting_price = '100'

    let dfreelancer : Contract
    let freelancer : Wallet;
    let employer : Wallet
    let intermediary : Wallet
    let jobTitle = "Sample Job";
    let jobDescription = "This is a test job";
    let jobBudget = '100';

    before(async function () {
        freelancer = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
        employer = getWallet(LOCAL_RICH_WALLETS[1].privateKey);
    
        dfreelancer = await deployContract("Freelance", [], { wallet: intermediary, silent: true });
    });

    it("Should create a job", async function () {
        await (dfreelancer.connect(employer) as Contract)
        .registerEmployer('Ahmod','technology','United States','https://img.com')
        await (dfreelancer.connect(employer) as Contract)
        .createJob(jobTitle, jobDescription, ethers.parseEther('100'));
       
        const job = await dfreelancer.getJobByID('1');
        expect(job.employer).to.equal(employer.address);
        expect(job.title).to.equal(jobTitle);
        expect(job.description).to.equal(jobDescription);
        expect(job.budget.toString()).to.equal(ethers.parseEther(jobBudget));
        expect(job.completed).to.be.false;
  
    });



    
})