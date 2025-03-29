const Footer = () => {
    return (
      <footer className="bg-blue-600 text-white py-4 mt-10 text-center">
        <div className="container mx-auto">
          <p className="text-sm">&copy; {new Date().getFullYear()} GrievanceHub. All rights reserved.</p>
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  