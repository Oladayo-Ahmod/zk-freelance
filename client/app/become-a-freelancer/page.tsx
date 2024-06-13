"use client"

import Footer from "../../components/Footer"
import MobileNavbar from "../../components/MobileNavbar"
import Navbar from "../../components/Navbar"
import RegisterFreelancer from "../../components/RegisterFreelancer"

function BecomeAFreelancer(){
    return (
        <main className="wrapper ovh">
              {/* <div className="preloader"></div> */}
            <Navbar />
            <MobileNavbar />
            <div className="body_content" >
                <RegisterFreelancer />
            <Footer />
            </div>
        </main>
    )
}

export default BecomeAFreelancer