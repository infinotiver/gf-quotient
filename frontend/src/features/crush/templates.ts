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
    label: "Bubblegum",
    description: "Pink, cute, and simple.",
    defaultValues: {
      title: "Be my Valentine?",
      question: "Wanna go on a cute little date?",
      yes_text: "Yep!",
      no_text: "Nah",
      message_after_yes: "Yay! You made me blush.",
      message_after_no: "All good, still friends.",
      hero_image:
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVmd2JjbDF2czByZm9lM2s2ZWt5bHVnbnBuZWVtYjMwNWNnMWt6cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LBMiDWkCw0e53UOcm0/giphy.gif",
      after_yes_gif:
        "https://media.gifdb.com/dudu-shower-kisses-bubu-8a50xh2b6wxatij5.gif",
      theme: {
        background:
          "linear-gradient(135deg, #ffe3ef 0%, #ffd0e6 50%, #ffb3d7 100%)",
        accent: "#ff4fa3",
        text: "#2a0b1f",
      },
    },
  },
  {
    key: "starlight",
    label: "Starry",
    description: "Night sky vibes.",
    defaultValues: {
      title: "Star date?",
      question: "Wanna go out under the stars?",
      yes_text: "Let's go",
      no_text: "Nope",
      message_after_yes: "Okay wow, that made my night.",
      message_after_no: "No worries, thanks for being honest.",
      hero_image:
        "https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif",
      after_yes_gif:
        "https://media.gifdb.com/dudu-shower-kisses-bubu-8a50xh2b6wxatij5.gif",
      theme: {
        background:
          "linear-gradient(160deg, #0f0b1f 0%, #1b1234 50%, #2a1b4a 100%)",
        accent: "#330476",
        text: "#2a0b1f",
      },
    },
  },
  {
    key: "sunset",
    label: "Sunset",
    description: "Warm and cozy.",
    defaultValues: {
      title: "Sunset date?",
      question: "Want to catch a sunset with me?",
      yes_text: "Yes!",
      no_text: "Maybe later",
      message_after_yes: "Can't wait. Golden hour incoming.",
      message_after_no: "Okay, maybe another time.",
      hero_image:
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2E2dGxkMzV5ejdjdzNkejA0a3RvbXU1NjBlZTQycTJoaGttc2k1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvYNSqBAMDVx8CEYkt/giphy.gif",
      after_yes_gif:
        "https://media.gifdb.com/dudu-shower-kisses-bubu-8a50xh2b6wxatij5.gif",
      theme: {
        background:
          "linear-gradient(180deg, #ffe8d6 0%, #ffc6a8 50%, #ff9f80 100%)",
        accent: "#ff7a59",
        text: "#3a1c16",
      },
    },
  },
  {
    key: "radiant",
    label: "Peach",
    description: "Peachy and playful.",
    defaultValues: {
      title: "Quick question...",
      question: "Wanna grab coffee and see where it goes?",
      yes_text: "Yep",
      no_text: "Pass",
      message_after_yes: "Okay, cute. I'm in.",
      message_after_no: "All good, thanks anyway.",
      hero_image:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2h6bW1vdnV2NWg4cncyY2UxNzliaHV4cWt1ZnF4cmV5Z20zeG44ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qFmdpUKAFZ6rMobzzu/giphy.gif",
      after_yes_gif:
        "https://media.gifdb.com/dudu-shower-kisses-bubu-8a50xh2b6wxatij5.gif",
      theme: {
        background:
          "linear-gradient(135deg, #fff1e6 0%, #ffe0cf 45%, #ffd6e5 100%)",
        accent: "#ff6f91",
        text: "#1f0f16",
      },
    },
  },
];

export function findCrushTemplate(key: CrushTemplateKey) {
  return (
    crushTemplates.find((template) => template.key === key) ?? crushTemplates[0]
  );
}
