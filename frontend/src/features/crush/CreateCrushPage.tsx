import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import type { CrushCreate } from "./types";
import { createCrushPage } from "./api";
import TopNav from "@components/common/TopNav";
import {
  crushTemplates,
  findCrushTemplate,
  type CrushTemplateKey,
} from "./templates";

const defaultTemplate = crushTemplates[0];

export default function CreateCrushPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CrushTemplateKey>(
    defaultTemplate.key,
  );
  const [form, setForm] = useState<CrushCreate>(defaultTemplate.defaultValues);
  const [pageId, setPageId] = useState<string | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => createCrushPage(form),
    onSuccess: (data) => {
      setPageId(data.page_id);
      setShowLinkModal(true);
    },
  });

  const onTemplateChange = (key: CrushTemplateKey) => {
    const template = findCrushTemplate(key);
    setSelectedTemplate(template.key);
    setForm(template.defaultValues);
    setPageId(null);
  };

  const activeTemplate = findCrushTemplate(selectedTemplate);
  const theme = activeTemplate.defaultValues.theme;
  const previewHero = form.after_yes_gif || form.hero_image;

  useEffect(() => {
    setPreviewError(false);
  }, [previewHero]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="space-y-6">
        <h1 className="text-3xl font-bold font-display text-center">
          LoveMeter Crush Page
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="template">
              Template
            </label>
            <select
              id="template"
              className="px-3 py-2 bg-background rounded-lg border  border-input"
              value={selectedTemplate}
              onChange={(event) =>
                onTemplateChange(event.target.value as CrushTemplateKey)
              }
            >
              {crushTemplates.map((template) => (
                <option key={template.key} value={template.key}>
                  {template.label}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <p className="flex-1">{activeTemplate.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wide">Accent</span>
                <span
                  className="h-5 w-8 rounded"
                  style={{ background: theme.accent }}
                />
                <span className="text-[10px] uppercase tracking-wide">Text</span>
                <span
                  className="h-5 w-8 rounded-lg border  border-border"
                  style={{ background: theme.text }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="title">
                Page title
              </label>
              <input
                id="title"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.title}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    title: event.target.value,
                  }))
                }
                placeholder="Will you be my Valentine?"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="backgroundColor">
                Background color or gradient
              </label>
              <input
                id="backgroundColor"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.theme.background}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    theme: { ...previous.theme, background: event.target.value },
                  }))
                }
                placeholder="linear-gradient(135deg, #ffe3ef, #ffb3d7)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="backgroundImage">
                Background image URL (optional)
              </label>
              <input
                id="backgroundImage"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.theme.background_image ?? ""}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    theme: {
                      ...previous.theme,
                      background_image: event.target.value || undefined,
                    },
                  }))
                }
                placeholder="https://example.com/bg.jpg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="question">
              Main question
            </label>
            <textarea
              id="question"
              className="w-full p-2 bg-background rounded-lg border  border-input"
              value={form.question}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  question: event.target.value,
                }))
              }
              placeholder="Would you go on a cozy date with me?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="yesText">
                Yes button label
              </label>
              <input
                id="yesText"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.yes_text}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    yes_text: event.target.value,
                  }))
                }
                placeholder="Yes, I'd love to"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="noText">
                No button label
              </label>
              <input
                id="noText"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.no_text}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    no_text: event.target.value,
                  }))
                }
                placeholder="Not right now"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="yesMessage">
                Message after Yes
              </label>
              <textarea
                id="yesMessage"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.message_after_yes ?? ""}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    message_after_yes: event.target.value,
                  }))
                }
                placeholder="You just made my day glow."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="noMessage">
                Message after No
              </label>
              <textarea
                id="noMessage"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.message_after_no ?? ""}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    message_after_no: event.target.value,
                  }))
                }
                placeholder="Thanks for being honest."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="heroImage">
              Hero image or GIF URL
            </label>
            <input
              id="heroImage"
              className="w-full p-2 bg-background rounded-lg border  border-input"
              value={form.hero_image ?? ""}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  hero_image: event.target.value,
                }))
              }
              placeholder="https://example.com/image.jpg or .gif"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="afterYesGif">
              After Yes image or GIF URL
            </label>
            <input
              id="afterYesGif"
              className="w-full p-2 bg-background rounded-lg border  border-input"
              value={form.after_yes_gif ?? ""}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  after_yes_gif: event.target.value,
                }))
              }
              placeholder="https://example.com/celebrate.gif"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          <Button onClick={() => mutation.mutate()}>Create Page</Button>
        </div>
        {pageId && showLinkModal && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowLinkModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center outer-pad">
              <Card className="w-full max-w-md">
                <div className="text-lg font-semibold mb-2">Crush page is ready</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Share this link:
                </div>
                <code className="block border border-border px-3 py-2 rounded-lg text-center break-all">
                  {window.location.origin}/crush/{pageId}
                </code>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/crush/${pageId}`,
                      )
                    }
                  >
                    Copy Link
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowLinkModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </Card>
      <Card className="space-y-4">
        <div className="text-sm font-semibold">Live preview</div>
        <div
          className="rounded-2xl border border-border p-6"
          style={{
            background: form.theme.background || theme.background,
            color: form.theme.text,
            backgroundImage: form.theme.background_image
              ? `url(${form.theme.background_image})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center font-display text-2xl font-bold mb-3">
            {form.title || "Your page title"}
          </div>
          {previewHero && (
            <div className="flex justify-center mb-3">
              {!previewError ? (
                <img
                  src={previewHero}
                  alt=""
                  className="max-h-36 rounded-lg"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <div className="text-xs text-muted-foreground text-center">
                  Preview image failed to load. Try a direct GIF link.
                </div>
              )}
            </div>
          )}
          <div className="text-center mb-4">
            {form.question || "Your main question goes here."}
          </div>
          <div className="flex gap-3 justify-center">
            <Button style={{ background: theme.accent, color: "#fff" }}>
              {form.yes_text || "Yes"}
            </Button>
            <Button
              variant="ghost"
              className="border"
              style={{ borderColor: theme.accent, color: theme.accent }}
            >
              {form.no_text || "No"}
            </Button>
          </div>
        </div>
      </Card>
      </div>
      </div>
    </div>
  );
}
