"use client"

import React, { createContext, useEffect, useState } from 'react';
import { ADDRESS, ABI, ZKFreelancePaymasterAddress } from '../constants/index';
import { ethers } from 'ethers';
import Router from 'next/router';
import Swal from 'sweetalert2';
import FreelancerProps from '../app/interfaces/freelancerProps';
import {uploadJSONToIPFS,uploadFileToIPFS} from '../constants/pinata'
import { Contract,utils, BrowserProvider, Provider, Wallet } from "zksync-ethers";


export const FREELANCER_CONTEXT = createContext<FreelancerProps | undefined>(
    undefined
  );

let connect : any
if(typeof window !=='undefined'){
    connect = (window as any).ethereum
    
    
}



export const FreelancerProvider:React.FC<{children : React.ReactNode}>=({children,})=>{

    // states variables
    const [account, setAccount] = useState<string>()
    const [freelancerBal, setFreelancerBal] = useState<string>()
    const [employerBal, setEmployerBal] = useState<string>()
    const [buyerId, setBuyerId] = useState<string>()
    const [message, setMessage] = useState<string>()
    const [btnState, setBtnState] = useState<string>()
    const [escrowBtnState, setEscrowBtnState] = useState<string>()
    const [completeBtnState, setCompleteBtnState] = useState<string>()
    const [sellerId, setSellerId] = useState<string>()
    const [jobEscrow, setJobEscrow] = useState<string>()
    const [singleJob, setSingeJob] = useState<any>()
    const [profileImage, setProfileImage] = useState<string>()
    const [gigImage, setGigImage] = useState<string>()
    const [currentEmployerDetails, setCurrentEmployerDetails] = useState<any>()
    const [currentFreelancerDetails, setCurrentFreelancerDetails] = useState<any>()
    const [applicantDetails, setApplicantDetails] = useState<any>()
    const [freelancers, setFreelancers] = useState<any>()
    const [jobs, setJobs] = useState<any>()
    const [testjobs, setTestJobs] = useState<any>()
    const [freelancerForm, setFreelancerForm] = useState<FreelancerProps["freelancerForm"]>({
        name : '',
        country : '',
        skills : '',
        gitDesc : '',
        gitTitle : '',
        starting_price : undefined,

    })
    const [employerForm, setEmployerForm] = useState<FreelancerProps["employerForm"]>({
        name : '',
        country : '',
        industry : '',
        imageURL : ''

    })
    const [jobCreationForm, setJobCreationForm] = useState<FreelancerProps["jobCreationForm"]>({
        title : '',
        description : '',
        budget : undefined
    })

    const [reviewForm, setReviewForm] = useState<FreelancerProps["reviewForm"]>({
        comment : '',
        rating : undefined,
        address : ''
    })

     // paymaster parameters
     const paymasterParams = utils.getPaymasterParams(ZKFreelancePaymasterAddress, {
        type: "General",
        innerInput: new Uint8Array(),
      });


      // wallet connection
    const connectWallet : FreelancerProps["connectWallet"] =async function(){
        try {
            if(connect){
                const connector = await connect.request({method : 'eth_requestAccounts'})
                setAccount(connector[0]) 
            }
        } catch (error) {
            console.log(error);
        }
    }

        // registration for freeelancer
    const registerFreelancer : FreelancerProps["registerFreelancer"] = async function(){
        const {name,country,skills,gitDesc,gitTitle,starting_price} = freelancerForm
        
        if(account && connect){
            if(name && country && skills && profileImage && gigImage &&gitDesc && gitTitle && starting_price){
                const price = ethers.parseEther(starting_price.toString())
                const images = [profileImage.toString() ,gigImage.toString()]                
                try {

               setBtnState("Registering...")

               const provider =  new BrowserProvider(connect)
               const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
               const signer = await provider.getSigner()

               const contract = new ethers.Contract(ADDRESS,ABI,signer);

               const gasLimit = await contract.registerFreelancer
               .estimateGas(name,skills,country,gitTitle,gitDesc,images,price,{
                customData: {
                  gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                  paymasterParams: paymasterParams,
                },
              });

              const register = await contract
                .registerFreelancer(name,skills,country,gitTitle,gitDesc,images,price,{
                maxPriorityFeePerGas: ethers.toBigInt(0),
                maxFeePerGas: await zksyncProvider.getGasPrice(),
                gasLimit,
                customData: {
                  gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                  paymasterParams,
                },
              });

               setBtnState("Waiting...")
               await register.wait()
               setBtnState("Registered!")

               setTimeout(() => {   
                setBtnState("")
                }, 1000);

               Swal.fire({
                   position: 'top-end',
                   icon: 'success',
                   text: `You have successfully registered as a freelancer`,
                   showConfirmButton: true,
                   timer: 4000
               })    
   
          } catch (error : any) {
            setBtnState("")
            if(error.message.includes('already registered')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `You have already registered!`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `an error occured, try again.`,
                    showConfirmButton: true,
                    timer: 4000
                })  
                console.log(error);
            }            
           
          }
           }
           else{
                Swal.fire({
                   position: 'top-end',
                   icon: 'warning',
                   text: `All fields are required!`,
                   showConfirmButton: true,
                   timer: 4000
               })  
           }
        }
        else{
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                text: `Please, connect your wallet address!`,
                showConfirmButton: true,
                timer: 4000
            })  
        }
       
      

    }

    // get freelancer details by address
    const freelancerDetails : FreelancerProps["freelancerDetails"] =async(account)=>{
        try {
            const provider =  new BrowserProvider(connect)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer);
            const details = await contract.freelancers(account)
            const balance = ethers.formatEther(details.balance.toString())
            const date  = new Date(details.registration_date.toString() * 1000)
            const year = date.getFullYear()
            const month = date.toLocaleString('default', {month : 'long'})
            let freelancer = {
                freelancerAddress : details.freelancerAddress,
                name : details.name,
                skills : details.skills,
                balance : details.balance,
                country : details.country,
                gigTitle : details.gigTitle,
                gitDescription : details.gitDescription,
                images : details.images,
                jobsCompleted : details.jobsCompleted,
                registered : details.registered,
                registration_date : month + ',' + year,
                starting_price : ethers.formatEther(details.starting_price.toString()),

            }
            setCurrentFreelancerDetails(freelancer)
            setFreelancerBal(balance.toString())
        } catch (error) {
            console.log(error);
            
        }
    }

    const applicantDetailsFunc : FreelancerProps["applicantDetailsFunc"] =async(account)=>{
        try {
            allFreelancers()
            if (freelancers) {
                const details = await freelancers.filter((freelancer : any) => Number(freelancer.freelancerAddress) === Number(account));

                const provider =  new BrowserProvider(connect)
                const signer = await provider.getSigner()
                const contract = new ethers.Contract(ADDRESS,ABI,signer);
                const reviews = await contract.getFreelancerReviews(account)

                const date  = new Date(details[0].registration_date.toString() * 1000)
                const year = date.getFullYear()  
                const month = date.toLocaleString('default', {month : 'long'})
                let freelancer = {
                    freelancerAddress : details[0].freelancerAddress,
                    name : details[0].name,
                    skills : details[0].skills,
                    balance : details[0].balance,
                    country : details[0].country,
                    gigTitle : details[0].gigTitle,
                    gitDescription : details[0].gitDescription,
                    images : details[0].images,
                    jobsCompleted : details[0].jobsCompleted,
                    registered : details[0].registered,
                    registration_date : month + ',' + year,
                    starting_price : ethers.formatEther(details[0].starting_price.toString()),
                    reviews : reviews.map((review :any)=>review)
                }
                setApplicantDetails(freelancer)
            }
          
        } catch (error) {
            console.log(error);
        }
    }

    // get employer details by address
    const employerDetails : FreelancerProps["employerDetails"] =async(account)=>{
        try {
            
            const provider =  new BrowserProvider(connect)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer);
            const details = await contract.employers(account)
            const balance = ethers.formatEther(details.balance.toString())
            setEmployerBal(balance.toString())
            setCurrentEmployerDetails(details)
        } catch (error) {
            console.log(error);
            
        }
    }

    // registration for employer
    const registerEmployer : FreelancerProps["registerFreelancer"] = async function(){
        const {name,country,industry} = employerForm
        if(name && country && industry && profileImage){
            const image = profileImage.toString()
             try {
                setBtnState("Registering...")

                const provider =  new BrowserProvider(connect)
                const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
                const signer = await provider.getSigner()
   
                const contract = new ethers.Contract(ADDRESS,ABI,signer);
 
                const gasLimit = await contract.registerEmployer
                .estimateGas(name,industry,country,image,{
                 customData: {
                   gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                   paymasterParams: paymasterParams,
                 },
               });
 
               const register = await contract
                 .registerEmployer(name,industry,country,image,{
                 maxPriorityFeePerGas: ethers.toBigInt(0),
                 maxFeePerGas: await zksyncProvider.getGasPrice(),
                 gasLimit,
                 customData: {
                   gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                   paymasterParams,
                 },
               });
 
             setBtnState("Waiting...")
             await register.wait()
             setBtnState("Registered!")

             setTimeout(() => {   
                setBtnState("")
                }, 1000);

             Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully registered as an employer`,
                showConfirmButton: true,
                timer: 4000
            })
 
        } catch (error) {
            setBtnState("")
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                text: `an error occured, try again.`,
                showConfirmButton: true,
                timer: 4000
            })    
             console.log(error);
         
        }
        }
        else{
             Swal.fire({
                position: 'top-end',
                icon: 'warning',
                text: `All fields are required!`,
                showConfirmButton: true,
                timer: 4000
            })  
        }
       
 
     }

    //   create job by employer
     const createJob : FreelancerProps["createJob"] =async (modalRef : React.RefObject<HTMLElement>)=>{
        const {title,description,budget} = jobCreationForm
        if (title && description && budget) {
            try {
                setBtnState("Creating job...")
                const parsedBudget = ethers.parseEther(budget.toString())
                const provider =  new BrowserProvider(connect)
                const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
                const signer = await provider.getSigner()
 
                const contract = new ethers.Contract(ADDRESS,ABI,signer);
 
                const gasLimit = await contract.createJob
                .estimateGas(title,description,parsedBudget,{
                 customData: {
                   gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                   paymasterParams: paymasterParams,
                 },
               });
 
               const create = await contract
                 .createJob(title,description,parsedBudget,{
                 maxPriorityFeePerGas: ethers.toBigInt(0),
                 maxFeePerGas: await zksyncProvider.getGasPrice(),
                 gasLimit,
                 customData: {
                   gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                   paymasterParams,
                 },
               });
                setBtnState("Waiting...")
                await create.wait()
                setBtnState("Created!")

                const modalElement = modalRef.current ? modalRef.current : ''
                if(modalElement instanceof HTMLElement){
                    modalElement.classList.remove('show')
                    modalElement.style.display = 'none'
                }

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: `You have successfully created a job`,
                    showConfirmButton: true,
                    timer: 4000
                })   

                setTimeout(() => {   
                    setBtnState("")
                }, 1000);


            } catch (error) {
                setMessage("")
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `an error occured, try again.`,
                    showConfirmButton: true,
                    timer: 4000
                })   
                console.log(error);
                
            }
        }
       else{
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            text: `All fields are required`,
            showConfirmButton: true,
            timer: 4000
        })  
       } 
       
     }

    //  apply for job by freelancer
     const applyJob : FreelancerProps["applyJob"]=async (jobId)=>{
        try {
          
            const provider =  new BrowserProvider(connect)
            const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
            const signer = await provider.getSigner()

            const contract = new ethers.Contract(ADDRESS,ABI,signer);

            const gasLimit = await contract.applyForJob
            .estimateGas(jobId,{
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams: paymasterParams,
             },
           });

           const apply = await contract
             .applyForJob(jobId,{
             maxPriorityFeePerGas: ethers.toBigInt(0),
             maxFeePerGas: await zksyncProvider.getGasPrice(),
             gasLimit,
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams,
             },
           });;
            await apply.wait()

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully applied for this job`,
                showConfirmButton: true,
                timer: 4000
            })

          
        } catch (error : any) {
         
            if(error.message.includes('JDE')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `Job does not exist`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else if (error.message.includes('You have already applied for this job')) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `You have already applied for this job!`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `an error occured`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
    
        }
     }

    //  hire freelancer by employer
     const hireFreelancer : FreelancerProps["hireFreelancer"]= async(jobId,address)=>{
        try {
            const provider =  new BrowserProvider(connect)
            const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
            const signer = await provider.getSigner()

            const contract = new ethers.Contract(ADDRESS,ABI,signer);

            const gasLimit = await contract.hireFreelancer
            .estimateGas(jobId,address,{
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams: paymasterParams,
             },
           });

           const hire = await contract
             .hireFreelancer(jobId,address,{
             maxPriorityFeePerGas: ethers.toBigInt(0),
             maxFeePerGas: await zksyncProvider.getGasPrice(),
             gasLimit,
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams,
             },
           });

            await hire.wait()

            setSellerId(account)
            setBuyerId(address)            
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully hired ${address.slice(0,6)}...${address.slice(address.length -4)} for this job`,
                showConfirmButton: true,
                timer: 4000
            })

            setTimeout(() => {
                setBtnState("")
            }, 1000);
            
        } catch (error : any) {
            setBtnState("")
            if(error.message.includes('JDE')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `Job does not exist`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else if(error.message.includes('Freelancer is already hired')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `Freelancer is already hired for this job`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `an error occured`,
                    showConfirmButton: true,
                    timer: 4000
                })
                console.log(error)
            }
               
        }
     }

    //  deposit funds by employer
     const depositFunds : FreelancerProps["depositFunds"] = async(jobId,amount)=>{
        try {
            setBtnState("Depositing funds...")
           
            const parsedAmount = ethers.parseEther(amount)
            const provider =  new BrowserProvider(connect)
            const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
            const signer = await provider.getSigner()

            const contract = new ethers.Contract(ADDRESS,ABI,signer);

            const gasLimit = await contract.depositFunds
            .estimateGas(jobId,{
             value : parsedAmount,
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams: paymasterParams,
             },
           });

           const deposit = await contract
             .depositFunds(jobId,{
             value : parsedAmount,
             maxPriorityFeePerGas: ethers.toBigInt(0),
             maxFeePerGas: await zksyncProvider.getGasPrice(),
             gasLimit,
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams,
             },
           });

            setBtnState("Waiting...")
            await deposit.wait()
            setBtnState("Funds deposited!")

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully deposited ${amount} ETH for this job`,
                showConfirmButton: true,
                timer: 4000
            })

            setTimeout(() => {   
                setBtnState("")
            }, 1000);

        } catch (error : any) {
            setBtnState("")
            if(error.message.includes('JDE')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `Job does not exist`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else if(error.message.includes('Only the employer can deposit funds')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `You are not an employer!`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else if(error.message.includes('IA')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `Insufficient amount!`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `an error occured!`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            
        }
     }

        //  release escrow by employer
      const releaseEscrow : FreelancerProps["releaseEscrow"] = async(jobId,address)=>{
        try {
            setEscrowBtnState("Releasing escrow...")
            const provider =  new BrowserProvider(connect)
            const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
            const signer = await provider.getSigner()

            const contract = new ethers.Contract(ADDRESS,ABI,signer);

            const gasLimit = await contract.releaseEscrow
            .estimateGas(jobId,address,{
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams: paymasterParams,
             },
           });

           const release = await contract
             .releaseEscrow(jobId,address,{
             maxPriorityFeePerGas: ethers.toBigInt(0),
             maxFeePerGas: await zksyncProvider.getGasPrice(),
             gasLimit,
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams,
             },
           });

            setEscrowBtnState("Waiting...")
            await release.wait()
            setEscrowBtnState("Escrow released!")

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully released escrow!`,
                showConfirmButton: true,
                timer: 4000
            })

            setTimeout(() => {
                setEscrowBtnState("")
            }, 1000);

        } catch (error : any) {
           setEscrowBtnState("")
            if(error.message.includes('JDE')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `Job does not exist`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else if(error.message.includes('Job is not completed by freelancer')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `This is not yet completed by freelancer!`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `An error occured!`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            
        }
     }

        // review submission by employer
      const submitReview : FreelancerProps["submitReview"]= async(modalRef : React.RefObject<HTMLElement>)=>{
        try {
            setBtnState("Submitting review...")
            const {comment,rating,address} = reviewForm
            console.log(reviewForm)
            const provider =  new BrowserProvider(connect)
            const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
            const signer = await provider.getSigner()

            const contract = new ethers.Contract(ADDRESS,ABI,signer);

            const gasLimit = await contract.submitReview
            .estimateGas(address,comment,rating,{
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams: paymasterParams,
             },
           });

            const review = await contract
             .submitReview(address,comment,rating,{
             maxPriorityFeePerGas: ethers.toBigInt(0),
             maxFeePerGas: await zksyncProvider.getGasPrice(),
             gasLimit,
             customData: {
               gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
               paymasterParams,
             },
           });

            setBtnState("Waiting...")
            await review.wait()
            setBtnState("Review submitted!")

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully submitted a review!`,
                showConfirmButton: true,
                timer: 4000
            })

            setTimeout(() => {
                setBtnState("")
            }, 1000);

        }
        catch(error){
            console.log(error)
        }
      }


    //  complete job by employer
     const completeJob : FreelancerProps["completeJob"] = async(jobId, address)=>{
        Swal.fire({
            title : "Are you sure?",
            text : "You won't be able to revert this!",
            icon : 'warning',
            showCancelButton : true,
            confirmButtonColor : "#3085d6",
            cancelButtonColor : "#d33",
            confirmButtonText : 'Yes, mark as completed!'      
        }).
        then(async(result)=>{
            if(result.isConfirmed){
                try {
                    setCompleteBtnState("Completing job...")
                    const provider =  new BrowserProvider(connect)
                    const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
                    const signer = await provider.getSigner()

                    const contract = new ethers.Contract(ADDRESS,ABI,signer);

                    const gasLimit = await contract.completeJob
                    .estimateGas(jobId,address,{
                    customData: {
                    gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                    paymasterParams: paymasterParams,
                    },
                });

                    const complete = await contract
                        .completeJob(jobId,address,{
                        maxPriorityFeePerGas: ethers.toBigInt(0),
                        maxFeePerGas: await zksyncProvider.getGasPrice(),
                        gasLimit,
                        customData: {
                        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                        paymasterParams,
                        },
                    });

                    setCompleteBtnState("Waiting...")
                    await complete.wait()
                    setCompleteBtnState("Completed!")

                    // releaseEscrow(jobId,address)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: `You have successfully marked this job as completed!`,
                        showConfirmButton: true,
                        timer: 4000
                    })

                    setTimeout(() => {
                        setCompleteBtnState("")
                    }, 1000);

                } catch (error : any) {
                    setCompleteBtnState("")
                    if(error.message.includes('JDE')){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            text: `Job does not exist`,
                            showConfirmButton: true,
                            timer: 4000
                        })
                    }
                    else if(error.message.includes('FNH')){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            text: `Freelancer is not hired for this job!`,
                            showConfirmButton: true,
                            timer: 4000
                        })
                    }
                    else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            text: `An error occured!`,
                            showConfirmButton: true,
                            timer: 4000
                        })
                    }
                    
                }
            }
        })
       
     }


    //  navbar togglr
    const toggleNav : FreelancerProps["toggleNav"] = async()=>{
        const element = document.querySelector('.none-nav')
        if (element) {
            element.classList.toggle('block-nav')
        }
     }
       

    //  withdraw earnings by freelancer
    const withdrawEarnings : FreelancerProps["withdrawEarnings"] = async()=>{
        try {
            setBtnState("Withdrawing...")
            const provider =  new BrowserProvider(connect)
            const zksyncProvider = new Provider("https://sepolia.era.zksync.dev")
            const signer = await provider.getSigner()

            const contract = new ethers.Contract(ADDRESS,ABI,signer);

            const gasLimit = await contract.withdrawEarnings
            .estimateGas({
            customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
            },
            });

            const withdraw = await contract
                .withdrawEarnings({
                maxPriorityFeePerGas: ethers.toBigInt(0),
                maxFeePerGas: await zksyncProvider.getGasPrice(),
                gasLimit,
                customData: {
                gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                paymasterParams,
                },
            });

            setBtnState("Waiting...")
            await withdraw.wait()
            setBtnState("Withdrawn!")

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `You have successfully withdrawn your funds!`,
                showConfirmButton: true,
                timer: 4000
            })

            setTimeout(() => {
                setBtnState("")
            }, 1000);
            
        } catch (error : any) {
            setBtnState("")
            if(error.message.includes('No balance to withdraw')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `Sorry, your balance is empty`,
                    showConfirmButton: true,
                    timer: 4000
                })
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    text: `An error occured!`,
                    showConfirmButton: true,
                    timer: 4000
                })
                console.log(error);
                
            }
        }
    }

    // get employer escrow
    const retrieveEscrow : FreelancerProps["retrieveEscrow"] = async(jobId)=>{
        try {
            const provider =  new BrowserProvider(connect)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer);
            const tx = await contract.getEmployerEscrow(account,jobId.toString())
            const escrow =  ethers.formatUnits(tx.toString(), 'ether')
            setJobEscrow(escrow)
        } catch (error) {
            console.log(error);
            
        }
    }

    // get single job by id
    const retrieveJob : FreelancerProps["retrieveJob"] = async(jobId)=>{
        try {
            const provider =  new BrowserProvider(connect)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer);
            const job = await contract.getJobByID(jobId.toString())
            let item = {
                id :  job.id,
                employer : job.employer,
                description : job.description,
                title : job.title,
                budget : ethers.formatEther(job.budget.toString()),
                completed : job.completed,
                applicants : job.applicants,
                hiredFreelancer : job.hiredFreelancer
        }
            setSingeJob(item)
        } catch (error) {
            console.log(error);
            
        }
    }

    // get all jobs
    const retrieveAllJobs : FreelancerProps["retrieveAllJobs"] = async()=>{
        try {
            const provider =  new BrowserProvider(connect)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer);
            const jobs = await contract.allJobs()
            const data = await Promise.all(jobs.map((job :any)=>{
                let item = {
                    id :  job.id,
                    employer : job.employer,
                    description : job.description,
                    title : job.title,
                    budget : ethers.formatEther(job.budget.toString()),
                    completed : job.completed,
                    applicants : job.applicants,
                    hiredFreelancer : job.hiredFreelancer
                }

                return item
            }))
            // console.log(jobs);
            
            setJobs(data)
        } catch (error) {
            console.log(error);
            
        }
    }

    // get all jobs by currrent employerp
    const retrieveJobsByEmployer : FreelancerProps["retrieveJobsByEmployer"] = async(address)=>{
        retrieveAllJobs()
        if (jobs) {
            const filteredJobs = await jobs.filter((job : any) => Number(job.employer) === Number(address));
            const data = await Promise.all(filteredJobs.map((job :any)=>{
                let item = {
                    id :  job.id,
                    employer : job.employer,
                    description : job.description,
                    title : job.title,
                    budget : job.budget,
                    completed : job.completed,
                    applicants : job.applicants,
                    hiredFreelancer : job.hiredFreelancer
                }
    
                return item
            }))
            
            setJobs(data)
        }
       
       

    }

    // get all uncompleted jobs by current employer
    const retrieveUncompletedJobsByEmployer : FreelancerProps["retrieveUncompletedJobsByEmployer"] = async(address)=>{
        retrieveJobsByEmployer(address)
        if (jobs) {
            const filteredJobs = jobs.filter((job : any) => job.completed == false);
            const data = await Promise.all(filteredJobs.map((job :any)=>{
                let item = {
                    id :  job.id,
                    employer : job.employer,
                    description : job.description,
                    title : job.title,
                    budget :job.budget,
                    completed : job.completed,
                    applicants : job.applicants,
                    hiredFreelancer : job.hiredFreelancer
                }
    
                return item
            }))
            setJobs(data)
        }
       
    }

    // get all jobs where freelancer is hired 
    const getFreelancerHiredJobs : FreelancerProps["retrieveJobsByEmployer"] = async(address)=>{
        retrieveAllJobs()
        if(jobs){
            const filteredJobs = jobs.filter((job : any) => Number(job.hiredFreelancer) == Number(address));
            const data = await Promise.all(filteredJobs.map((job :any)=>{
                let item = {
                    id :  job.id,
                    employer : job.employer,
                    description : job.description,
                    title : job.title,
                    budget : job.budget,
                    completed : job.completed,
                    applicants : job.applicants,
                    hiredFreelancer : job.hiredFreelancer
                }
    
                return item
            }))
            setJobs(data)
        }
       
    }

    // handle profile image uploading to IPFS
    const profileImageHandler = async function(e : any){
        let file = e.target.files[0]
        try {
            setMessage("Please wait, uploading to IPFS..")
            const response = await uploadFileToIPFS(file)
            setProfileImage(response.pinataURL)
            setMessage("Done uploading!")

            setTimeout(() => {
                setMessage("")
            }, 3000);
        } catch (error) {
            setMessage("Error uploading, please try agaain!")
            console.log(error);
        }
    }

    // handle gig image uploading to IPFS
    const gigImageHandler = async function(e : any){
        let file = e.target.files[0]
        try {
            setMessage("Please wait, uploading to IPFS..")
            const response = await uploadFileToIPFS(file)
            setGigImage(response.pinataURL)
            setMessage("Done uploading!")

            setTimeout(() => {
                setMessage("")
            }, 3000);
        } catch (error) {
            setMessage("Error uploading, please try agaain!")
            console.log(error);
        }
    }

    // get all registered freelancers
    const allFreelancers : FreelancerProps["allFreelancers"] = async ()=>{
        try {
            const provider =  new BrowserProvider(connect)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer);
            const freelancers = await contract.getAllFreelancers()
           setFreelancers(freelancers)
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
        <FREELANCER_CONTEXT.Provider
        value={{
            account,
            freelancerBal,
            employerBal,
            connectWallet,
            freelancerForm,
            setFreelancerForm,
            registerFreelancer,
            employerForm,
            setEmployerForm,
            registerEmployer,
            jobCreationForm,
            reviewForm,
            setReviewForm,
            setJobCreationForm,
            createJob,
            applyJob,
            hireFreelancer,
            depositFunds,
            completeJob,
            releaseEscrow,
            withdrawEarnings,
            retrieveJob,
            profileImageHandler,
            gigImageHandler,
            freelancerDetails,
            currentEmployerDetails,
            currentFreelancerDetails,
            employerDetails,
            allFreelancers,
            freelancers,
            retrieveAllJobs,
            jobs,
            retrieveJobsByEmployer,
            retrieveUncompletedJobsByEmployer,
            getFreelancerHiredJobs,
            retrieveEscrow,
            jobEscrow,
            singleJob,
            toggleNav,
            sellerId,
            buyerId,
            message,
            btnState,
            escrowBtnState,
            completeBtnState,
            testjobs,
            applicantDetails,
            applicantDetailsFunc,
            submitReview
        }}
        >
            {children}
        </FREELANCER_CONTEXT.Provider>
    )

}
