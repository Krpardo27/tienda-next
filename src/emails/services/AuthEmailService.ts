import { emailConfig } from "../config/config";
import { renderPasswordResetEmail, renderPasswordResetEmailText } from "../templates/PasswordResetEmail";
import {
  renderVerificationEmail,
  renderVerificationEmailText,
} from "../templates/VerificationEmail";
import { PasswordResetEmailData, VerificationEmailData } from "../types/email.types";
import { EmailService } from "./EmailService";

export class AuthEmailService {
  static async sendVerificationEmail(
    data: VerificationEmailData,
  ): Promise<void> {
    await EmailService.send({
      from: emailConfig.from.verification,
      to: data.email,
      subject: "Confirma tu cuenta",
      text: renderVerificationEmailText(data),
      html: renderVerificationEmail(data),
    });
  }

  static async sendPasswordResetEmail(
    data: PasswordResetEmailData,
  ): Promise<void> {
    await EmailService.send({
      from: emailConfig.from.passwordReset,
      to: data.email,
      subject: "Kevin - Reestablece tu password",
      text: renderPasswordResetEmailText(data),
      html: renderPasswordResetEmail(data),
    });
  }
}

