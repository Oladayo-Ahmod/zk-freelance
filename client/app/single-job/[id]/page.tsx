import Footer from "../../../components/Footer"
import JobListing from "../../../components/JobListing"
import MobileNavbar from "../../../components/MobileNavbar"
import Navbar from "../../../components/Navbar"
import SingleJobListing from "../../../components/SingleJobListing"


function SingleJob({params} : {
    params : {
        id : number
    }
}){
    return (
        <main className="wrapper ovh">
              {/* <div className="preloader"></div> */}
            <Navbar />
            <MobileNavbar />
            <div className="body_content">
               <JobListing />
               <SingleJobListing  id = {params} />
                <Footer />
            </div>
        </main>
    )
}

export default SingleJob