import Footer from "../../components/Footer"
import JobListing from "../../components/JobListing"
import MobileNavbar from "../../components/MobileNavbar"
import MyHiredJobsListing from "../../components/MyHiredJobs"
import Navbar from "../../components/Navbar"

function MyHiredJob(){
    return (
        <main className="wrapper ovh">
              {/* <div className="preloader"></div> */}
            <Navbar />
            <MobileNavbar />
            <div className="body_content">
               <JobListing />
               <MyHiredJobsListing />
                <Footer />
            </div>
        </main>
    )
}

export default MyHiredJob