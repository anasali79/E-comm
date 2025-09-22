import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-blue-50 mt-8 md:mt-16" role="contentinfo">
      <div className="container mx-auto px-6 md:px-8 py-8 md:py-12">
        {/* Top Row - 3 Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-8">
          {/* E-Comm Section */}
          <div>
            <div className="mb-4">
              <Logo size="md" showText={true} />
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it.
            </p>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Since the 1500s, when an unknown printer took a galley of type and scrambled.
            </p>
            <div className="flex space-x-3" role="list" aria-label="Social media links">
              <a
                href="#"
                className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                aria-label="Follow us on Facebook"
                role="listitem"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                aria-label="Follow us on Twitter"
                role="listitem"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                aria-label="Follow us on Instagram"
                role="listitem"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                aria-label="Follow us on LinkedIn"
                role="listitem"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <address className="space-y-2 text-sm text-muted-foreground not-italic">
              <p>E-Comm, 4578</p>
              <p>Marmora Road,</p>
              <p>Glasgow D04 89GR</p>
            </address>
          </div>
        </div>

        {/* Bottom Row - 4 Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Information */}
          <nav aria-label="Information links">
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </nav>

          {/* Service */}
          <nav aria-label="Service links">
            <h4 className="font-semibold mb-4">Service</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </nav>

          {/* My Account */}
          <nav aria-label="Account links">
            <h4 className="font-semibold mb-4">My Account</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </nav>

          {/* Our Offers */}
          <nav aria-label="Offers links">
            <h4 className="font-semibold mb-4">Our Offers</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-border pt-6 md:pt-8 mt-6 md:mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">© 2024 E-Comm. All rights reserved.</p>
            <div className="flex items-center space-x-4" role="list" aria-label="Accepted payment methods">
              <img src="/mastercard-logo.png" alt="Mastercard" className="h-6" role="listitem" />
              <img src="/visa-logo-generic.png" alt="Visa" className="h-6" role="listitem" />
              <img src="/paypal-logo.png" alt="PayPal" className="h-6" role="listitem" />
              <img src="/stripe-logo.png" alt="Stripe" className="h-6" role="listitem" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
