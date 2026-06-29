import { assets } from "../../assets/assets";
import { SOCIAL_LINKS } from "../../constants/data";

const Footer = () => {
    return (
        <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
            <img src={assets.logo} alt="logo" width={160} />

            <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright 2026 © InsiderJobs - All Right Reserved.</p>

            <div className="flex gap-2.5">
                {SOCIAL_LINKS.map(({ label, image }) => (
                    <img src={image} alt={label} key={label} width={38} className="cursor-pointer" />
                ))}
            </div>
        </div>
    );
};

export default Footer;