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
            <div className="text-xs text-muted-foreground">
              Last updated: 2026-02-10, (AI-generated)
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                LoveMeter lets you create love quizzes and ask-out pages. The
                content you type is stored so the link can work. We do not
                require accounts, and links are the only access control. Treat
                share links as public.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                What we store
              </h2>
              <p>
                Quiz content: title, description, questions, options, correct
                answers. Quiz results: responses and score. Crush pages: title,
                question text, button labels, messages, theme colors, and
                image/GIF URLs. Anonymous metadata: creation timestamps and
                internal IDs.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                What we do not store
              </h2>
              <p>
                No names, emails, phone numbers, or accounts. No payment data.
                No precise location data.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                How access works
              </h2>
              <p>
                Quiz attempt links use a short quiz ID. Anyone with the link can
                take the quiz. Results links use a private token. Anyone with the
                token can view results. Crush page links use a short page ID.
                Anyone with the link can view the page.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Sharing equals public
              </h2>
              <p>
                If you share a link, the content is visible to anyone who has
                it. Do not put sensitive or private information into quizzes or
                crush pages.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Local storage on your device
              </h2>
              <p>
                Your browser stores recent quizzes in localStorage so you can
                quickly reopen results. This data never leaves your browser
                unless you share links.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Third-party content (images/GIFs)
              </h2>
              <p>
                If you use external image or GIF URLs, your browser loads them
                directly from the host. Those hosts may log requests. Use
                trusted sources.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Retention and deletion
              </h2>
              <p>
                You can delete a quiz and its results from the results page.
                Crush pages currently do not have a delete UI. Contact the
                project owner if you want it removed.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Security basics
              </h2>
              <p>
                We use server-side validation and rate limits to reduce abuse.
                There is no login system, so link secrecy is the main
                protection.
              </p>

              <h2 className="text-foreground font-semibold text-base">
                Questions or removal requests
              </h2>
              <p>Contact the project owner to remove content or ask questions.</p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
