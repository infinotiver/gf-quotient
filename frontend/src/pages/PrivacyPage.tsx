import Card from "@components/common/Card";
import Footer from "@components/common/Footer";
import TopNav from "@components/common/TopNav";

export default function PrivacyPage() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground outer-pad">
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
          <TopNav links={[{ label: "Home", to: "/", variant: "ghost" }]} />
          <Card className="space-y-4">
            <h1 className="text-3xl font-bold font-display my-2">Privacy Policy</h1>
            <div className="text-xs text-muted-foreground p-1">
              Last updated: 2026-02-10
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                This Privacy Policy explains how LoveMeter collects, uses, and
                shares information when you use the Service. By using the
                Service, you agree to the collection and use of information in
                accordance with this policy.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Information we collect
              </h2>
              <p>
                Content you provide: quiz titles, questions, options, correct
                answers, responses, scores, and ask-out page content including
                button labels, messages, colors, and image/GIF URLs. We may also
                collect basic usage data such as IP address, device type, and
                browser information for security and analytics.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                How we use information
              </h2>
              <p>
                We use your data to operate and improve the Service, generate
                links, display your content, prevent abuse, and respond to
                requests. We do not sell your data.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Link-based access
              </h2>
              <p>
                Access to quizzes, results, and ask-out pages is controlled by
                links. Anyone with a link can view its content. Do not include
                sensitive or private information in anything you create.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Cookies and local storage
              </h2>
              <p>
                We may use cookies or local storage to remember preferences and
                keep recent links available. You can clear this data in your
                browser settings.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Third-party content
              </h2>
              <p>
                If you include external images or GIFs, your browser loads them
                directly from those providers. Those providers may log requests
                in accordance with their own policies.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Sharing and disclosures
              </h2>
              <p>
                We may share information with service providers who help operate
                the Service, or if required by law, to protect rights and safety,
                or in connection with a business transaction. We only share what
                is necessary.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Retention and deletion
              </h2>
              <p>
                We keep data as long as needed to provide the Service and comply
                with legal obligations. You can delete quizzes and results from
                the results page. Ask-out pages may be removed upon request.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Security
              </h2>
              <p>
                We use reasonable safeguards to protect your data, but no method
                of transmission or storage is completely secure.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Changes to this policy
              </h2>
              <p>
                We may update this policy from time to time. The updated version
                will be posted here with a new effective date.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Contact
              </h2>
              <p>Contact the project owner for questions or removal requests.</p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
