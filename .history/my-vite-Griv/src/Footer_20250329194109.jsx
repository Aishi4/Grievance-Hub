const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-8">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Brand Section */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold tracking-wide">GrievanceHub</h2>
                    <p className="text-sm opacity-80 mt-1">
                        &copy; {new Date().getFullYear()} GrievanceHub. All rights reserved.
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-6 text-sm">
                    <a href="/about" className="hover:text-gray-300 transition duration-300">About</a>
                    <a href="/contact" className="hover:text-gray-300 transition duration-300">Contact</a>
                    <a href="/privacy" className="hover:text-gray-300 transition duration-300">Privacy Policy</a>
                </nav>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-6 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                        className="hover:scale-110 transition-transform duration-300">
                        <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                        className="hover:scale-110 transition-transform duration-300">
                        <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                        className="hover:scale-110 transition-transform duration-300">
                        <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="w-full h-0.5 bg-white opacity-20 mt-6"></div>

            {/* Bottom Note */}
            <p className="text-xs text-center opacity-80 mt-4">
                Made with ❤️ by GrievanceHub Team
            </p>
        </footer>
    );
};

export default Footer;
