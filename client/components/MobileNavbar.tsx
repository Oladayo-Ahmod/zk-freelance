"use client"

import Image from "next/image"
import { useContext, useEffect, useRef, useState } from 'react'
import { FREELANCER_CONTEXT} from '../context/Marketplace'
import FreelancerProps from "@/app/interfaces/freelancerProps"
import { usePathname } from "next/navigation"
import Link from "next/link"

function MobileNavbar(){
    const pathname = usePathname()  
    const modalRef = useRef(null) // bootstrap modal  

    // import context apis
    const {
        account,employerDetails,currentEmployerDetails,withdrawEarnings,setJobCreationForm,employerBal,freelancerBal,
        connectWallet,jobCreationForm,createJob,currentFreelancerDetails,freelancerDetails,toggleNav,btnState
    } = useContext(FREELANCER_CONTEXT) as FreelancerProps

    useEffect(()=>{
        connectWallet()
        if (account) {
            employerDetails(account) // retrieve current employer details 
            freelancerDetails(account) // retrieve current freelancer details 
        }
        
    },[account])

        // bootstrap
        useEffect(()=>{
            require('bootstrap/dist/js/bootstrap.bundle')
        })
    return(

        <div id="page" className="mobilie_header_nav stylehome1">
            <style jsx>
                {`
                    .block-nav{
                        display : block !important;
                        transition : 1s ease;

                    }
                    .none-nav{
                        display : none;
                        transition : 1s ease;
                    }
                    .withdraw-btn{
                        margin-left :20px;
                    }
                `}
            </style>
        <div className="mobile-menu">
            <div className="header bb-white-light">
                <div className="menu_and_widgets">
                    <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                        <a className="mobile_logo" href="#">
                            <Image src="/images/ZF.png" style={{'objectFit':'contain'}} width={120} height={40}  alt="" />
                       </a>
                        <div className="right-side text-end">
                            {/* <a className="text-white" href="page-login.html">join</a> */}
                            <a className="menubar ml30" href="#menu" >
                                <Image src="/images/white-nav-icon.svg" onClick={()=>toggleNav()} width={20} height={20}  alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="posr">
                    <div className="mobile_menu_close_btn"><span className="far fa-times"></span></div>
                </div>
            </div>
        </div>
        {/* mobile-menu  */}

        <nav id="menu" className="none-nav mm-menu mm-menu--offcanvas mm-menu--position-left-front mm-menu--theme-light mm-menu--opened" aria-label="Menu" aria-modal="true" role="dialog">
                
                <div className="mm-panels">
                    <div className="mm-panel mm-panel--noanimation mm-panel--opened" id="mm-1">
                        <div className="mm-navbar">
                            <a className="mm-navbar__title" tabIndex={1} aria-hidden="true">
                            <span className="">Menu</span>
                            </a>
                        </div>
                        <ul className="mm-listview">

                        {/* home page */}
                        <li className="mm-listitem" >
                        <Link style={{'color' : pathname !== '/'? '#14A800' : 'black'}} 
                            className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text" href={'/'}><span className="title">Home</span></Link>
                        </li>

                        {/* jobs page */}
                        <li className="mm-listitem" >
                            <Link style={{'color' : pathname !== '/'? '#14A800' : 'black'}} 
                            className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text" href={'/job-listing'}><span className="title">Browse Jobs</span></Link>
                        </li>

                        {/* create job functionality for employer */}
                        <li className="mm-listitem">
                            {currentEmployerDetails?.registered?
                            (
                                <button className="btn btn-primary btn-sm text-black" 
                                data-bs-toggle="modal" data-bs-target="#modalId">create job</button>
                            ):(
                                <Link style={{'color' : pathname !== '/'? '#14A800' : 'black'}} 
                                className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text" href={'/become-an-employer'}><span className="title">Join as employer</span></Link>

                            )
                            }
                        </li>

                        {/* created jobs by employer */}
                        <li className="mm-listitem">
                            {currentEmployerDetails?.registered?
                            (
                                <Link style={{'color' : pathname !== '/'? '#14A800' : 'black'}} 
                                    className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text" href={'/my-jobs'}>
                                    <span className="title">My jobs</span>
                                </Link>
                            ):''
                            }
                        </li>

                            {/* employer balance */}
                        <li className="mm-listitem withdraw-btn">
                        {currentEmployerDetails?.registered?
                        (
                            <button className="btn btn-warning" >
                                    <span className="badge bg-primary">{employerBal} ETH</span>
                        </button>
                        ): ''
                        }                        
                        </li>

                        {/* freelancer balance */}
                        <li className="mm-listitem withdraw-btn" >
                        {currentFreelancerDetails?.registered?
                        (
                            
                        <button className="btn btn-warning" >
                                <span className="badge bg-primary">{freelancerBal} ETH</span>
                        </button>
                        ): ''
                        }                        
                        </li>

                        {/* hired jobs link for freelancer */}
                        <li className="mm-listitem" >
                        {currentFreelancerDetails?.registered? (
                                <Link style={{'color' : pathname !== '/'? '#14A800' : 'black'}} 
                                className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text" href={'/hired-jobs'}>Hired jobs</Link>

                                ):
                                (
                                    <Link style={{'color' : pathname !== '/'? '#14A800' : 'black'}} 
                                    className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text" href={'/become-a-freelancer'}>Join as freelancer</Link>
                                )
                            }
                        </li>

                         {/* withdrawal method for freelancer  */}
                       
                        <li className="mm-listitem withdraw-btn" >
                            {currentFreelancerDetails?.registered == true && currentFreelancerDetails.balance.toString() > 0 ?
                            (
                                
                                <button className="btn btn-warning text-success mb-2" type="button" onClick={()=>withdrawEarnings()}>
                                    {btnState? btnState : 'Withdraw'}
                            </button>
                            ): ''
                            }
                        </li>

                        {/* connect wallet functionality */}
                        <li className="mm-listitem" >
                            <button style={{
                                'color' : pathname !== '/'? '#14A800' : 'white',
                                'backgroundColor' : pathname !== '/' ? 'rgb(224 255 224)' : 'green', 'border' : 'none'}}
                            className="ud-btn btn-white add-joining" type="button" onClick={connectWallet}>
                            {account ? `${account.slice(0,6)}...${account.slice(account.length -4)}` : 'connect wallet'}
                            </button>
                        </li>    
                    </ul>
                    </div>
                </div>
            </nav>
        

          {/* Modal  */}
          <div className="modal fade"  ref={modalRef} id="modalId" tabIndex={1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                        <div className="modal-header">
                                <h5 className="modal-title" id="modalTitleId">Create Job</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                           <div className="mb-3">
                             <label  className="form-label">Company Name</label>
                             <input type="text" className="form-control" placeholder="company name" 
                             aria-describedby="helpId" onChange={(e)=>setJobCreationForm({...jobCreationForm, title : e.target.value})}  />                      
                           </div>
                           <div className="mb-3">
                             <label  className="form-label">Description</label>
                             <input type="text" className="form-control" placeholder="job description" 
                             aria-describedby="helpId" onChange={(e)=>setJobCreationForm({...jobCreationForm, description : e.target.value})}  />                      
                           </div>
                           <div className="mb-3">
                             <label  className="form-label">Budget</label>
                             <input type="number" className="form-control" placeholder="job budget" 
                             aria-describedby="helpId" onChange={(e)=>setJobCreationForm({...jobCreationForm, budget : Number(e.target.value)})}  />                      
                           </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary text-white" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={()=>createJob(modalRef)} className="btn btn-primary text-white">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    

    )
}

export default MobileNavbar