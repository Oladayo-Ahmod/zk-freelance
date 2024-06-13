"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import { FREELANCER_CONTEXT} from '../context/Marketplace'
import FreelancerProps from "@/app/interfaces/freelancerProps"


function RegisterFreelancer(){
    
    // import context apis
    const {
        account,registerFreelancer,setFreelancerForm,freelancerForm,profileImageHandler,gigImageHandler,
        freelancerDetails,currentFreelancerDetails,connectWallet,message,btnState
    } = useContext(FREELANCER_CONTEXT) as FreelancerProps

    useEffect(()=>{
        connectWallet()
        if (account) {
            freelancerDetails(account) // retrieve freelancer details
        }
        
    })
    return (
        <section className="our-register" style={{'backgroundColor' : '#EAFBEF'}}>

            <style jsx>
                {
                    `
                    .visible-list a{
                        color : #116E04;
                    }
                    `
                }
            </style>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
                    <div className="main-title text-center">
                        <h2 className="title">Register as a Freelancer</h2>
                        {/* <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus illo.</p> */}
                    </div>
                </div>
            </div>
            <div className="row wow fadeInRight" data-wow-delay="300ms">
                <div className="col-xl-6 mx-auto">
                    <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                        <div className="mb30">
                            <h4> {currentFreelancerDetails?.registered? "Your Profile Information" : "Let's create your account!"}</h4>
                        </div>

                        {/* username */}
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">Username</label>
                            {currentFreelancerDetails?.registered ? (
                                <input type="text" readOnly={currentFreelancerDetails?.registered} 
                                value={currentFreelancerDetails.name}
                                className="form-control" placeholder="jonedoe"  />
                            )
                            :
                            (
                                <input type="text"
                                 onChange={(e)=>setFreelancerForm({...freelancerForm, name : e.target.value})} 
                                className="form-control" placeholder="jonedoe"  />
                            )
                        }
                            
                        </div>

                        {/* country */}
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">Country</label>
                            {currentFreelancerDetails?.registered? (
                                <input type="text" readOnly={currentFreelancerDetails?.registered} 
                                value={currentFreelancerDetails.country}
                                className="form-control" placeholder="Nigeria" />
                            )
                            :(
                                <input type="text"
                                onChange={(e)=>setFreelancerForm({...freelancerForm, country : e.target.value})} 
                                className="form-control" placeholder="Nigeria" />
                            )
                        }
                            
                        </div>

                        {/* gig title */}

                        <div className="mb25">
                            <label className="form-label fw500 dark-color">Gig Title</label>
                            {currentFreelancerDetails?.registered? (
                                <input type="text" readOnly={currentFreelancerDetails?.registered} 
                                value={currentFreelancerDetails.gigTitle}
                                className="form-control" placeholder="I will build a dApp" />
                            )
                            :(
                                <input type="text"
                                onChange={(e)=>setFreelancerForm({...freelancerForm, gitTitle : e.target.value})} 
                                className="form-control" placeholder="I will build a dApp" />
                            )
                        }
                            
                        </div>

                        {/* starting price */}
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">Starting Price</label>
                            {currentFreelancerDetails?.registered? (
                                <input type="number" readOnly={currentFreelancerDetails?.registered} 
                                value={Number(currentFreelancerDetails.starting_price)}
                                className="form-control" />
                            )
                            :(
                                <input type="number"
                                onChange={(e)=>setFreelancerForm({...freelancerForm, starting_price : Number(e.target.value)})} 
                                className="form-control" placeholder="e.g 0.01 ETH" />
                            )
                        }
                            
                        </div>

                        {/* gig description */}
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">Gig Description</label>
                            {currentFreelancerDetails?.registered? (
                                <input type="text" readOnly={currentFreelancerDetails?.registered} 
                                value={currentFreelancerDetails.gitDescription}
                                className="form-control" />
                            )
                            :(
                                <input type="text"
                                onChange={(e)=>setFreelancerForm({...freelancerForm, gitDesc : e.target.value})} 
                                className="form-control" placeholder="dApp description" />
                            )
                        }
                        </div>

                        {/* skills */}
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">Skills</label>
                            {currentFreelancerDetails?.registered ? (
                            <input type="text" readOnly={currentFreelancerDetails?.registered}
                            onChange={(e)=>setFreelancerForm({...freelancerForm, skills : e.target.value})} 
                            value={currentFreelancerDetails?.registered? currentFreelancerDetails.skills : ''}
                            className="form-control" placeholder="Solidity, Javascript, Python" />
                            ):
                            (
                                <input type="text"
                                onChange={(e)=>setFreelancerForm({...freelancerForm, skills : e.target.value})} 
                                className="form-control" placeholder="Solidity, Javascript, Python" />
                            )
                        }
                        </div>

                        {/* Gig picture */}
                        <div className="mb25" style={{'display' : currentFreelancerDetails?.registered ? 'none' : 'block'}}>
                            <label className="form-label fw500 dark-color">Gig Picture</label>
                            <input type="file" onChange={(e)=>gigImageHandler(e)} className="form-control" />
                        </div>

                        {/* profile picture */}
                        <div className="mb25" style={{'display' : currentFreelancerDetails?.registered ? 'none' : 'block'}}>
                            <label className="form-label fw500 dark-color">Profile Picture</label>
                            <input type="file" onChange={(e)=>profileImageHandler(e)} className="form-control" />
                        </div>
                        <div className='error-message bg-success text-white rounded text-center m-2'><i>{message}</i></div>

                        {/* create button */}
                        <div className="d-grid mb20">
                            <button style={{'display' : currentFreelancerDetails?.registered ? 'none' : 'block'}}
                             className="ud-btn btn-thm default-box-shadow2" disabled={currentFreelancerDetails?.registered}
                              onClick={()=>registerFreelancer()} type="button">{btnState? btnState : 'Create Account'} <i
              className="fal fa-arrow-right-long"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default RegisterFreelancer