export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl md:text-5xl font-semibold">
          Privacy Policy
        </h1>

        <p className="mt-4 text-white/50 text-sm">
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        {/* CONTENT */}
        <div className="mt-16 space-y-14 text-white/70 leading-relaxed text-sm">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              1. Introduction
            </h2>
            <p className="mt-4">
              Miutifin (“we”, “our”, or “us”) respects your privacy and is
              committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, store, and protect information when
              you access or use the Miutifin platform (the “Platform”).
            </p>
            <p className="mt-3">
              By using Miutifin, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              2. Data Controller
            </h2>
            <p className="mt-4">
              For the purposes of applicable data protection laws, Miutifin acts
              as the data controller of your personal data. If you have any
              questions regarding this Privacy Policy or our data practices,
              you may contact us at{" "}
              <a
                href="mailto:miutifin.ask@gmail.com"
                className="text-white underline hover:text-white/80"
              >
                miutifin.ask@gmail.com
              </a>.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              3. Personal Data We Collect
            </h2>
            <p className="mt-4">
              We may collect and process the following categories of personal
              data:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong>Identification data</strong>: name, email address, phone
                number.
              </li>
              <li>
                <strong>Usage data</strong>: interactions with the Platform,
                preferences, and feature usage.
              </li>
              <li>
                <strong>Technical data</strong>: device type, browser
                information, IP address (where required for security).
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              4. How We Use Your Data
            </h2>
            <p className="mt-4">
              Your personal data is processed for the following purposes:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>To provide and operate the Platform</li>
              <li>To manage invitations, waitlists, and access requests</li>
              <li>To communicate important service-related information</li>
              <li>To improve and personalize the user experience</li>
              <li>To ensure platform security and prevent misuse</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              5. Legal Basis for Processing
            </h2>
            <p className="mt-4">
              We process personal data based on one or more of the following
              legal grounds:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Your consent</li>
              <li>Performance of a contract or pre-contractual steps</li>
              <li>Compliance with legal obligations</li>
              <li>Legitimate interests, such as platform security and
              improvement</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              6. Data Storage & Security
            </h2>
            <p className="mt-4">
              Personal data is stored using secure infrastructure provided by
              trusted third-party service providers. We implement appropriate
              technical and organizational measures to protect your data
              against unauthorized access, loss, or misuse.
            </p>
            <p className="mt-3">
              Access to personal data is limited to authorized personnel only.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              7. Data Sharing & Third Parties
            </h2>
            <p className="mt-4">
              We do not sell your personal data. Personal data may be shared
              with trusted third-party providers only where necessary to
              operate the Platform (e.g. hosting, authentication, analytics).
            </p>
            <p className="mt-3">
              Any third-party processing is governed by appropriate data
              protection agreements.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              8. Data Retention
            </h2>
            <p className="mt-4">
              We retain personal data only for as long as necessary to fulfill
              the purposes outlined in this Privacy Policy, unless a longer
              retention period is required or permitted by law.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              9. Your Rights
            </h2>
            <p className="mt-4">
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Restrict or object to processing</li>
              <li>Withdraw consent at any time</li>
              <li>Request data portability</li>
            </ul>
            <p className="mt-3">
              Requests can be made by contacting us at the address provided
              below.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              10. Cookies
            </h2>
            <p className="mt-4">
              Miutifin uses cookies and similar technologies to ensure the
              Platform functions correctly and to improve user experience.
              Further information is available in our Cookie Policy.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              11. Changes to This Policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. Changes will
              be published on this page and are effective upon posting.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              12. Contact
            </h2>
            <p className="mt-4">
              For questions, requests, or concerns regarding this Privacy
              Policy, please contact us at{" "}
              <a
                href="mailto:miutifin.ask@gmail.com"
                className="text-white underline hover:text-white/80"
              >
                miutifin.ask@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
