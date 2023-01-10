import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

const STORAGE_URL =
  "https://oxgapcqpowafqdnxqmoe.supabase.co/storage/v1/object/public/screenshots/fake_path.png";

describe("Submit feedback", () => {
  it("should be able to submit a feeback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: STORAGE_URL,
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: STORAGE_URL,
      }),
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: STORAGE_URL,
      }),
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot URL", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "https://fakeurl.azure.co",
      }),
    ).rejects.toThrow();
  });
});
