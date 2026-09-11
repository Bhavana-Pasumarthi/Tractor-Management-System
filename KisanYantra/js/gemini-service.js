const GEMINI_API_KEY = "";

const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function geminiSystemPrompt() {
  const lang = (typeof currentLang !== 'undefined' && currentLang === 'te')
    ? 'Telugu (తెలుగు)'
    : 'English';
  return "You are the Help Assistant for KisanYantra, a tractor rental platform " +
    "connecting farmers (Users), tractor Owners, and Admins in India. " +
    "Answer ONLY questions related to using the KisanYantra platform: login/registration, " +
    "finding tractors, booking, payments, booking status, cancellations, and account/profile " +
    "management. If asked something unrelated to the platform, politely say you can only help " +
    "with KisanYantra-related questions and suggest using the 'Still need help' option to reach " +
    "Customer Support for anything else. Keep answers short (2-5 sentences), simple, and friendly " +
    "— many users are farmers who may not be very tech-savvy. Respond in " + lang + ".";
}

async function askGeminiHelp(userQuestion) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "") {
    return { ok: false, text: t('gemini_no_key') };
  }
  try {
    const res = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: geminiSystemPrompt() }] },
        contents: [{ role: 'user', parts: [{ text: userQuestion }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 300 },
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.error('Gemini API error:', res.status, errBody);
      return { ok: false, text: t('gemini_error') };
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('').trim();
    if (!reply) {
      console.error('Gemini API returned no usable text:', data);
      return { ok: false, text: t('gemini_error') };
    }
    return { ok: true, text: reply };
  } catch (err) {
    console.error('Gemini fetch failed:', err);
    return { ok: false, text: t('gemini_error') };
  }
}
