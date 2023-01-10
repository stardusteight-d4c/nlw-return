import express, { Request, Response } from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRespository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedbacks", async (req: Request, res: Response) => {
  const prismaFeedbacksRespository = new PrismaFeedbacksRespository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRespository,
    nodemailerMailAdapter,
  );

  try {
    const { type, comment, screenshot } = req.body;
    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});
