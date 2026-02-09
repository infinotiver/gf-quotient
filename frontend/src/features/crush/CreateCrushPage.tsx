import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import type { CrushCreate } from "./types";
import { createCrushPage } from "./api";

const defaultTheme = {
  background: "hsl(330 24% 92%)",
  accent: "hsl(345 75% 55%)",
  text: "hsl(330 35% 12%)",
};

export default function CreateCrushPage() {
  const [form, setForm] = useState<CrushCreate>({
    title: "LoveMeter",
    subtitle: "A tiny page with a big question",
    question: "Would you go out with me?",
    yes_text: "Yes",
    no_text: "No",
    theme: defaultTheme,
    message_after_yes: "You just made my day.",
    message_after_no: "No worries, thanks for being honest.",
    hero_image: "",
  });
  const [pageId, setPageId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => createCrushPage(form),
    onSuccess: (data) => setPageId(data.page_id),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground outer-pad">
      <Card className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold font-display mb-4">
          LoveMeter Crush Page
        </h1>
        <div className="flex flex-col gap-3">
          <input
            className="w-full p-2 bg-background rounded border border-input"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Title"
          />
          <input
            className="w-full p-2 bg-background rounded border border-input"
            value={form.subtitle}
            onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
            placeholder="Subtitle"
          />
          <textarea
            className="w-full p-2 bg-background rounded border border-input"
            value={form.question}
            onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
            placeholder="Question"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="w-full p-2 bg-background rounded border border-input"
              value={form.yes_text}
              onChange={(e) => setForm((p) => ({ ...p, yes_text: e.target.value }))}
              placeholder="Yes button"
            />
            <input
              className="w-full p-2 bg-background rounded border border-input"
              value={form.no_text}
              onChange={(e) => setForm((p) => ({ ...p, no_text: e.target.value }))}
              placeholder="No button"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              className="w-full p-2 bg-background rounded border border-input"
              value={form.theme.background}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  theme: { ...p.theme, background: e.target.value },
                }))
              }
              placeholder="Background color"
            />
            <input
              className="w-full p-2 bg-background rounded border border-input"
              value={form.theme.background_image || ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  theme: { ...p.theme, background_image: e.target.value },
                }))
              }
              placeholder="Background image URL"
            />
            <input
              className="w-full p-2 bg-background rounded border border-input"
              value={form.theme.accent}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  theme: { ...p.theme, accent: e.target.value },
                }))
              }
              placeholder="Accent color"
            />
            <input
              className="w-full p-2 bg-background rounded border border-input"
              value={form.theme.text}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  theme: { ...p.theme, text: e.target.value },
                }))
              }
              placeholder="Text color"
            />
          </div>
          <input
            className="w-full p-2 bg-background rounded border border-input"
            value={form.hero_image || ""}
            onChange={(e) => setForm((p) => ({ ...p, hero_image: e.target.value }))}
            placeholder="Hero image URL (optional)"
          />
          <textarea
            className="w-full p-2 bg-background rounded border border-input"
            value={form.message_after_yes}
            onChange={(e) =>
              setForm((p) => ({ ...p, message_after_yes: e.target.value }))
            }
            placeholder="Message after Yes"
          />
          <textarea
            className="w-full p-2 bg-background rounded border border-input"
            value={form.message_after_no}
            onChange={(e) =>
              setForm((p) => ({ ...p, message_after_no: e.target.value }))
            }
            placeholder="Message after No"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => mutation.mutate()}>Create Page</Button>
          {pageId && (
            <Button variant="secondary" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/crush/${pageId}`)}>
              Copy Link
            </Button>
          )}
        </div>
        {pageId && (
          <div className="mt-3 text-sm text-muted-foreground">
            Share: {window.location.origin}/crush/{pageId}
          </div>
        )}
      </Card>
    </div>
  );
}
