import { Route, Routes } from "react-router-dom";
import { Application, ApplyJob, Home } from "../pages/pages";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:jobId" element={<ApplyJob />} />
            <Route path="/applications" element={<Application />} />
        </Routes>
    );
};

export default UserRoutes;