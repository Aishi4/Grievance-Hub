const Footer = () => {
    return (
      <footer className="w-full bg-emerald-600 text-white py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} GrievanceHub. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    );
};
ex