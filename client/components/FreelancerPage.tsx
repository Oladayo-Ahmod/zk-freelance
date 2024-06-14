"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import { FREELANCER_CONTEXT} from '../context/Marketplace'
import FreelancerProps from "@/app/interfaces/freelancerProps"
import Link from 'next/link'
import Image from 'next/image'

function FreelancerPage({address} : any){
    // import context apis
    const {
        account,hireFreelancer,retrieveUncompletedJobsByEmployer,jobs
        ,applicantDetailsFunc,applicantDetails,employerDetails,currentEmployerDetails,btnState
    } = useContext(FREELANCER_CONTEXT) as FreelancerProps

    useEffect(()=>{
        
        if (account) {
            employerDetails(account) // retrieve current employer details 
            retrieveUncompletedJobsByEmployer(account) // retrieve uncompleted jobs by employer
            if(account !== address.address	){
                applicantDetailsFunc(address.address) 
            }
            
        }
    },[account])
    
    return(
        <>
        {/* breadcumb section */}
        {applicantDetails ? (
         <>

        <section className="breadcumb-section pt-0">
            {/* styles */}
            <style>
                {
                    `
                    .breadcumb-section{
                        background-color: #eafbef;
                        padding-top: 80px !important;
                    }
                    .service-details{
                        background-color : white;
                    }
                    `
                }
            </style>

            {/* render freelancer details  */}
                {applicantDetails ? (

                    <div className="cta-service-v1 freelancer-single-style mx-auto maxw1700 pt120 pt60-sm pb120 pb60-sm bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg">
                {/* <img className="left-top-img wow zoomIn" src="/images/vector-img/left-top.png" alt="" /> */}
                {/* <img className="right-bottom-img wow zoomIn" src="/images/vector-img/right-bottom.png" alt="" /> */}
                <div className="container">
                    <div className="row wow fadeInUp">
                        <div className="col-xl-7">
                            <div className="position-relative">
                                <h2>{applicantDetails.gigTitle}</h2>
                                <div className="list-meta d-sm-flex align-items-center mt30">
                                    <a className="position-relative freelancer-single-style" href="#">
                                        <span className="online"></span>
                                        <Image width={90} height={90} className="rounded-circle w-100 wa-sm mb15-sm"
                                        src={applicantDetails.images['1']} loader={()=>applicantDetails.images['1']} alt="Freelancer Photo" />
                                        </a>
                                    <div className="ml20 ml0-xs">
                                        <h5 className="title mb-1">{applicantDetails.name}</h5>
                                        <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm"><i className="fas fa-star vam fz10 review-color me-2"></i> 4.82 94 reviews</p>
                                        <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                             {applicantDetails.country}</p>
                                        <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                            <i className="flaticon-30-days vam fz20 me-2"></i> Member since {applicantDetails.registration_date}
                                        </p>
                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
                ):
                (
                    <h3 className='text-warning text-center'>User does not exist</h3>
                )
            }
                
        </section>

       
        <section className="service-details pt10 pb90 pb30-md">
                <div className="container">
                    <div className="row wow fadeInUp">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-sm-6 col-xl-3">
                                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                                        <div className="details">
                                            <h5 className="title">Job Success</h5>
                                            <p className="mb-0 text">98%</p>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="service-about">
                                <h4>Description</h4>
                                <p className="text mb30"> {applicantDetails.gitDescription}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-sidebar ms-lg-auto">
                                <div className="price-widget pt25 widget-mt-minus bdrs8">
                                    <h3 className="widget-title">{applicantDetails.starting_price.toString()} <small className="fz15 fw500">BTC</small></h3>
                                    <div className="category-list mt20">
                                        <a className="d-flex align-items-center justify-content-between bdrb1 pb-2" href="#">
                      <span className="text"><i className="flaticon-place text-thm2 pe-2 vam"></i>Location</span> <span
                        className="">{applicantDetails.country}</span>
                    </a>
                                        <a className="d-flex align-items-center justify-content-between bdrb1 pb-2" href="#">
                      <span className="text"><i className="flaticon-30-days text-thm2 pe-2 vam"></i>Member since</span> <span
                        className="">{applicantDetails.registration_date.toString()}</span>
                    </a>
                        <a className="d-flex align-items-center justify-content-between bdrb1 pb-2" href="#">
                      <span className="text"><i className="flaticon-translator text-thm2 pe-2 vam"></i>Languages</span> <span
                        className="">English</span>
                    </a>
                                    </div>
                                    <div className="d-grid">
                                        {currentEmployerDetails?.registered? (
                                            <button className="btn-warning btn btn-sm ud-btn btn-thm"
                                            data-bs-toggle="modal" data-bs-target="#modalId2"
                                            type='button'>Hire Me</button>
                                            ):''
                                        }
                                        {/* <a href="#" className="ud-btn btn-thm"  >Hire Me<i
                        className="fal fa-arrow-right-long"></i></a> */}
                                    </div>
                                </div>
                                <div className="sidebar-widget mb30 pb20 bdrs8">
                                    <h4 className="widget-title">My Skills</h4>
                                    <div className="tag-list mt30">
                                        {applicantDetails.skills.split(',').map((value : string,key : string)=>(
                                            <a href="#" key={key}>{value}</a>
                                        ))}

                                        
                                        {/* Modal Body for hiring freelancer */}
                                        <div className="modal fade" id="modalId2" tabIndex={1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="modalTitleId">Modal title</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        
                                                        {/* render all uncompleted and unhired jobs by employer for hiring */}
                                                       {jobs?.map((job : any)=>(       
                                                        <div className="d-flex justify-content-space-around" key={job.id}>
                                                            {
                                                                job.hiredFreelancer.includes('0x000000000000')?(
                                                                    <>
                                                                     <button className="btn-warning btn btn-sm ud-btn btn-thm"
                                                            type='button'
                                                             onClick={()=>hireFreelancer(job.id.toString(),applicantDetails.freelancerAddress)}>
                                                                {btnState? btnState : 'Hire'}
                                                            </button>
                                                            <p className='text-secondary text-lg mt-3'>{job.title}</p>
                                                                    </>
                                                                )
                                                                :'No active job'
                                                            }
                                                           

                                                        </div>         
                                                         ))}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        </>
            ):
            (
            <>
                <h1 className='text-center'>User not found</h1>
                <Link className='text-center' href={'/'}>Home Page</Link> 
            </>
            )
            }
        </>
            
    )
}

export default FreelancerPage
