export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;

  whatsapp?: string;
  url?: string;
}
