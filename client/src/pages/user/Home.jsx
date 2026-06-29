import { AppDownload, Footer, Hero, JobListings, Navbar } from "../../components/components";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <JobListings />
            <AppDownload />
            <Footer />
        </div>
    );
};

export default Home;