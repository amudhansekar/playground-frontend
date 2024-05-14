import Link from "next/link";

function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="text-center">
            <h5 className="font-semibold text-lg mb-4">Help</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/get-started">Getting Started</Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h5 className="font-semibold text-lg mb-4">Features</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/stat-tracking">Stat Tracking</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h5 className="font-semibold text-lg mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/about">About the company</Link>
              </li>
              <li>
                <Link href="/resources/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h5 className="font-semibold text-lg mb-4">Resources</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/policies/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/resources/frequently-asked-questions">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>
            &copy; {new Date().getFullYear()} Playground. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
