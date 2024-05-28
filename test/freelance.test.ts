import { expect,assert } from 'chai';
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

     //  registering freelancer
    it("Should register a freelancer", async function () {
        await (dfreelancer.connect(freelancer) as Contract)
        .registerFreelancer(freelancerName, freelancerSkills,freelancerCountry,
        freelancerGigTitle,freelancerGigDesc, images,starting_price);
       
        const registeredFreelancer = await dfreelancer.freelancers(freelancer.address);
        expect(registeredFreelancer.freelancerAddress).to.equal(freelancer.address);
        expect(registeredFreelancer.name).to.equal(freelancerName);
        expect(registeredFreelancer.skills).to.equal(freelancerSkills);
        expect(registeredFreelancer.balance.toString()).to.equal('0');
    });

    // creating job

    it("Should create a job", async function () {
        await (dfreelancer.connect(employer) as Contract)
        .registerEmployer('Ahmod','technology','United States','https://img.com')
        await (dfreelancer.connect(employer) as Contract)
        .createJob(jobTitle, jobDescription, ethers.parseEther('100'));
       
        const job = await dfreelancer.getJobByID('1');
        expect(job.employer).to.equal(employer.address);
        expect(job.title).to.equal(jobTitle);
        expect(job.description).to.equal(jobDescription);
        expect(job.budget).to.equal(ethers.parseEther(jobBudget));
        expect(job.completed).to.be.false;
  
    });

        // hiring freelancer
    it("Should hire a freelancer", async function () {
        await (dfreelancer.connect(freelancer)as Contract).applyForJob('1');
        await (dfreelancer.connect(employer) as Contract)
        .hireFreelancer('1', freelancer.address);
        const job = await dfreelancer.getJobByID('1');
        expect(job.hiredFreelancer).to.equal(freelancer.address)
    });

     // funds deposit by employer
     it("Should deposit funds to a job", async function () {
        const fund = '100' 
        await (dfreelancer.connect(employer) as Contract)
        .depositFunds('1', { value: ethers.parseEther(fund)});
        const escrowFund = await dfreelancer.getEmployerEscrow(employer.address,'1')
        const _employer = await dfreelancer.getEmployerByAddress(employer.address);
        expect(_employer.balance).to.equal(ethers.parseEther(fund))
        expect(escrowFund).to.equal(ethers.parseEther(fund))
    });

    // job completion
    it("Should complete a job", async function () {
        await (dfreelancer.connect(employer) as Contract)
        .completeJob('1', freelancer.address);
        const job = await dfreelancer.getJobByID('1');
        expect(job.completed).to.be.true;
        expect(job.hiredFreelancer).to.equal(freelancer.address)
    });

    // release escrow funds to freelancer after job completion
    it("Should release escrow funds to a freelancer", async function () {
        const fund = '100'
        await (dfreelancer.connect(employer) as Contract)
        .releaseEscrow('1', freelancer.address);
        const updatedBalance = (await dfreelancer.freelancers(freelancer.address)).balance;
        assert.equal(updatedBalance.toString(),ethers.parseEther(fund).toString())
    });

     // withrawal of earnings by freelancer
  it("Should withdraw earnings and not allow withdrawal on empty balance", async function () {
    const withdraw = await (dfreelancer.connect(freelancer) as Contract)
    .withdrawEarnings();
    await withdraw.wait()

    try {
        const reWithdraw = await (dfreelancer.connect(freelancer) as Contract)
        .withdrawEarnings();
        await reWithdraw.wait()

        expect.fail('Expect withdrawal to fail on empty balance but it did not')
    } catch (error) {
        expect(error.message).to.include("NBW"); //NBW : No balance to withdraw.
    }
    

  });

    
})