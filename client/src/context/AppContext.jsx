import { createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const value = {};

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