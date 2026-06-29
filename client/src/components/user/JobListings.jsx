import { assets } from "../../assets/assets";
import { JOB_CATEGORIES, JOB_LOCATIONS } from "../../constants/data";
import { useAppContext } from "../../context/AppContext";
import JobCard from "./JobCard";

const JobListings = () => {

    const { searchFilter, isSearched, setSearchFilter, jobs } = useAppContext();

    return (
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
            <div className="w-full lg:w-1/4 bg-white px-4">
                {isSearched && (
                    searchFilter.title !== "" ||
                    searchFilter.location !== ""
                ) && (
                        <>
                            <h3 className="font-medium text-lg mb-4">Current Search</h3>

                            <div className="mb-4 text-gray-600 flex gap-2">
                                {searchFilter.title && (
                                    <div className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 text-blue-500 px-4 py-1.5 rounded">
                                        <span>{searchFilter.title}</span>

                                        <img
                                            onClick={() =>
                                                setSearchFilter((prev) => (
                                                    {
                                                        ...prev,
                                                        title: ""
                                                    })
                                                )}
                                            src={assets.cross_icon}
                                            alt="cross_icon"
                                            className="cursor-pointer"
                                        />
                                    </div>
                                )}

                                {searchFilter.location && (
                                    <div className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-500 px-4 py-1.5 rounded">
                                        <span>{searchFilter.location}</span>

                                        <img
                                            onClick={() =>
                                                setSearchFilter((prev) => (
                                                    {
                                                        ...prev,
                                                        location: ""
                                                    })
                                                )}
                                            src={assets.cross_icon}
                                            alt="cross_icon"
                                            className="cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )
                }

                <div className="max-lg:hidden">
                    <h4 className="font-medium text-lg py-4">Search by Categories</h4>

                    <ul className="space-y-4 text-gray-600">
                        {JOB_CATEGORIES.map((category) => (
                            <li key={category} className="flex gap-3 items-center">
                                <input type="checkbox" />
                                <span>{category}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="max-lg:hidden">
                    <h4 className="font-medium text-lg py-4">Search by Location</h4>

                    <ul className="space-y-4 text-gray-600">
                        {JOB_LOCATIONS.map((location) => (
                            <li key={location} className="flex gap-3 items-center">
                                <input type="checkbox" />
                                <span>{location}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="font-medium text-3xl py-2">Latest jobs</h3>
                <p className="mb-8">Get your desired job from top companies</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default JobListings;