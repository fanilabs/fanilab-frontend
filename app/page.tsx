import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold mb-4 text-primary-600">
            FaniLab 📦🔗
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Blockchain-Powered Logistics & Escrow Delivery Platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">
              🚚 Create Delivery
            </h2>
            <p className="text-gray-600 mb-4">
              Post your delivery request and lock payment in escrow
            </p>
            <Link 
              href="/create-delivery" 
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition"
            >
              Get Started
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">
              🏍️ Find Deliveries
            </h2>
            <p className="text-gray-600 mb-4">
              Browse available delivery jobs and start earning
            </p>
            <Link 
              href="/deliveries" 
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition"
            >
              Browse Jobs
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">
              📊 My Dashboard
            </h2>
            <p className="text-gray-600 mb-4">
              Track your deliveries and manage your account
            </p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Create Request</h3>
              <p className="text-sm text-gray-600">Post your delivery needs</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Lock Payment</h3>
              <p className="text-sm text-gray-600">Secure escrow on blockchain</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Driver Accepts</h3>
              <p className="text-sm text-gray-600">Driver picks up package</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">Package transported</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                5
              </div>
              <h3 className="font-semibold mb-2">Release Payment</h3>
              <p className="text-sm text-gray-600">Instant driver settlement</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
