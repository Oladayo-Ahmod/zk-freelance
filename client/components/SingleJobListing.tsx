"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import { FREELANCER_CONTEXT} from '../context/Marketplace'
import FreelancerProps from "@/app/interfaces/freelancerProps"

function SingleJobListing({id} : any){

    const modalRef = useRef(null) // boostrap modal  

    // import context apis
    const {
        account,currentEmployerDetails,employerDetails,singleJob,completeJob,completeBtnState,reviewForm,
        submitReview,
        jobEscrow,retrieveEscrow,retrieveJob,depositFunds,releaseEscrow,btnState,escrowBtnState,setReviewForm,
    } = useContext(FREELANCER_CONTEXT) as FreelancerProps

    useEffect(()=>{        
        retrieveJob(id.id)
        if (account) {
            retrieveEscrow(id.id)
            employerDetails(account) // retrieve employer details
        }
    })

    return(
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
                            {singleJob? (
                            //   {{retrieveEscrow()}}
                            <div className="col-sm-6 col-xl-12">
                            <div className="job-list-style1 bdr1 d-xl-flex align-items-start">
                                <div className="icon d-flex align-items-center mb20">
                                    {/* <img className="wa" src="/images/team/client-1.png" alt="" /> */}
                                    <span className="fav-icon flaticon-star"></span>
                                </div>
                                <div className="details ml20 ml0-xl">
                                    <p>{singleJob.description}</p>
                                    <h4 className="mb-3 text-thm">{singleJob.title}</h4>
                                    <p className="list-inline-item mb-0">{singleJob.budget.toString()} ETH</p>
                                    <p className="list-inline-item mb-0 bdrl1 pl15">{singleJob.completed ? 'Expired' : (
                                        'Ongoing'
                                        // 
                                    )}</p>
                                    {currentEmployerDetails?.registered && 
                                    Number(currentEmployerDetails.employerAddress) == Number(singleJob.employer)
                                    && singleJob.completed == false && Number(jobEscrow) <= 0?
                                    <button className="btn-warning btn" type='button'
                                    onClick={()=>depositFunds(singleJob.id.toString(),singleJob.budget.toString())}>{btnState? btnState : 'Deposit Fund'}</button>
                                    : ''
                                    }
                                    
                                    {/* funding status */}
                                    {Number(jobEscrow) > 0 ?'funded' : ''} 

                                    {/* job location */}
                                    <p className="list-inline-item mb-0 bdrl1 pl15">Remote</p>

                                    {/* job completion */}
                                    {currentEmployerDetails?.registered &&
                                     singleJob?.completed == false && Number(jobEscrow) > 0
                                     && !singleJob.hiredFreelancer.includes('0x000000000000')
                                      ? (
                                        <button className="btn-warning btn text-white" type='button'
                                        onClick={()=>completeJob(singleJob.id.toString(),singleJob.hiredFreelancer)}>{completeBtnState? completeBtnState : 'Mark as completed'}</button>
                                    ): ''
                                }
                                    {/* release funds escrow */}
                                    {currentEmployerDetails?.registered &&
                                     singleJob?.completed == true && Number(jobEscrow) > 0?
                                     
                                     (
                                        <button className="btn-warning btn text-white" type='button'
                                        onClick={()=>releaseEscrow(singleJob.id.toString(),singleJob.hiredFreelancer)}>{escrowBtnState ? escrowBtnState : 'Release Escrow'}</button>
                                     )
                                     :''
                                     }

                                     {/* escrow status */}
                                     {currentEmployerDetails?.registered && 
                                     singleJob?.completed == true && Number(jobEscrow) <= 0 ? 
                                     (
                                        <>
                                          <p className="list-inline-item mb-0 bdrl1 pl15">Escrow released</p>

                                          <button data-bs-toggle="modal" data-bs-target="#reviewModal"
                                          className='btn btn-primary btn-sm text-white'>Give a Review</button>
                                        </>
                                     ) : ''}
                                </div>
                            </div>
                            </div>
                            ):(
                                <h1 className='text-center text-warning'>Fetching job...</h1>
                            )
                        }
                           
                           
                        </div>
                   
                    </div>
                </div>
            </div>

            {/* Review Modal  */}
            <div className="modal fade"  ref={modalRef} id="reviewModal" tabIndex={1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                            <div className="modal-header">
                                    <h5 className="modal-title" id="modalTitleId">Review</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="mb-3">
                                    <label  className="form-label">Comment</label>
                                    <input required type="text" className="form-control" placeholder="comment" 
                                    aria-describedby="helpId" onChange={(e)=>setReviewForm({...reviewForm, comment : e.target.value})}  />                    
                                </div>

                                <div className="mb-3">
                                    <label  className="form-label">Rating</label>
                                    <input type="number" className="form-control" placeholder="0 - 5" min="0" max="5"
                                    aria-describedby="helpId" onChange={(e)=>setReviewForm({...reviewForm, rating : Number(e.target.value)})}  />                      
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary text-white" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={()=>submitReview(modalRef)} className="btn btn-primary text-white">{btnState? btnState : "Create"}</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        
    )
}

export default SingleJobListing