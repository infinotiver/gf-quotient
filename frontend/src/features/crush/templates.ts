import type { CrushCreate } from "./types";

export type CrushTemplateKey = "sparkle" | "starlight" | "sunset" | "radiant";

export const crushTemplates: {
  key: CrushTemplateKey;
  label: string;
  description: string;
  defaultValues: CrushCreate;
}[] = [
  {
    key: "sparkle",
    label: "Sparkle Bloom",
    description: "Blush pink gradient with a wink of confetti.",
    defaultValues: {
      title: "Will you be my Valentine?",
      subtitle: "A tiny question with a big heart",
      question: "Would you go on a cozy date with me?",
      yes_text: "Yes, I'd love to",
      no_text: "Not right now",
      message_after_yes: "You just made my day glow.",
      message_after_no: "Thanks for being honest.",
      hero_image:
        "https://media.giphy.com/media/3oz8xQeB6Jj1U1H7NK/giphy.gif",
      theme: {
        background: "linear-gradient(180deg, #f7e9f8 0%, #ffd6ec 100%)",
        accent: "#ff5fa2",
        text: "#1d0b24",
      },
    },
  },
  {
    key: "starlight",
    label: "Starlight Whisper",
    description: "Midnight blues with tiny twinkling sparks.",
    defaultValues: {
      title: "A starry question, just for you",
      subtitle: "A soft ask under a sky of lights",
      question: "Will you go out with me under the stars?",
      yes_text: "Yes, let's go",
      no_text: "Let's stay friends",
      message_after_yes: "A cosmic yes. I'm over the moon.",
      message_after_no: "I appreciate your honesty.",
      hero_image:
        "https://media.giphy.com/media/3o7TKvRFoB4BvE0C1y/giphy.gif",
      theme: {
        background:
          "radial-gradient(circle at 20% 20%, #7b6bff 0%, #141033 80%)",
        accent: "#f7b8ff",
        text: "#f5f3ff",
      },
    },
  },
  {
    key: "sunset",
    label: "Sunset Haze",
    description: "Warm toasty oranges with a soft glow.",
    defaultValues: {
      title: "Will you join me for a sunset walk?",
      subtitle: "A gentle ask in golden light",
      question: "Want to go out for a sunset date?",
      yes_text: "Absolutely",
      no_text: "Maybe another time",
      message_after_yes: "Can't wait to spend time together.",
      message_after_no: "Thanks for letting me know.",
      hero_image:
        "https://media.giphy.com/media/3o7TKU8RvQuomFfUUU/giphy.gif",
      theme: {
        background: "linear-gradient(180deg, #ffefef 0%, #ffd3b6 50%, #ffb347 100%)",
        accent: "#ff7e5f",
        text: "#42211a",
      },
    },
  },
  {
    key: "radiant",
    label: "Radiant Bloom",
    description: "Peachy glow with mint highlights for a playful ask.",
    defaultValues: {
      title: "Will you be my Valentine?",
      subtitle: "A playful note with a warm smile",
      question: "Care to share a date and some laughs?",
      yes_text: "Yes, please",
      no_text: "Not right now",
      message_after_yes: "You just made me smile so wide.",
      message_after_no: "No worries, thanks for the honesty.",
      hero_image:
        "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
      theme: {
        background: "linear-gradient(180deg, #fef3ec 0%, #ffe8d1 60%, #d7ffee 100%)",
        accent: "#ff9a8b",
        text: "#0f141b",
      },
    },
  },
];

export function findCrushTemplate(key: CrushTemplateKey) {
  return crushTemplates.find((template) => template.key === key) ?? crushTemplates[0];
}
