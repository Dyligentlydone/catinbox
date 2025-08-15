
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">New Website</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <button className="md:hidden text-2xl">☰</button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Our Website</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
            We're building something amazing. Stay tuned for updates as we develop this site.  
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Get Started
            </button>
            <button className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-auto">
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} New Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
