import prisma from "../db"

export const allowedTables = ["user", "topic", "quiz", "question", "invitation", "notification", "quizAttempt", "subject", "section"]

export async function create(req: any, res: any, next: any) {
  const { data } = req.body
  const { table } = req.params

  try {
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ status: 'error', msg: `Invalid table: ${table}` })
    }

    const result = await (prisma as any)[table].create({ data })
    return res.json({ status: 'success', msg: 'successfully created data', data: result })
  }
  catch (e: any) {
    next(e)
  }
}
