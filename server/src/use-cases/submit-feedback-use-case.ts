import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required.");
    }

    if (!comment) {
      throw new Error("Comment is required.");
    }

    if (
      screenshot &&
      !screenshot.startsWith(
        "https://oxgapcqpowafqdnxqmoe.supabase.co/storage/v1/object/public/screenshots/",
      )
    ) {
      throw new Error("Invalid screenshot storage link.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });
    
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img src=${screenshot} style="width: 900px; height: 500px; display: inline-block; margin-inline: auto;" />`
          : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
