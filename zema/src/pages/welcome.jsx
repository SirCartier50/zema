import { useState } from 'react'
import { CameraIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

const Welcome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg]
                       bg-gradient-to-tr from-[#60a5fa] to-[#a78bfa] opacity-30
                       sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Track and Manage Your Eczema
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Monitor your skin’s progress and scan product labels to avoid flare-ups. 
            A simple tool to help you take control of your condition.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Tracking
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900 hover:underline">
              Learn More →
            </a>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900">
            What you can do with Zema
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-md hover:shadow-lg transition">
              <CameraIcon className="h-10 w-10 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Skin Scan</h3>
              <p className="mt-2 text-gray-600">
                Take a picture of the affected area and track whether your eczema 
                is improving, staying the same, or flaring up.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-md hover:shadow-lg transition">
              <ClipboardDocumentCheckIcon className="h-10 w-10 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Label Scan</h3>
              <p className="mt-2 text-gray-600">
                Scan product ingredient labels to quickly identify potential 
                triggers that could cause flare-ups.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400">Product</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Download</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400">Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center">
            © {new Date().getFullYear()} Mignot Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Welcome
