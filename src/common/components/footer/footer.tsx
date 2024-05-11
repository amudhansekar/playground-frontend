import Link from "next/link";

function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <h5 className="font-semibold text-lg mb-4">Getting Started</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/create-a-player">Creating a player</Link>
              </li>
              <li>
                <Link href="/guides/create-a-game">Creating a game</Link>
              </li>
              <li>
                <Link href="/guides/stream">Stream</Link>
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
            <h5 className="font-semibold text-lg mb-4">Supported Sports</h5>
            <ul className="space-y-2">
              <li>
                <Link href="https://vercel.com/contact/sales?utm_source=next-site&utm_medium=footer&utm_campaign=next-website">
                  Basketball
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h5 className="font-semibold text-lg mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/frequently-asked-questions">FAQ</Link>
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
