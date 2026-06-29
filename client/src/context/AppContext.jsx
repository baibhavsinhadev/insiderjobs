import { useClerk } from "@clerk/react";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useClerk();

    const [isSearched, setIsSearched] = useState(false);
    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: ""
    });

    const value = {
        user, navigate, location, searchFilter, setSearchFilter,
        isSearched, setIsSearched
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