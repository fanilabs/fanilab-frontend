export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FaniLab 📦</h3>
            <p className="text-gray-400">
              Blockchain-powered logistics platform on Stellar
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/create-delivery" className="text-gray-400 hover:text-white">Create Delivery</a></li>
              <li><a href="/deliveries" className="text-gray-400 hover:text-white">Browse Jobs</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Stellar Network</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FaniLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
