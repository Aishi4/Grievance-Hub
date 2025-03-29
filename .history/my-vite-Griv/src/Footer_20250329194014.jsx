const Footer = () => {
    return (
        <footer className="w-full bg-emerald-700 text-white py-6">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-semibold">GrievanceHub</h2>
                    <p className="text-sm mt-1">&copy; {new Date().getFullYear()} GrievanceHub. All rights reserved.</p>
                </div>

                <nav className="flex space-x-6 mt-4 md:mt-0">
                    <a href="/about" className="hover:underline">About</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </nav>

                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                        <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                        <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                        <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
