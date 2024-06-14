import Footer from "../../../components/Footer"
import FreelancerPage from "../../../components/FreelancerPage"
import MobileNavbar from "../../../components/MobileNavbar"
import Navbar from "../../../components/Navbar"

function Freelancer({params} : {
    params : {
        address : string
    }
}){
    return (
        <main className="wrapper ovh">
            <Navbar />
            <MobileNavbar />
            <div className="body_content">
                <FreelancerPage address={params} />
                <Footer />
            </div>
        </main>
    )
}

export default Freelancer