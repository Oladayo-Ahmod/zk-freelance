"use client"
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

function HomeBanner(){
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
      }, []);
    return(
        <section className="home-one p-0 space-maintain-1 bg-overlay">
        <div className="container-fluid px-0">
            <div className="row">
                <div className="col-lg-12">
                    <div className="main-banner-wrapper home1_style">
                        <div className="banner-style-one dots_none nav_none owl-theme owl-carousel">
                            <div className="slide slide-one" style={{'backgroundImage' :' url(images/home/home-1.jpg)'}}></div>
                            {/* <div className="slide slide-one" style={{'backgroundImage' :' url(images/home/home-1.jpg)'}}></div> */}
                        </div>
                        <div className="carousel-btn-block banner-carousel-btn">
                            <span className="carousel-btn left-btn"><i className="fas fa-chevron-left left"></i></span>
                            <span className="carousel-btn right-btn"><i className="fas fa-chevron-right right"></i></span>
                        </div>
                         {/* /.carousel-btn-block banner-carousel-btn  */}
                    </div>
                     {/* /.main-banner-wrapper  */}
                </div>
            </div>
        </div>
        <div className="home1-banner-content">
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 col-xxl-7">
                        <div className="position-relative">
                            <h3 className="banner-title" data-aos="zoom-in">
                                Decentralized Talent Exchange: Empowering Freelancers and Clients in a Borderless Marketplace
                            </h3>
                            <p className="banner-text text-white ff-heading mb25" data-aos="zoom-in-up">Explore boundless possibilities beneath your fingertips.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default HomeBanner