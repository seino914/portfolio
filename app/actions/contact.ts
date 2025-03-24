"use server";

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT as string;
if (!FORMSPREE_ENDPOINT) {
  throw new Error("FORMSPREE_ENDPOINT is not defined");
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContact(data: ContactForm) {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("送信に失敗しました");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "エラーが発生しました。もう一度お試しください。",
    };
  }
}
