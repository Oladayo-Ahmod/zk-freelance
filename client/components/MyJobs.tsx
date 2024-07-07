"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import { FREELANCER_CONTEXT} from '../context/Marketplace'
import FreelancerProps from "@/app/interfaces/freelancerProps"
import Link from 'next/link'

function MyJobs(){
    // import context apis
    const {
        account,retrieveJobsByEmployer,jobs,hireFreelancer,btnState
    } = useContext(FREELANCER_CONTEXT) as FreelancerProps

    useEffect(()=>{
        if (account) {
            retrieveJobsByEmployer(account) // retrieve current employer details
        }        
        console.log(jobs)
    },[account])

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
                            {/* render jobs */}
                            {jobs? jobs.map((job : any)=>(
                            //   {{retrieveEscrow()}}
                            <div className="col-sm-6 col-xl-12" key={job.id}>
                            <div className="job-list-style1 bdr1 d-xl-flex align-items-start">
                                <div className="icon d-flex align-items-center mb20">
                                    {/* <img className="wa" src="/images/team/client-1.png" alt="" /> */}
                                    <span className="fav-icon flaticon-star"></span>
                                </div>
                                <div className="details ml20 ml0-xl">
                                    <p>{job.description}</p>
                                    <h4 className="mb-3 text-thm">{job.title}</h4>
                                    <p className="list-inline-item mb-0">{job.budget.toString()} ETH</p>
                                    <p className="list-inline-item mb-0 bdrl1 pl15">{job.completed ? 'Expired' : (
                                        'Ongoing'
                                        // <button className="btn-warning btn" type='button'
                                        // onClick={()=>completeJob(job.id.toString(),job.hiredFreelancer)}>Mark as completed</button>
                                    )}</p>
                                    <p className="list-inline-item mb-0 bdrl1 pl15">Remote</p>
                                    <Link href={'/single-job/'+job.id}>View Job</Link>
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <h4 className="card-title">Applicants</h4>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            {
                                                job.applicants.map((applicant:any)=>(
                                                    <div className="d-flex" key={applicant}>
                                                        <li className="list-group-item text-primary">
                                                            {`${applicant.slice(0,6)}...${applicant.slice(applicant.length -4)}`}
                                                        </li>
                                                        <Link className="d-flex mt-2" href={'/freelancer/'+applicant}>View Applicant</Link>
                                                        {!job.hiredFreelancer.includes('0x000000000000')? (
                                                            <>
                                                                <p className="mt-2 mx-2">Hired 
                                                                {` ${job.hiredFreelancer.slice(0,6)}...${job.hiredFreelancer.slice(job.hiredFreelancer.length -4)}`}
                                                                </p>
                                                                {/* <Link className='mt-2 text-primary'
                                                                 href={'/chat/'+`buyer@${job.hiredFreelancer?.slice(0,6)}&seller@${account?.slice(0,6)}`}
                                                                 >Enter Chat Room</Link> */}
                                                            </>
                                                           
                                                        ):
                                                        (
                                                         <button className="btn-warning btn m-1"
                                                            type='button'
                                                            onClick={()=>hireFreelancer(job.id.toString(),applicant)}>
                                                           {btnState? btnState : 'Hire'}
                                                        </button>
                                                        )
                                                    }
                                                        
                                                    </div>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    
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
export default MyJobs