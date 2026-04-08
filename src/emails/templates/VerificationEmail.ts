import { VerificationEmailData } from "../types/email.types";
import { emailConfig } from "../config/config";

export function renderVerificationEmail(data: VerificationEmailData): string {
  
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Confirma tu cuenta</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f4f5; font-family:Arial, sans-serif;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
        <tr>
          <td align="center">

            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden;">
              
              <!-- HEADER -->
              <tr>
                <td style="background:#111827; padding:20px; text-align:center;">
                  <h1 style="color:#ffffff; margin:0; font-size:20px;">
                    Pizzas 
                  </h1>
                </td>
              </tr>

              <!-- CONTENT -->
              <tr>
                <td style="padding:30px;">
                  <h2 style="margin:0 0 10px; color:#111827;">
                    Confirma tu cuenta
                  </h2>

                  <p style="margin:0 0 15px; color:#374151;">
                    Hola <strong>${data.name}</strong>,
                  </p>

                  <p style="margin:0 0 20px; color:#374151;">
                    Gracias por registrarte en <strong>Pizzas</strong>. 
                    Solo necesitas confirmar tu cuenta para comenzar.
                  </p>

                  <!-- BUTTON -->
                  <div style="text-align:center; margin:30px 0;">
                    <a 
                      href="${data.url}" 
                      style="
                        background:#4F46E5;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 24px;
                        border-radius:8px;
                        display:inline-block;
                        font-weight:bold;
                      "
                    >
                      Confirmar cuenta
                    </a>
                  </div>

                  <!-- FALLBACK -->
                  <p style="font-size:13px; color:#6b7280;">
                    Si el botón no funciona, copia y pega este enlace:
                  </p>

                  <p style="font-size:13px; word-break:break-all;">
                    ${data.url}
                  </p>

                  <p style="font-size:13px; color:#6b7280; margin-top:20px;">
                    Este enlace expirará en ${emailConfig.tokenExpiration}.
                  </p>
                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td style="padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
                  Si no creaste esta cuenta, puedes ignorar este mensaje.
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

Gracias por registrarte en Pizzas.
 
Confirma tu cuenta en el siguiente enlace:
${data.url}

Este enlace expirará en ${emailConfig.tokenExpiration}.

Si no creaste esta cuenta, puedes ignorar este mensaje.
`;
}
