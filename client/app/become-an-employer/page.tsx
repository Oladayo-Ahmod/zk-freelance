"use client"

import Footer from "../../components/Footer"
import MobileNavbar from "../../components/MobileNavbar"
import Navbar from "../../components/Navbar"
import RegisterEmployer from "../../components/RegisterEmployer"

function BecomeAnEmployer(){
    return (
        <main className="wrapper ovh">
            <Navbar />
            <MobileNavbar />
            <div className="body_content" >
                <RegisterEmployer />
            <Footer />
            </div>
        </main>
    )
}

export default BecomeAnEmployer