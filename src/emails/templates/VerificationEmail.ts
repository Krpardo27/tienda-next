import { VerificationEmailData } from "../types/email.types";
import { emailConfig } from "../config/config";

export function renderVerificationEmail(
  data: VerificationEmailData,
): string {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <title>Confirma tu acceso</title>
    </head>

    <body
      style="
        margin:0;
        padding:0;
        background-color:#0f172a;
        font-family:Arial,sans-serif;
      "
    >
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          padding:40px 16px;
          background:
            radial-gradient(circle at top, #1e293b 0%, #0f172a 60%);
        "
      >
        <tr>
          <td align="center">

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                max-width:600px;
                background:#111827;
                border:1px solid rgba(255,255,255,0.08);
                border-radius:20px;
                overflow:hidden;
                box-shadow:0 20px 60px rgba(0,0,0,0.45);
              "
            >

              <!-- HEADER -->
              <tr>
                <td
                  style="
                    padding:36px 32px 28px;
                    text-align:center;
                    background:
                      linear-gradient(
                        180deg,
                        #1f2937 0%,
                        #111827 100%
                      );
                    border-bottom:1px solid rgba(255,255,255,0.06);
                  "
                >
                  <div
                    style="
                      width:58px;
                      height:58px;
                      margin:0 auto 16px;
                      border-radius:16px;
                      background:#f59e0b;
                      text-align:center;
                      line-height:58px;
                      font-size:26px;
                      font-weight:bold;
                      color:#ffffff;
                    "
                  >
                    🍕
                  </div>

                  <h1
                    style="
                      margin:0;
                      color:#ffffff;
                      font-size:28px;
                      font-weight:700;
                      letter-spacing:-0.02em;
                    "
                  >
                    Fuente Vicuña
                  </h1>

                  <p
                    style="
                      margin:10px 0 0;
                      color:#9ca3af;
                      font-size:14px;
                    "
                  >
                    Panel administrativo
                  </p>
                </td>
              </tr>

              <!-- CONTENT -->
              <tr>
                <td style="padding:40px 32px;">
                  <p
                    style="
                      margin:0 0 12px;
                      color:#f3f4f6;
                      font-size:16px;
                    "
                  >
                    Hola <strong>${data.name}</strong>,
                  </p>

                  <h2
                    style="
                      margin:0 0 18px;
                      color:#ffffff;
                      font-size:30px;
                      line-height:1.2;
                    "
                  >
                    Confirma tu acceso
                  </h2>

                  <p
                    style="
                      margin:0 0 18px;
                      color:#d1d5db;
                      font-size:15px;
                      line-height:1.7;
                    "
                  >
                    Gracias por registrarte en
                    <strong>Fuente Vicuña</strong>.
                  </p>

                  <p
                    style="
                      margin:0 0 30px;
                      color:#9ca3af;
                      font-size:14px;
                      line-height:1.7;
                    "
                  >
                    Para activar tu cuenta y acceder al panel administrativo,
                    debes confirmar tu correo electrónico.
                  </p>

                  <!-- BUTTON -->
                  <div style="text-align:center; margin:36px 0;">
                    <a
                      href="${data.url}"
                      style="
                        display:inline-block;
                        background:#f59e0b;
                        color:#111827;
                        text-decoration:none;
                        padding:16px 28px;
                        border-radius:12px;
                        font-size:15px;
                        font-weight:700;
                      "
                    >
                      Confirmar cuenta
                    </a>
                  </div>

                  <!-- URL -->
                  <div
                    style="
                      margin-top:28px;
                      padding:18px;
                      border-radius:12px;
                      background:#0b1220;
                      border:1px solid rgba(255,255,255,0.06);
                    "
                  >
                    <p
                      style="
                        margin:0 0 8px;
                        color:#9ca3af;
                        font-size:12px;
                        text-transform:uppercase;
                        letter-spacing:0.08em;
                      "
                    >
                      Enlace de verificación
                    </p>

                    <p
                      style="
                        margin:0;
                        color:#f3f4f6;
                        font-size:13px;
                        word-break:break-all;
                        line-height:1.6;
                      "
                    >
                      ${data.url}
                    </p>
                  </div>

                  <!-- EXPIRATION -->
                  <div
                    style="
                      margin-top:24px;
                      padding:16px 18px;
                      border-radius:12px;
                      background:rgba(245,158,11,0.08);
                      border:1px solid rgba(245,158,11,0.15);
                    "
                  >
                    <p
                      style="
                        margin:0;
                        color:#fbbf24;
                        font-size:13px;
                        line-height:1.6;
                      "
                    >
                      Este enlace expirará en
                      <strong>${emailConfig.tokenExpiration}</strong>.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td
                  style="
                    padding:24px 32px;
                    border-top:1px solid rgba(255,255,255,0.06);
                    text-align:center;
                  "
                >
                  <p
                    style="
                      margin:0;
                      color:#6b7280;
                      font-size:12px;
                      line-height:1.6;
                    "
                  >
                    Si no creaste esta cuenta, puedes ignorar este mensaje.
                  </p>

                  <p
                    style="
                      margin:10px 0 0;
                      color:#4b5563;
                      font-size:11px;
                    "
                  >
                    © ${new Date().getFullYear()} Fuente Vicuña
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

export function renderVerificationEmailText(
  data: VerificationEmailData,
): string {
  return `
Hola ${data.name},

Gracias por registrarte en Fuente Vicuña.

Para activar tu cuenta, confirma tu correo en el siguiente enlace:

${data.url}

Este enlace expirará en ${emailConfig.tokenExpiration}.

Si no creaste esta cuenta, puedes ignorar este mensaje.
`;
}