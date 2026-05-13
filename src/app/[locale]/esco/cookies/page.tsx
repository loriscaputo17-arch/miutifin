"use client";

import { ESCO_STYLES } from "@/components/esco/styles";
import { EscoNavbar } from "@/components/esco/Navbar";
import { EscoFooter } from "@/components/esco/Footer";

export default function CookiesPage() {
  return (
    <div className="esco-root">
      <style>{ESCO_STYLES}</style>
      <div className="esco-grain" />
      <EscoNavbar activePath="/esco/cookies" />

      <main>
        <section className="esco-page-hero">
          <div className="esco-wrap">
            <div className="esco-page-eyebrow">Cookies</div>
            <h1 className="esco-page-title">
              Cookie <em>policy.</em>
            </h1>
            <p className="esco-page-lead">
              How ESCO uses cookies and similar technologies. Short version: as little as possible, only what's needed to make the network work.
            </p>
            <div className="esco-page-meta">
              <span>Last updated <strong>April 28, 2026</strong></span>
              <span>Version <strong>2.1</strong></span>
            </div>
          </div>
        </section>

        <section className="esco-wrap">
          <div className="esco-legal">
            <aside className="esco-legal-toc">
              <div className="esco-legal-toc-label">Sections</div>
              <ul>
                <li><a href="#what">What are cookies</a></li>
                <li><a href="#use">How we use them</a></li>
                <li><a href="#types">Types we use</a></li>
                <li><a href="#third">Third parties</a></li>
                <li><a href="#choices">Your choices</a></li>
                <li><a href="#changes">Changes</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </aside>

            <div className="esco-legal-body">
              <section id="what">
                <h2>What are cookies</h2>
                <p>
                  Cookies are small text files that websites place on your device to remember information about you and your visit. They help us run the network, understand how it's used, and remember preferences between sessions.
                </p>
                <p>
                  We also use similar technologies — local storage, session storage, and pixel-style requests — which we treat under the same policy described here.
                </p>
              </section>

              <section id="use">
                <h2>How we use them</h2>
                <p>
                  ESCO uses cookies for three purposes only:
                </p>
                <ul>
                  <li><strong>Authentication</strong> — to keep you signed in across pages and sessions</li>
                  <li><strong>Preferences</strong> — to remember your city, language and a few interface choices</li>
                  <li><strong>Anonymous analytics</strong> — to understand how the network is used, in aggregate</li>
                </ul>
                <p>
                  We do not use cookies to build advertising profiles, retarget you across the web, or sell information about your behaviour to third parties.
                </p>
              </section>

              <section id="types">
                <h2>Types we use</h2>
                <table className="esco-legal-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>esco_session</td>
                      <td>Authentication</td>
                      <td>30 days</td>
                    </tr>
                    <tr>
                      <td>esco_prefs</td>
                      <td>Interface preferences</td>
                      <td>1 year</td>
                    </tr>
                    <tr>
                      <td>esco_locale</td>
                      <td>Language and city</td>
                      <td>1 year</td>
                    </tr>
                    <tr>
                      <td>_pa_*</td>
                      <td>Anonymous analytics (Plausible)</td>
                      <td>Session</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section id="third">
                <h2>Third parties</h2>
                <p>
                  We use a small number of third-party services, each with cookies of their own:
                </p>
                <ul>
                  <li><strong>Plausible</strong> — privacy-friendly analytics. Doesn't track individuals or use cross-site cookies.</li>
                  <li><strong>Stripe</strong> — only on payment pages. Required for fraud prevention.</li>
                  <li><strong>Cloudflare</strong> — security and performance. Sets a session cookie to identify legitimate traffic.</li>
                </ul>
                <p>
                  We do not use Google Analytics, Facebook Pixel, or any advertising network cookies. Ever.
                </p>
              </section>

              <section id="choices">
                <h2>Your choices</h2>
                <p>
                  Most browsers let you block or delete cookies in settings. Blocking authentication cookies will sign you out and prevent the network from working. Blocking preference cookies will reset your interface choices each visit.
                </p>
                <p>
                  Blocking analytics cookies has no effect on functionality. We don't show consent banners because we use only essential and privacy-preserving cookies — but you're free to opt out at any time through your browser.
                </p>
              </section>

              <section id="changes">
                <h2>Changes to this policy</h2>
                <p>
                  When we change how we use cookies, we update this page and the version number at the top. For meaningful changes, we'll also notify members by email before the change takes effect.
                </p>
              </section>

              <section id="contact">
                <h2>Contact</h2>
                <p>
                  Questions about this policy or how we handle data? Write to <strong>privacy@miutifin.com</strong>. We answer within a few working days.
                </p>
              </section>
            </div>
          </div>
        </section>

        <EscoFooter />
      </main>
    </div>
  );
}