import { useState } from "react";
import { Footer, Navbar } from "../../components/components";
import { assets, jobsApplied } from "../../assets/assets";
import { formatDate } from "../../utils/utils";

const Application = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [resume, setResume] = useState(null);

    const handleSave = async () => {
        resume && setIsEdit(false);
        setIsEdit(false);
    };

    return (
        <>
            <Navbar />

            <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
                <h2 className="text-xl font-semibold">Your Resume</h2>

                <div className="flex gap-2 mb-6 mt-3">
                    {isEdit ? (
                        <>
                            <label className="flex items-center" htmlFor="resume-upload">
                                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">Select Resume</p>

                                <input type="file" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} id="resume-upload" hidden required />

                                <img src={assets.profile_upload_icon} alt="profile_upload_icon" />
                            </label>

                            <button className="bg-green-100 border border-green-300 text-green-600 rounded-lg px-4 py-2" onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <a href="" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all">
                                Resume
                            </a>

                            <button className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2" onClick={() => setIsEdit(true)}>Edit</button>
                        </div>
                    )}
                </div>

                <h2 className="text-xl font-semibold mb-4">Job Applied</h2>

                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="py-3 px-4 text-left">Company</th>
                            <th className="py-3 px-4 text-left">Job Title</th>
                            <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
                            <th className="py-3 px-4 text-left max-sm:hidden">Date</th>
                            <th className="py-3 px-4 text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobsApplied.map((application, index) => (
                            <tr key={index} className="border border-gray-300 hover:bg-gray-100 cursor-pointer">
                                <td className="py-3 px-4 flex items-center gap-2">
                                    <img src={application.logo} alt={application.company} className="w-8 h-8" />
                                    {application.company}
                                </td>

                                <td className="py-3 px-4">{application.title}</td>
                                <td className="py-3 px-4 max-sm:hidden">{application.location}</td>

                                <td className="py-3 px-4 max-sm:hidden">
                                    {formatDate(application.createdAt)}
                                </td>

                                <td className="py-3 px-4 flex justify-center">
                                    <div
                                        className={`${application.status === "Accepted"
                                            ? "bg-green-100 border border-green-300 text-green-600"
                                            : application.status === "Rejected"
                                                ? "bg-red-100 border border-red-300 text-red-600"
                                                : "bg-blue-100 border border-blue-300 text-blue-600"
                                            } px-4 py-1.5 rounded w-24`}
                                    >
                                        {application.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </>
    );
};

export default Application;