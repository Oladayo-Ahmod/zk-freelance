import React, { SetStateAction } from "react"

interface FreelancerProps{
    applicantDetails : any | undefined
    btnState : string | undefined
    escrowBtnState : string | undefined
    completeBtnState :  string | undefined
    message : string | undefined
    account : string | undefined
    buyerId : string | undefined
    sellerId : string | undefined
    freelancerBal : string | undefined
    employerBal : string | undefined
    currentEmployerDetails : any | undefined
    currentFreelancerDetails : any | undefined
    jobs : any | undefined
    testjobs : any | undefined
    singleJob : any | undefined
    freelancers : any | undefined
    jobEscrow : string | undefined
    connectWallet : ()=>void
    freelancerForm : {
        name : string | undefined,
        country : string | undefined,
        skills : string  | undefined,
        gitDesc : string | undefined,
        gitTitle : string | undefined,
        starting_price : number | undefined,
        
    }
    setFreelancerForm : React.Dispatch<SetStateAction<{
        name : string | undefined,
        country : string | undefined,
        skills : string  | undefined,
        gitDesc : string | undefined,
        gitTitle : string | undefined,
        starting_price : number | undefined,
    }>>
    employerForm : {
        name : string | undefined,
        country : string | undefined,
        industry : string  | undefined,
        imageURL : string | undefined
    }
    setEmployerForm : React.Dispatch<SetStateAction<{
        name : string | undefined,
        country : string | undefined,
        industry : string  | undefined,
        imageURL : string | undefined
    }>>
    registerFreelancer : ()=> void
    registerEmployer : ()=> void
    jobCreationForm : {
        title : string | undefined,
        description : string | undefined,
        budget : number | undefined
    }
    setJobCreationForm : React.Dispatch<React.SetStateAction<{
        title : string | undefined,
        description : string | undefined,
        budget : number | undefined
    }>>

    reviewForm : {
        comment : string | undefined,
        rating : number | undefined
    }

    setReviewForm : React.Dispatch<React.SetStateAction<{
        comment : string | undefined,
        rating : number | undefined
    }>>

    createJob : (modalRef : React.RefObject<HTMLElement>)=> void
    applyJob : (jobId : number)=> void
    hireFreelancer : (jobId : number, address: string)=> void
    depositFunds : (jobId : number, amound : string) => void
    completeJob : (jobId : number , address : string) => void
    releaseEscrow : (jobId : number, address : string) => void
    withdrawEarnings : ()=> void 
    retrieveJob : (jobId : number)=> void
    profileImageHandler : (e : any) => void
    gigImageHandler : (e : any) => void
    freelancerDetails : (address : string) => void
    applicantDetailsFunc : (address : string) => void
    employerDetails : (address : string) => void
    allFreelancers : ()=> void
    retrieveAllJobs :()=> void
    retrieveJobsByEmployer : (address : string)=> void
    retrieveUncompletedJobsByEmployer : (address : string)=> void
    getFreelancerHiredJobs : (address : string) => void
    retrieveEscrow : (jobId : number)=> void
    submitReview :(modalRef : React.RefObject<HTMLElement>)=> void
    toggleNav : ()=> void

}

export default FreelancerProps