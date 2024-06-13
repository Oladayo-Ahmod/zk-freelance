"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import { FREELANCER_CONTEXT} from '../context/Marketplace'
import FreelancerProps from "@/app/interfaces/freelancerProps"
import Link from 'next/link'


function AllJobs(){
    // import context apis
    const {
        account,freelancerDetails,retrieveAllJobs,jobs,applyJob,currentFreelancerDetails
    } = useContext(FREELANCER_CONTEXT) as FreelancerProps

    useEffect(()=>{
        retrieveAllJobs()
        if (account) {
            freelancerDetails(account) // retrieve current freelancer details            
        }   
        // console.log(jobs)     
    },[account,jobs])

    return(
        // all jobs
        <section className="pt30 pb90 bg-white">
            <div className="container">
                <div className="row">
                 

                    <div className="col-lg-9">
                        <div className="row align-items-center mb20">
                            <div className="col-md-6">
                                <div className="text-center text-md-start">
                                    {/* <p className="text mb-0 mb10-sm"><span className="fw500">7,512</span> available services </p> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="page_control_shorting d-md-flex align-items-center justify-content-center justify-content-md-end">
                                    <div className="dropdown-lists d-block d-lg-none me-2 mb10-sm">
                                        <ul className="p-0 mb-0 text-center text-md-start">
                                            <li>
                                                {/* Advance Features modal trigger  */}
                                                <button type="button" className="open-btn filter-btn-left"> <img className="me-2"
                        src="/images/icon/all-filter-icon.svg" alt="" /> All Filter</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {jobs? jobs.map((job : any)=>(
                            <div className="col-sm-6 col-xl-12" key={job.id}>
                            <div className="job-list-style1 bdr1 d-xl-flex align-items-start">
                                <div className="icon d-flex align-items-center mb20">
                                    {/* <img className="wa" src="/images/team/client-1.png" alt="" /> */}
                                    <span className="fav-icon flaticon-star"></span>
                                </div>
                                <div className="details ml20 ml0-xl">
                                    {/* job details */}

                                    <p>{job.description}</p>
                                    <h4 className="mb-3 text-thm">{job.title}</h4>
                                    <p className="list-inline-item mb-0">{job.budget.toString()} ETH</p>
                                    <p className="list-inline-item mb-0 bdrl1 pl15">{job.completed ? 'Expired' : ''}</p>
                                    <p className="list-inline-item mb-0 bdrl1 pl15">Remote</p>
                                    <Link href={'/single-job/'+job.id}>View Job</Link>
                                    {/* check if user is a registered freelancer and not already applied for the job*/}
                                    {currentFreelancerDetails?.registered && !job.applicants.includes(currentFreelancerDetails.freelancerAddress)
                                    && job.hiredFreelancer !== currentFreelancerDetails.freelancerAddress? (
                                        <button className="btn-primary btn-sm btn mx-1 text-white" 
                                        onClick={()=>applyJob(job.id.toString())} type="button">Apply</button>
                                    ): 
                                    currentFreelancerDetails?.registered && job.applicants.includes(currentFreelancerDetails.freelancerAddress)?
                                    (
                                        <i> Applied</i>
                                    )
                                    :
                                    ('')
                                }
                                </div>
                            </div>
                            </div>
                            )):(
                                <h1 className='text-center text-warning'>Fetching jobs...</h1>
                            )
                        }
                           
                           
                        </div>
                   
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AllJobs