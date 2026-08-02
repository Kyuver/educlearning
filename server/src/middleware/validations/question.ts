import { z } from "zod";

export const quizSchema = z.object({
  title: z.string().min(1, 'title required.'),
  topicId: z.number().int().min(1, 'topic id required.'),
})

export const questionSchema = z.object({
  quizId: z.number().int().min(1, 'quiz id required.'),
  question: z.string().min(1, 'question required.'),
  choices: z.array(z.string()).min(2, 'at least 2 choices required.'),
  correctAnswer: z.number().int().min(0),
}).superRefine((q, ctx) => {
  if (q.correctAnswer >= q.choices.length) {
    ctx.addIssue({
      code: "custom",
      path: ["correctAnswer"],
      message: `correctAnswer must be < ${q.choices.length} (number of choices)`,
    });
  }
})

export const quizAttemptSchema = z.object({
  userId: z.number().int().min(1, 'user id required.'),
  quizId: z.number().int().min(1, 'quiz id required.'),
  score: z.number().int().min(0, 'score required.'),
  totalQuestion: z.number().int().min(1, 'total question required,'),
  submittedAnswers: z.record(z.number().int(), z.number().int().min(0)).default({}),
})
