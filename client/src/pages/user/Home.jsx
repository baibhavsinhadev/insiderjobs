import { AppDownload, Hero, JobListings, Navbar } from "../../components/components";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <JobListings />
            <AppDownload />
        </div>
    );
};

export default Home;