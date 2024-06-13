import AllJobs from "../../components/AllJobs"
import Footer from "../../components/Footer"
import JobListing from "../../components/JobListing"
import MobileNavbar from "../../components/MobileNavbar"
import Navbar from "../../components/Navbar"

function ListingPage(){
    return (
        <main className="wrapper ovh">
            <Navbar />
            <MobileNavbar />
            <div className="body_content">
               <JobListing />
               <AllJobs />
                <Footer />
            </div>
        </main>
    )
}

export default ListingPage