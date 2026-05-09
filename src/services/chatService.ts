const API_URL = process.env.NEXT_PUBLIC_AI_API_URL;

export const sendChatRequest = async (message: string) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Gagal menghubungi AI Service");
  }

  return response.json(); // Mengembalikan { response: "...", strategy: "..." }
};