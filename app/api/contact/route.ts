import { NextRequest, NextResponse } from "next/server"

const AIRTABLE_TOKEN = "pat7PK2OA3ZmJ5M9x.8589fd698fd9d211079e50826d14f63db73b42607cd0fce8b37c27c069d19fc5"
const AIRTABLE_BASE = "appSftLb7yqcBIhUv"
const AIRTABLE_TABLE = "tbldOAV7WDiChjaP2"

const RESEND_API_KEY = "re_Boea3Lwx_C8g9Kp1NVR4ZmAyKaRKH7K1Z"
const FROM_EMAIL = "info@kohancampos.com.py"
const GUIDE_URL = "https://yourfiles.cloud/uploads/676ad2e9874688f2c9818f071ed0e4dc/Guia-del-Inversor%20%20Kohan%20%26%20Campos.pdf"

export async function POST(req: NextRequest) {
  try {
    const { name, email, country, budget, message } = await req.json()

    // 1. Guardar en Airtable
    const airtableRes = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Nombre: name,
          Email: email,
          País: country,
          "Capital Disponible": budget,
          Mensaje: message,
        },
      }),
    })

    if (!airtableRes.ok) {
      const err = await airtableRes.json()
      console.error("Airtable error:", err)
      return NextResponse.json({ error: "Airtable error" }, { status: 500 })
    }

    // 2. Enviar mail al lead con la guía
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `PY Advisors <${FROM_EMAIL}>`,
        to: [email],
        subject: "Tu Guía del Inversor en Paraguay 📩",
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
            <p style="font-size: 16px;">Hola ${name},</p>
            <p style="font-size: 15px; line-height: 1.6;">
              Gracias por tu consulta. Tal como prometimos, acá tenés tu
              <strong>Guía del Inversor en Paraguay</strong>.
            </p>
            <p style="text-align: center; margin: 32px 0;">
              <a href="${GUIDE_URL}"
                style="background-color: #C9B99A; color: #1a1a2e; padding: 14px 28px;
                       text-decoration: none; font-weight: 600; font-size: 14px;
                       letter-spacing: 0.05em; display: inline-block;">
                Descargar Guía PDF →
              </a>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #555;">
              En breve nos ponemos en contacto para conversar sobre tu consulta.
              Si tenés alguna pregunta antes, respondé este mail directamente.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
            <p style="font-size: 12px; color: #999;">
              PY Advisors — Decisiones inmobiliarias con criterio, no con impulso.<br/>
              <a href="https://kohancampos.com.py" style="color: #999;">kohancampos.com.py</a>
            </p>
          </div>
        `,
      }),
    })

    if (!emailRes.ok) {
      const err = await emailRes.json()
      console.error("Resend error:", err)
      // No bloqueamos la respuesta si falla el mail, el lead ya quedó guardado
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}