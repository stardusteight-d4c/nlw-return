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

    console.log("screenshot SubmitFeedbackUseCase", screenshot);

    if (!type) {
      throw new Error("Type is required.");
    }

    if (!comment) {
      throw new Error("Comment is required.");
    }

    // if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
    //   throw new Error("Invalid screenshot format.");
    // }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });
    // O gmail não suporta imagens em base64, criar um link para cada screenshot ou apenas mandar via ancora e a url para imagem??
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
