export type CrushTheme = {
  background: string;
  background_image?: string;
  accent: string;
  text: string;
};

export type CrushCreate = {
  title: string;
  subtitle?: string;
  question: string;
  yes_text: string;
  no_text: string;
  theme: CrushTheme;
  message_after_yes?: string;
  message_after_no?: string;
  hero_image?: string;
};

export type CrushPublic = CrushCreate & { page_id: string };
