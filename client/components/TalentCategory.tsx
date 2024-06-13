"use client"
// Import necessary components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faCode, faBullhorn, faPen, faMusic, faFilm, faCogs, faCalculator  } from '@fortawesome/free-solid-svg-icons';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react'


function TalentCategory(){
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
      }, []);
    return (
        <section className="pb40-md pb90 bg-white">
        <div className="container">
            <div className="row align-items-center" data-aos="fade-up">
                <div className="col-lg-9">
                    <div className="main-title2">
                        <h2 className="title">Explore talent by category</h2>
                        <p className="paragraph">Find inspiration in 1700+ skills.</p>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="text-start text-lg-end mb-4 mb-lg-2">
                        {/* <a className="ud-btn2" href="page-service-single.html">All Categories<i
            className="fal fa-arrow-right-long"></i></a> */}
                    </div>
                </div>
            </div>
            <div className="row d-none d-lg-flex" data-aos="fade-down">
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="iconbox-style1">
                        <div className="details mt20">
                        <FontAwesomeIcon icon={faPencilAlt } style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Development & IT</h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-right">
                    <div className="iconbox-style1">
                        <div className="details mt20">
                        <FontAwesomeIcon icon={faCode } style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Creative & Design </h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-left">
                    <div className="iconbox-style1">
                        <div className="details mt20">
                        <FontAwesomeIcon icon={faBullhorn} style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Digital Marketing</h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-up">
                    <div className="iconbox-style1">
                        <div className="details mt20">
                        <FontAwesomeIcon icon={faPen} style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Writing & Translation</h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-down">
                    <div className="iconbox-style1">
                        <div className="details mt20">
                        <FontAwesomeIcon icon={faMusic} style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Music & Audio</h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-right">
                    <div className="iconbox-style1">
                        <div className="details mt20">
                        <FontAwesomeIcon icon={faFilm} style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Video & Animation</h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-left">
                    <div className="iconbox-style1">
                        <div className="details mt20 mt-2">
                        <FontAwesomeIcon icon={faCogs} style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Engineering & Architecture</h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-up">
                    <div className="iconbox-style1">
                        <div className="details mt20">
                        <FontAwesomeIcon icon={faCalculator} style={{ width: '100px', color: 'brown' }}/>
                            <p className="text mb5 mt-2">1.800 skills</p>
                            <h4 className="title">Finance & Accounting</h4>
                            <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row d-block d-lg-none">
                <div className="col-lg-12">
                    <div className="slider-outer-dib navi_pagi_top_right slider-5-grid owl-carousel">
                        <div className="item" data-aos="fade-down">
                            <div className="iconbox-style1">
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Development & IT</h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                        <div className="item" data-aos="fade-up">
                            <div className="iconbox-style1">
                                <div className="icon"><span className="flaticon-web-design-1"></span></div>
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Creative & Design </h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="iconbox-style1">
                                <div className="icon"><span className="flaticon-digital-marketing"></span></div>
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Digital Marketing</h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="iconbox-style1">
                                <div className="icon"><span className="flaticon-translator"></span></div>
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Writing & Translation</h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="iconbox-style1">
                                <div className="icon"><span className="flaticon-microphone"></span></div>
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Music & Audio</h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="iconbox-style1">
                                <div className="icon"><span className="flaticon-video-file"></span></div>
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Video & Animation</h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="iconbox-style1">
                                <div className="icon"><span className="flaticon-ruler"></span></div>
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Engineering & Architecture</h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="iconbox-style1">
                                <div className="icon"><span className="flaticon-goal"></span></div>
                                <div className="details mt20">
                                    <p className="text mb5">1.800 skills</p>
                                    <h4 className="title">Finance & Accounting</h4>
                                    <p className="mb-0">Software Engineer, Master of Web and Mobile Development, and More</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default TalentCategory