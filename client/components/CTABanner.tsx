"use client"
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

function CTABanner(){
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
      }, []);
    return (
        <section className="p-0">
        <div className="rounded shadow bg-white cta-banner3 bgc-light-yellow mx-auto maxw1600 pt120 pt60-lg pb90 pb60-lg position-relative overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="mb30" data-aos="fade-up">
                            <div className="main-title" data-aos="fade-up">
                                <h2 className="title">Unlock a universe of freelance <br className="d-none d-xl-block" /> expertise right at your fingertips.</h2>
                            </div>
                        </div>
                        <div className="why-chose-list">
                            <div className="list-one d-flex align-items-start mb30" data-aos="fade-up">
                                <span className="list-icon flex-shrink-0 flaticon-badge"></span>
                                <div className="list-content flex-grow-1 ml20">
                                    <h4 className="mb-1">Get quality work done quickly</h4>
                                    <p className="text mb-0 fz15">Verify a pro's portfolio, client approval, and identity <br className="d-none d-lg-block" /> verification.</p>
                                </div>
                            </div>
                            <div className="list-one d-flex align-items-start mb30" data-aos="fade-up">
                                <span className="list-icon flex-shrink-0 flaticon-money"></span>
                                <div className="list-content flex-grow-1 ml20">
                                    <h4 className="mb-1">Zero charges until you hire</h4>
                                    <p className="text mb-0 fz15">Conduct interviews, discuss rates, and make payments solely <br className="d-none d-lg-block" /> for work you endorse.</p>
                                </div>
                            </div>
                            <div className="list-one d-flex align-items-start mb30" data-aos="fade-up">
                                <span className="list-icon flex-shrink-0 flaticon-security"></span>
                                <div className="list-content flex-grow-1 ml20">
                                    <h4 className="mb-1">Protected and well-secured</h4>
                                    <p className="text mb-0 fz15">Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 customer support if you need it.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img className="cta-banner3-img wow fadeInLeft animated rounded" 
             width={50} height={100} 
            src="/images/home/home-1.jpg" alt="" />
        </div>
    </section>   
    )
}

export default CTABanner