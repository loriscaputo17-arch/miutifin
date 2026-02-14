export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl md:text-5xl font-semibold">
          Terms & Conditions
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
              These Terms & Conditions (“Terms”) govern your access to and use of
              Miutifin (the “Platform”), including any content, features, and
              services made available through it. By accessing, browsing, or
              using Miutifin in any manner, you acknowledge that you have read,
              understood, and agree to be bound by these Terms.
            </p>
            <p className="mt-3">
              If you do not agree with any part of these Terms, you must not use
              the Platform.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              2. Definitions
            </h2>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>
                <strong>“Platform”</strong> refers to Miutifin, including its
                website, applications, and related services.
              </li>
              <li>
                <strong>“User”</strong> refers to any individual who accesses or
                uses the Platform, whether registered or not.
              </li>
              <li>
                <strong>“Content”</strong> includes all text, images, data,
                listings, events, places, experiences, and other materials
                displayed on the Platform.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              3. Eligibility & Access
            </h2>
            <p className="mt-4">
              Miutifin is a private and curated platform. Access may be limited,
              invite-only, restricted by geographic area, or subject to manual
              approval. We reserve the right, at our sole discretion, to grant,
              deny, restrict, suspend, or revoke access to the Platform at any
              time and without prior notice.
            </p>
            <p className="mt-3">
              You must be legally able to enter into binding agreements in your
              jurisdiction to use the Platform.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              4. Use of the Platform
            </h2>
            <p className="mt-4">
              You agree to use Miutifin in a lawful, respectful, and appropriate
              manner. You must not misuse the Platform, interfere with its
              operation, attempt to access restricted areas, or use automated
              systems to extract data without authorization.
            </p>
            <p className="mt-3">
              Any use of the Platform that could harm Miutifin, other users, or
              third parties is strictly prohibited.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              5. Accounts & Invitations
            </h2>
            <p className="mt-4">
              Certain features of the Platform may require account creation,
              invitation, or verification. You are responsible for maintaining
              the confidentiality of your account credentials and for all
              activities that occur under your account.
            </p>
            <p className="mt-3">
              You agree to provide accurate and up-to-date information and to
              notify us of any unauthorized use of your account.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              6. Content & Experiences
            </h2>
            <p className="mt-4">
              Miutifin curates and presents experiences, events, places, and
              related content for informational and exploratory purposes only.
              We do not organize, host, sponsor, or control the listed
              experiences unless explicitly stated.
            </p>
            <p className="mt-3">
              Availability, accuracy, pricing, and outcomes related to any
              experience are not guaranteed and may change without notice.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              7. User Responsibilities
            </h2>
            <p className="mt-4">
              By using the Platform, you agree not to:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Use the Platform for unlawful or harmful purposes</li>
              <li>Attempt unauthorized access to systems or data</li>
              <li>Submit false, misleading, or abusive information</li>
              <li>Engage in behavior that disrupts the experience of others</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              8. Intellectual Property
            </h2>
            <p className="mt-4">
              All intellectual property rights related to Miutifin, including
              trademarks, branding, design, software, and original content, are
              owned by Miutifin or its licensors.
            </p>
            <p className="mt-3">
              You may not copy, reproduce, distribute, or create derivative
              works without prior written permission.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              9. Limitation of Liability
            </h2>
            <p className="mt-4">
              The Platform is provided on an “as is” and “as available” basis.
              To the maximum extent permitted by law, Miutifin shall not be
              liable for any indirect, incidental, consequential, or special
              damages arising out of or in connection with your use of the
              Platform.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              10. Termination
            </h2>
            <p className="mt-4">
              We reserve the right to suspend or terminate your access to the
              Platform at any time, with or without notice, if you violate these
              Terms or misuse the Platform.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              11. Changes to the Terms
            </h2>
            <p className="mt-4">
              These Terms may be updated from time to time to reflect changes to
              the Platform or applicable laws. Continued use of Miutifin after
              changes are published constitutes acceptance of the revised
              Terms.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              12. Governing Law
            </h2>
            <p className="mt-4">
              These Terms shall be governed by and interpreted in accordance
              with the laws of the applicable jurisdiction, without regard to
              conflict of law principles.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-xl font-medium text-white">
              13. Contact
            </h2>
            <p className="mt-4">
              For any questions or concerns regarding these Terms, please
              contact us at{" "}
              <a
                href="mailto:miutifin.ask@gmail.com"
                className="text-white underline hover:text-white/80"
              >
                miutifin.ask@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
