import { questionSchema, quizSchema, quizAttemptSchema } from "./validations/question"
import { subjectSchema, topicSchema } from "./validations/subject"
import { invitationSchema, notificationSchema } from "./validations/notifier"

const validate: Record<string, any> = {
  "subject": subjectSchema,
  "topic": topicSchema,
  "quiz": quizSchema,
  "question": questionSchema,
  "quizAttempt": quizAttemptSchema,
  "invitation": invitationSchema,
  "notification": notificationSchema,
}

export function inputSanitizer(req: any, res: any, next: any) {
  const { table } = req.params

  if (!validate[table]) {
    return next()
  }

  const result = validate[table].safeParse(req.body.data)

  if (!result.success) {
    const issues = result.error.issues.map((issue: any) => ({
      field: issue.path.join('.') || 'root',
      message: issue.message,
    }))

    return res.status(400).json({
      status: 'error',
      msg: 'Validation failed',
      errors: issues,
    })
  }

  req.body.data = result.data
  next()
}
