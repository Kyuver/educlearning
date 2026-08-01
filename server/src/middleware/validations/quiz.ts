import { z } from "zod";

export const quizSchema = z.object({
  title: z.string().min(3, 'title should contain 3 or more letters.'),
  topicId: z.string().min(1, 'topic id required'),
})

export const questionSchema = z.object({
  quizId: z.number().int().min(1, 'quiz id required.'),
  question: z.string().min(1, 'question required.'),
  choices: z.array(z.string()).min(2, 'at least 2 choices required.'),
  correctAnswer: z.number().int().min(0, 'correct answer index required.'),
})

export const quizAttemptSchema = z.object({
  userId: z.number().int().min(1, 'user id required.'),
  quizId: z.number().int().min(1, 'quiz id required.'),
  score: z.number().int().min(1, 'score required.'),
  totalQuestion: z.number().int().min(1, 'total question required,'),
  submittedAnswers: z.array(z.string()).min(1, 'user answer list required.')
})
