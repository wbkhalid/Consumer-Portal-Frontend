const PrivacyPolicyPage = () => {
  return (
    <>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white  py-2!">
        <div className="flex items-center gap-1  px-4!">
          <p className="text-(--primary) font-semibold">
            Privacy & Security Policy
          </p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            Last Updated: December 19, 2025
          </p>
        </div>
        <div className="relative">
          <div className="h-[calc(100vh-100px)] overflow-auto px-4! mt-2!">
            <p className="text-gray-700 leading-relaxed mb-6">
              <b>Consumer Protect</b> is an official government application
              designed to help citizens file, track, and resolve consumer-rights
              complaints. We are committed to protecting your privacy and
              ensuring the highest standards of security for your personal
              information. This policy explains how we collect, use, store, and
              protect your data while using the Consumer Protect mobile app and
              web dashboard.
            </p>

            {/* Section */}
            <Section title="1. Information We Collect">
              <p>
                We collect only the information necessary to process and manage
                consumer complaints effectively.
              </p>

              <SubSection title="1.1 Personal Information">
                <ul className="list-disc! pl-5! space-y-1!">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Residential or business address</li>
                  <li>Profile details</li>
                </ul>
              </SubSection>

              <SubSection title="1.2 Complaint-Related Information">
                <ul className="list-disc! pl-5! space-y-1">
                  <li>Complaint description and category</li>
                  <li>Images, videos, or documents submitted as evidence</li>
                  <li>Location (if you choose to enable location services)</li>
                  <li>Assigned officer notes and status updates</li>
                </ul>
              </SubSection>

              <SubSection title="1.3 App & Device Information">
                <ul className="list-disc! pl-5! space-y-1">
                  <li>Device type and operating system</li>
                  <li>App usage statistics</li>
                  <li>Log data and crash reports</li>
                  <li>IP address</li>
                  <li>Browser information (for web dashboard users)</li>
                </ul>
              </SubSection>
            </Section>

            <Section title="2. How We Use Your Information">
              <ul className="list-disc! pl-5! space-y-1">
                <li>Registering and verifying your identity</li>
                <li>
                  Submitting, assigning, processing, and resolving complaints
                </li>
                <li>Providing status updates and notifications</li>
                <li>Improving service efficiency and user experience</li>
                <li>Ensuring compliance with government regulations</li>
                <li>Preventing fraud or misuse of the system</li>
                <li>Generating anonymized analytics for decision-making</li>
              </ul>
              <p className="mt-3! font-medium text-gray-800">
                We do not sell, trade, or use your personal information for
                commercial purposes.
              </p>
            </Section>

            <Section title="3. Data Sharing & Disclosure">
              <ul className="list-disc! pl-5! space-y-1">
                <li>Authorized government departments</li>
                <li>Field teams, inspectors, and assigned officers</li>
                <li>Law enforcement agencies (when legally required)</li>
                <li>
                  Technical service providers (hosting, SMS, infrastructure)
                  under strict confidentiality agreements
                </li>
              </ul>
              <p className="mt-2!">
                We do not share your data with unauthorized third parties.
              </p>
            </Section>

            <Section title="4. Location Data">
              <p>
                Location access is optional. If enabled, it may be used to
                identify complaint locations, support map visualization, and
                assist field inspections. You may disable location permissions
                anytime from your device settings.
              </p>
            </Section>

            <Section title="5. Data Security Measures">
              <ul className="list-disc! pl-5! space-y-1">
                <li>End-to-end encrypted communication</li>
                <li>Secure servers compliant with government IT policies</li>
                <li>Role-based access control (RBAC)</li>
                <li>Two-factor authentication for dashboard users</li>
                <li>Regular system audits and vulnerability checks</li>
                <li>Encrypted storage of sensitive information</li>
              </ul>
            </Section>

            <Section title="6. Data Retention">
              <p>
                Your information is retained only as long as necessary to
                resolve complaints, meet legal requirements, and maintain system
                integrity. Data is securely archived or deleted as per
                government regulations.
              </p>
            </Section>

            <Section title="7. User Rights">
              <ul className="list-disc! pl-5! space-y-1">
                <li>Access your complaint history</li>
                <li>Update your profile information</li>
                <li>Request correction of inaccurate data</li>
                <li>Withdraw permissions (location, notifications)</li>
                <li>Report misuse or privacy concerns</li>
              </ul>
            </Section>

            <Section title="8. Third-Party Services">
              <p>
                The application may integrate email services and map/location
                APIs. These services follow their own privacy policies and meet
                government security standards.
              </p>
            </Section>

            <Section title="9. Changes to This Policy">
              <p>
                This policy may be updated periodically. Any changes will be
                posted within the app and dashboard. Continued use indicates
                acceptance of updated terms.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4!">
    <h2 className="font-bold text-(--primary)! mb-2!">{title}</h2>
    <div className="text-gray-700 leading-relaxed! space-y-2">{children}</div>
  </div>
);

const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mt-2!">
    <h3 className="text-sm font-bold text-(--primary) mb-1!">{title}</h3>
    {children}
  </div>
);

export default PrivacyPolicyPage;
