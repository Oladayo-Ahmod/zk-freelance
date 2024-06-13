function JobListing(){
    return(
        <>
        {/* breadcum section */}
        <section className="breadcumb-section pt-0">
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
        <div className="cta-employee-single cta-banner mx-auto maxw1700 pt120 pt60-sm pb120 pb60-sm bdrs16 position-relative d-flex align-items-center">
            <img className="service-v1-vector at-job bounce-x d-none d-xl-block" src="/images/vector-img/vector-service-v1.png" alt="" />
            <div className="container">
                <div className="row wow fadeInUp">
                    <div className="col-xl-7">
                        <div className="position-relative">
                            <h2>Job Listings</h2>
                            {/* <p className="text">Similique nemo ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
                        </div>
                        <div className="advance-search-tab bgc-white p10 bdrs4 mt30">
                            <div className="row">
                                <div className="col-md-5 col-lg-6 col-xl-6">
                                    <div className="advance-search-field bdrr1 bdrn-sm">
                                        <form className="form-search position-relative">
                                            <div className="box-search bb1-sm">
                                                <span className="icon far fa-magnifying-glass"></span>
                                                <input className="form-control" type="text" name="search" placeholder="What are you looking for?" />
                                                <div className="search-suggestions">
                                                    <h6 className="fz14 ml30 mt25 mb-3">Popular Search</h6>
                                                    <div className="box-suggestions">
                                                        <ul className="px-0 m-0 pb-4">
                                                            <li>
                                                                <div className="info-product">
                                                                    <div className="item_title">mobile app development</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="info-product">
                                                                    <div className="item_title">mobile app builder</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="info-product">
                                                                    <div className="item_title">mobile legends</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="info-product">
                                                                    <div className="item_title">mobile app ui ux design</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="info-product">
                                                                    <div className="item_title">mobile game app development</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="info-product">
                                                                    <div className="item_title">mobile app design</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                              
                                <div className="col-md-3 col-lg-2 col-xl-3">
                                    <div className="text-center text-xl-start">
                                        <a className="ud-btn btn-thm2 w-100 vam" href="#">Search</a>
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


    )
}

export default JobListing