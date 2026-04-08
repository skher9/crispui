// ─── Terms of Service ─────────────────────────────────────────────────────────

export function TermsPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8 pb-6 border-b border-white/[0.07]">
        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 text-sm">Last updated: April 2025</p>
      </div>

      <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-400 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using crispui (the "Library"), you agree to be bound by these Terms of Service.
            If you do not agree, you may not use the Library. These terms apply to all users, contributors,
            and anyone who accesses or uses the Library in any capacity.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">2. License</h2>
          <p>
            crispui is released under the MIT License. You are free to use, copy, modify, merge, publish,
            distribute, sublicense, and sell copies of the software, subject to the following conditions:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.</li>
            <li>The software is provided "as is", without warranty of any kind, express or implied.</li>
            <li>Attribution is appreciated but not required for personal or commercial projects.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">3. Permitted Use</h2>
          <p>You may use crispui to:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>Build personal, commercial, or open-source projects.</li>
            <li>Modify components to suit your needs.</li>
            <li>Include the library in products you sell or distribute.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">4. Prohibited Use</h2>
          <p>You may not:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>Claim crispui as your own original work without modification.</li>
            <li>Resell the library itself as a standalone product without significant modification.</li>
            <li>Use crispui in any manner that violates applicable laws or regulations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">5. Disclaimer of Warranties</h2>
          <p>
            The Library is provided "as is" without warranty of any kind. We make no representations or
            warranties regarding the accuracy, reliability, or completeness of the Library. Your use of
            the Library is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, crispui and its contributors shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising from your use
            of or inability to use the Library, even if advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">7. Contributions</h2>
          <p>
            By submitting a contribution (pull request, issue, or otherwise) to crispui, you agree that
            your contribution will be licensed under the same MIT License that covers the project. You
            confirm that you have the right to submit the contribution.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted on this page
            with an updated date. Continued use of the Library after changes constitutes acceptance of
            the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">9. Contact</h2>
          <p>
            If you have questions about these terms, please open an issue on our GitHub repository.
          </p>
        </section>

      </div>
    </div>
  );
}

// ─── Privacy Policy ───────────────────────────────────────────────────────────

export function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8 pb-6 border-b border-white/[0.07]">
        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 text-sm">Last updated: April 2025</p>
      </div>

      <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-400 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">1. Overview</h2>
          <p>
            crispui is an open-source UI component library. This privacy policy explains what information
            we collect (if any) when you use this documentation site and the library itself. We are committed
            to protecting your privacy and being transparent about our practices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">2. Information We Do Not Collect</h2>
          <p>This documentation site does not:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>Require you to create an account or log in.</li>
            <li>Collect any personally identifiable information.</li>
            <li>Use advertising trackers or third-party analytics.</li>
            <li>Store cookies beyond what is strictly necessary for the site to function.</li>
            <li>Sell, rent, or share any data with third parties.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">3. Library Usage</h2>
          <p>
            crispui as a library runs entirely client-side in your users' browsers. The library itself
            does not make any network requests, does not collect telemetry, and does not phone home.
            Any data handling in your application built with crispui is your responsibility under your
            own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">4. Hosting & Infrastructure</h2>
          <p>
            This documentation site is hosted on Vercel. Vercel may collect standard server access logs
            (IP addresses, request timestamps, browser user agents) as part of normal infrastructure
            operation. Please refer to{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crisp-400 hover:text-crisp-300 underline underline-offset-2"
            >
              Vercel's Privacy Policy
            </a>
            {' '}for details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">5. Google Fonts</h2>
          <p>
            This site loads the Inter font from Google Fonts, which may result in a request to Google's
            servers. Google may log this request. Please refer to{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crisp-400 hover:text-crisp-300 underline underline-offset-2"
            >
              Google's Privacy Policy
            </a>
            {' '}for details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">6. GitHub</h2>
          <p>
            Links to our GitHub repository are provided throughout this site. If you visit GitHub,
            their privacy policy applies. We do not receive any information about visitors who click
            those links.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">7. Children's Privacy</h2>
          <p>
            crispui is a developer tool not directed at children. We do not knowingly collect
            information from anyone under the age of 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be reflected on this page
            with an updated date. Since we collect no personal data, changes are unlikely to affect you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-100 mb-3">9. Contact</h2>
          <p>
            If you have any questions or concerns about this privacy policy, please open an issue on
            our GitHub repository.
          </p>
        </section>

      </div>
    </div>
  );
}
