import { VerificationEmailData } from "../types/types";
import { EmailService } from "./emailService";
import { emailConfig } from "../config/config";
import {
  renderVerificationEmail,
  renderVerificationEmailText,
} from "../templates/verificationEmail";

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
}
