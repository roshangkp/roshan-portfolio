export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required."
      });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "RESEND_API_KEY is missing in Vercel."
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",

      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["roshangkp139@gmail.com"],
        reply_to: email,
        subject: `Portfolio message from ${name}`,

        text:
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}`
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("RESEND ERROR:", result);

      return res.status(502).json({
        error: result.message || "Resend rejected the email.",
        details: result
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully."
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      error: "Server error.",
      details: error.message
    });
  }
}
