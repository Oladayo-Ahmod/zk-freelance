"use client"

import Image from "next/image"
import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/bundle'
import { SwiperSlide } from 'swiper/react'
import { Navigation,Scrollbar,Autoplay } from 'swiper/modules'
import { useContext, useEffect, useRef, useState } from 'react'
import { FREELANCER_CONTEXT} from '../context/Marketplace'
import FreelancerProps from "@/app/interfaces/freelancerProps"
import Link from "next/link"
import 'aos/dist/aos.css';
import AOS from 'aos';
import { ethers } from "ethers"


function PopularService(){
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
      }, []);

    // import context apis
    const {
        allFreelancers,freelancers
    } = useContext(FREELANCER_CONTEXT) as FreelancerProps
    
    // swiperjs library breakpoints
    const breakpoints:Record<number , {slidesPerView :number, spaceBetween? : number}> = {
        320 :{
            slidesPerView : 1,
            spaceBetween : 20
        },
        480 :{
            slidesPerView : 2,
            spaceBetween : 20
        },
        768 :{
            slidesPerView : 3,
            spaceBetween : 30
        },
        1024 :{
            slidesPerView : 4,
            spaceBetween : 40
        }
    }

    useEffect(()=>{
        allFreelancers()
    },[freelancers])
    return (
        
        <section className="pb90 pb30-md bgc-thm3">
            <style>
                {`
                .profile-img{
                    width :30px !important;
                }
                
                `}
            </style>
        <div className="container">
            <div className="row align-items-center" data-aos="zoom-in-up">
                <div className="col-lg-9">
                    <div className="main-title">
                        <h2 className="title">Popular Services</h2>
                        <p className="paragraph">Highly popular and best-selling services of all time.</p>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="text-start text-lg-end mb-4 mb-lg-2">
                        {/* <a className="ud-btn2" href="page-service-single.html">All Categories<i
            className="fal fa-arrow-right-long"></i></a> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                {/* initializing swiper library */}
                <Swiper
                    modules={[Navigation, Scrollbar,Autoplay]}
                    autoplay={{delay: 3000}}
                    slidesPerView={4}
                    breakpoints={{
                        320 :{
                            slidesPerView : 1,
                            spaceBetween : 20
                        },
                        480 :{
                            slidesPerView : 2,
                            spaceBetween : 20
                        },
                        768 :{
                            slidesPerView : 3,
                            spaceBetween : 30
                        },
                        1024 :{
                            slidesPerView : 4,
                            spaceBetween : 40
                        }
                    }}
                >

                    <div className="slider-outer-dib vam_nav_style dots_none slider-4-grid2 owl-carousel owl-theme wow fadeInUp">
                    
                    {/* render all registered freelancers */}
                        {freelancers ? 
                        freelancers.map((freelancer : any)=>(

                           <div key={freelancer.freelancerAddress}>
                            <SwiperSlide >
                            <div className="item">
                                <div className="listing-style1">
                                    <div className="list-thumb">
                                        <Image width={255} height={245} className="w-100" loader={()=>freelancer.images[1]}
                                         style={{'width' : '255px !Important;'}}  src={freelancer.images[1]} alt="Gig Image" />
                                    </div>
                                    <div className="list-content">
                                        {/* <p className="list-text body-color fz14 mb-1">Web & Logo Design</p> */}
                                        <h5 className="list-title"><Link href={'/freelancer/'+freelancer.freelancerAddress}>{freelancer.gigTitle}</Link></h5>
                                        <div className="review-meta d-flex align-items-center">
                                            <i className="fas fa-star fz10 review-color me-2"></i>
                                            {/* <p className="mb-0 body-color fz14"><span className="dark-color me-2">4.82</span>94 reviews</p> */}
                                        </div>
                                        <hr className="my-2" />
                                        <div className="list-meta d-flex justify-content-between align-items-center mt15">
                                            <Link className="d-flex" href={'/freelancer/'+freelancer.freelancerAddress}>
                                            <span className="position-relative mr10">
                                                <Image className="rounded-circle wa profile-img"  loader={()=>freelancer.images['0']}
                                                width={30} height={28} src={freelancer.images['0']} alt="Freelancer Photo" />
                                                <span className="online-badges"></span>
                                            </span>
                                            {/* <span className="fz14">{freelancer.name}</span> */}
                                            </Link>
                                            <div className="budget">    
                                                <p className="mb-0 body-color">Starting at<span className="fz17 fw500 dark-color ms-1">{ethers.formatEther(freelancer.starting_price.toString())}</span><small>ETH</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide >
                           </div>
                        )):
                        (
                           <div>
                            <h1 className="text-warning text-center"> Fetching freelancers... </h1>
                           </div>
                        )
                    }
                       
                        {/* <SwiperSlide >
                        <div className="item">
                            <div className="listing-style1">
                                <div className="list-thumb">
                                    <Image width={255} height={245} className="w-100" src="/images/listings/g-2.jpg" alt="" />
                                    <a href="#" className="listing-fav fz12"><span className="far fa-heart"></span></a>
                                </div>
                                <div className="list-content">
                                    <p className="list-text body-color fz14 mb-1">Art & Illustration</p>
                                    <h5 className="list-title"><a href="page-service-single.html">I will create custom isometric flat  design illustration</a></h5>
                                    <div className="review-meta d-flex align-items-center">
                                        <i className="fas fa-star fz10 review-color me-2"></i>
                                        <p className="mb-0 body-color fz14"><span className="dark-color me-2">4.82</span>94 reviews</p>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="list-meta d-flex justify-content-between align-items-center mt15">
                                        <a className="d-flex" href="#">
                                            <span className="position-relative mr10">
                                                <Image className="rounded-circle wa" width={28} height={28} src="/images/team/fl-s-2.png" alt="Freelancer Photo" />
                                                <span className="online-badges"></span>
                                            </span>
                                            <span className="fz14">Angelica Pan</span>
                                        </a>
                                        <div className="budget">
                                            <p className="mb-0 body-color">Starting at<span className="fz17 fw500 dark-color ms-1">$799</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide > */}


                    </div>
                    </Swiper>
                </div>
            </div>
        </div>
    </section>
    )
}

export default PopularService
