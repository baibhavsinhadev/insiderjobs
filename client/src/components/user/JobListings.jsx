/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { JOB_CATEGORIES, JOB_LOCATIONS } from "../../constants/data";
import { useAppContext } from "../../context/AppContext";
import JobCard from "./JobCard";

const JobListings = () => {

    const { searchFilter, isSearched, setSearchFilter, jobs } = useAppContext();

    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const toggleLocation = (location) => {
        setSelectedLocations((prev) =>
            prev.includes(location)
                ? prev.filter((item) => item !== location)
                : [...prev, location]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedLocations([]);
        setSearchFilter({
            title: "",
            location: "",
        });
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesTitle = !searchFilter.title || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

        const matchesSearchLocation = !searchFilter.location || job.location.toLowerCase() === searchFilter.location.toLowerCase();

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);

        const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location);

        return (
            matchesTitle &&
            matchesSearchLocation &&
            matchesCategory &&
            matchesLocation
        );
    });

    const jobsPerPage = 6;
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilter, selectedCategories, selectedLocations]);

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

                <button onClick={() => setShowFilter(!showFilter)} className="px-6 py-1.5 rounded border border-gray-400 lg:hidden">
                    {showFilter ? "Close" : "Filters"}
                </button>

                <div className="max-lg:hidden">
                    <h4 className="font-medium text-lg py-4">Search by Categories</h4>

                    <ul className="space-y-4 text-gray-600">
                        {JOB_CATEGORIES.map((category) => (
                            <li key={category} className="flex gap-3 items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                />

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
                                <input
                                    type="checkbox"
                                    checked={selectedLocations.includes(location)}
                                    onChange={() => toggleLocation(location)}
                                />

                                <span>{location}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <section id="job-list" className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="font-medium text-3xl py-2">Latest jobs</h3>
                <p className="mb-8">Get your desired job from top companies</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {currentJobs.length > 0 ? (
                        currentJobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 text-center border border-gray-200 rounded-xl bg-gray-50">
                            <img src={assets.search_icon} alt="No jobs" className="w-14 h-14 opacity-50 mb-4" />

                            <h3 className="text-xl font-semibold text-gray-800">No Jobs Found</h3>

                            <p className="mt-2 text-gray-500 max-w-md">We couldn't find any jobs matching your current filters. Try changing the category, location, or search keywords.</p>

                            <button onClick={clearFilters} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg">Clear Filters</button>
                        </div>
                    )}
                </div>

                {filteredJobs.length > jobsPerPage && (
                    <div className="flex justify-center items-center gap-2 mt-10">
                        <button disabled={currentPage === 1} onClick={() => { setCurrentPage((p) => p - 1); window.location.replace("#job-list") }} className="disabled:opacity-40">
                            <img src={assets.left_arrow_icon} alt="" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button key={index} onClick={() => { setCurrentPage(index + 1); window.location.replace("#job-list") }} className={`w-10 h-10 rounded border transition ${currentPage === index + 1 ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-100"}`}>
                                {index + 1}
                            </button>
                        ))}

                        <button disabled={currentPage === totalPages} onClick={() => { setCurrentPage((p) => p + 1); window.location.replace("#job-list") }} className="disabled:opacity-40">
                            <img src={assets.right_arrow_icon} alt="" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default JobListings;