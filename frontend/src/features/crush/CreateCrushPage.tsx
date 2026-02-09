import { useState } from "react";
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

  const mutation = useMutation({
    mutationFn: async () => createCrushPage(form),
    onSuccess: (data) => setPageId(data.page_id),
  });

  const onTemplateChange = (key: CrushTemplateKey) => {
    const template = findCrushTemplate(key);
    setSelectedTemplate(template.key);
    setForm(template.defaultValues);
    setPageId(null);
  };

  const activeTemplate = findCrushTemplate(selectedTemplate);
  const theme = activeTemplate.defaultValues.theme;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-2xl space-y-6">
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
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="subtitle">
                Subtitle
              </label>
              <input
                id="subtitle"
                className="w-full p-2 bg-background rounded-lg border  border-input"
                value={form.subtitle ?? ""}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    subtitle: event.target.value,
                  }))
                }
                placeholder="A tiny question with a big heart"
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
              Hero GIF URL
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
              placeholder="https://media.giphy.com/media/..."
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          <Button onClick={() => mutation.mutate()}>Create Page</Button>
          {pageId && (
            <Button
              variant="secondary"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/crush/${pageId}`,
                )
              }
            >
              Copy Link
            </Button>
          )}
        </div>
        {pageId && (
          <div className="text-sm text-muted-foreground">
            Share: {window.location.origin}/crush/{pageId}
          </div>
        )}
      </Card>
      </div>
    </div>
  );
}
