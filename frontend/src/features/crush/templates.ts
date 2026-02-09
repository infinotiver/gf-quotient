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
    label: "Soft Pink",
    description: "Warm blush glow, easy and sweet.",
    defaultValues: {
      title: "Will you be my Valentine?",
      subtitle: "A small ask with a warm heart",
      question: "Want to go on a cozy date with me?",
      yes_text: "Yes, I'd love to",
      no_text: "Not right now",
      message_after_yes: "You just made my day.",
      message_after_no: "Thanks for being honest.",
      hero_image:
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVmd2JjbDF2czByZm9lM2s2ZWt5bHVnbnBuZWVtYjMwNWNnMWt6cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LBMiDWkCw0e53UOcm0/giphy.gif",
      theme: {
        background:
          "linear-gradient(135deg, #ffe6f2 0%, #ffd1e0 50%, #ff99cc 100%)",
        accent: "#ff69b4",
        text: "#2d0a1e",
      },
    },
  },
  {
    key: "starlight",
    label: "Starry Night",
    description: "Deep blues, quiet sparkle.",
    defaultValues: {
      title: "A starry question for you",
      subtitle: "A soft ask under a sky of lights",
      question: "Want to go out under the stars?",
      yes_text: "Yes, let's go",
      no_text: "Let's stay friends",
      message_after_yes: "That makes me so happy.",
      message_after_no: "I appreciate your honesty.",
      hero_image:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGx5dDN6bW9nbGFyeTc1ZzN2Zmp5eTh5ZmU1MW5wYXRzOWY5MHY5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d2RalajGxUS3ZBimrD/giphy.gif",
      theme: {
        background: "galaxy",
        accent: "#d8bfff",
        text: "#f0e6ff",
      },
    },
  },
  {
    key: "sunset",
    label: "Golden Hour",
    description: "Soft orange glow, sunset calm.",
    defaultValues: {
      title: "Sunset date?",
      subtitle: "A gentle ask in golden light",
      question: "Want to go out for a sunset date?",
      yes_text: "Absolutely",
      no_text: "Maybe another time",
      message_after_yes: "Can't wait to spend time together.",
      message_after_no: "Thanks for letting me know.",
      hero_image:
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2E2dGxkMzV5ejdjdzNkejA0a3RvbXU1NjBlZTQycTJoaGttc2k1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvYNSqBAMDVx8CEYkt/giphy.gif",
      theme: {
        background:
          "linear-gradient(180deg, #ffecd2 0%, #fcb69f 40%, #ff9a8b 100%)",
        accent: "#ff6b6b",
        text: "#3d1f1a",
      },
    },
  },
  {
    key: "radiant",
    label: "Peach Pop",
    description: "Peachy glow with a fresh lift.",
    defaultValues: {
      title: "Will you be my Valentine?",
      subtitle: "A playful note with a warm smile",
      question: "Want to share a date and some laughs?",
      yes_text: "Yes, please",
      no_text: "Not right now",
      message_after_yes: "You just made me smile so wide.",
      message_after_no: "No worries, thanks for the honesty.",
      hero_image:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2h6bW1vdnV2NWg4cncyY2UxNzliaHV4cWt1ZnF4cmV5Z20zeG44ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qFmdpUKAFZ6rMobzzu/giphy.gif",
      theme: {
        background:
          "linear-gradient(135deg, #fff5e6 0%, #ffe8d6 40%, #d4f4dd 80%, #c7f0e0 100%)",
        accent: "#ff85a2",
        text: "#1a0f1f",
      },
    },
  },
];

export function findCrushTemplate(key: CrushTemplateKey) {
  return (
    crushTemplates.find((template) => template.key === key) ?? crushTemplates[0]
  );
}
