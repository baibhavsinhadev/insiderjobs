const Loader = ({ text = "LOADING..." }) => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
            <div className="flex items-end gap-2">
                {[0, 1, 2, 3, 4].map((item) => (
                    <span key={item} className="w-2.5 h-12 rounded-full bg-blue-600" style={{
                        animation: `wave 0.9s ease-in-out ${item * 0.12}s infinite`,
                    }} />
                ))}
            </div>

            <p className="mt-6 text-sm font-medium tracking-[0.3em] text-gray-500 animate-pulse">
                {text}
            </p>
        </div>
    );
};

export default Loader;