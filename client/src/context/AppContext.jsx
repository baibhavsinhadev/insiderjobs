/* eslint-disable react-hooks/set-state-in-effect */
import { useClerk } from "@clerk/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jobsData } from "../assets/assets";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useClerk();

    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: ""
    });

    // Fetch Jobs
    const fetchJobs = async () => {
        setJobs(jobsData);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const value = {
        user, navigate, location, searchFilter, setSearchFilter,
        isSearched, setIsSearched, jobs, setJobs
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be provided within AppProvider");
    };

    return context;
};