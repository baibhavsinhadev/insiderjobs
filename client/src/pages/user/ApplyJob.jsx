/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { Footer, Loader, Navbar } from "../../components/components";
import { assets } from "../../assets/assets";
import { formatCTC, formatTimeAgo } from "../../utils/utils";

const ApplyJob = () => {

    const { jobId } = useParams();
    const { jobs } = useAppContext();

    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch Job Data
    const fetchJobData = async () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setJobData(jobs.find((job) => job._id === jobId));
        }, 200);
    };

    useEffect(() => {
        fetchJobData();
    }, [jobs, jobId]);

    if (loading) {
        return (
            <Loader text="LOADING JOB DATA..." />
        );
    };

    if (!jobData || jobData.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-md text-center">
                    <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-50">
                        <img src={assets.question_mark} alt="question_mark" className="w-12" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">Job Not Found</h1>
                    <p className="mt-3 text-gray-500 leading-relaxed">The job you're looking for doesn't exist, may have been removed, or the link is invalid.</p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link to={-1} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                            Go Back
                        </Link>

                        <Link to="/" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                            Browse Jobs
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const jobStats = [
        { label: "Company Name", image: assets.suitcase_icon, value: jobData.companyId.name },
        { label: "Job Location", image: assets.location_icon, value: jobData.location },
        { label: "Job Level", image: assets.person_icon, value: jobData.level },
        { label: "CTC", image: assets.money_icon, value: `${formatCTC(jobData.salary)}` }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
                <div className="bg-white text-black rounded-lg w-full">
                    <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
                        <div className="flex flex-col md:flex-row items-center">
                            <img src={jobData.companyId.image} alt={jobData.companyId.name} className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200" />

                            <div className="text-center md:text-left text-neutral-700">
                                <h1 className="text-2xl sm:text-4xl font-medium">{jobData.title}</h1>

                                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                                    {jobStats.map(({ label, image, value }) => (
                                        <span className="flex items-center gap-1" key={label}>
                                            <img src={image} alt={label} />
                                            {value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
                            <button className="bg-blue-600 p-2.5 px-10 text-white rounded">
                                Apply Now
                            </button>

                            <p className="mt-1 text-gray-600">Posted {formatTimeAgo(jobData.createdAt)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-start">
                        <div className="w-full lg:w-2/3">
                            <h2 className="font-bold text-2xl mb-4">Job description</h2>
                            
                            <div className="rich-text" dangerouslySetInnerHTML={{ __html: jobData.description }} />

                            <button className="bg-blue-600 p-2.5 px-10 text-white rounded mt-10">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ApplyJob;