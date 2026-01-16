const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export interface ContactPayload {
  senderName: string;
  senderEmail: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  senderName: string;
  senderEmail: string;
  message: string;
  sentAt: string;
  replied: boolean;
  repliedAt: string | null;
  replyMessage: string | null;
}

export async function sendContactMessage(
  payload: ContactPayload
): Promise<ContactResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de l’envoi du message");
  }

  return response.json();
}
