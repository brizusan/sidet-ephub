import { PasswordResetEmailData, VerificationEmailData } from "../types/types";
import { EmailService } from "./emailService";
import { emailConfig } from "../config/config";
import {
  renderVerificationEmail,
  renderVerificationEmailText,
} from "../templates/verificationEmail";
import {
  renderPasswordResetEmail,
  renderPasswordResetEmailText,
} from "../templates/PasswordResetEmail";

export class AuthEmailService {
  static async sendVerificationEmail(
    data: VerificationEmailData,
  ): Promise<void> {
    await EmailService.send({
      from: emailConfig.from.verification,
      to: data.email,
      subject: "EPHUB - Confirma tu cuenta",
      text: renderVerificationEmailText(data),
      html: renderVerificationEmail(data),
    });
  }

  static async sendPasswordResetToken(
    data: PasswordResetEmailData,
  ): Promise<void> {
    await EmailService.send({
      from: emailConfig.from.passwordReset,
      to: data.email,
      subject: "EPHUB - Reestablecer Contraseña",
      text: renderPasswordResetEmailText(data),
      html: renderPasswordResetEmail(data),
    });
  }
}
