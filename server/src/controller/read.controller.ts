import prisma from "../db"

export const allowedTables = ["user", "topic", "quiz", "question", "invitation", "notification", "quizAttempt", "subject", "section"]

// fetch all records for a table
export async function retrieveAll(req: any, res: any) {
  const { table } = req.params

  try {
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ status: 'error', msg: `Invalid table: ${table}` })
    }

    const data = await (prisma as any)[table].findMany({})

    return res.json({ status: 'success', msg: `successfully retrieved ${table}s`, data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}

// topics of one subject, optionally filtered by status
export async function retrieveSubjectTopics(req: any, res: any) {
  const { subjectId, status } = req.params

  try {
    const data = await prisma.topic.findMany({
      where: {
        subjectId: Number(subjectId),
        isDeleted: false,
        ...(status ? { status } : {}),
      },
    })

    return res.json({ status: 'success', msg: "successfully retrieved topics", data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}

// topics that have no teacher assigned yet
export async function retrieveUnassignedTopics(req: any, res: any) {
  try {
    const data = await prisma.topic.findMany({
      where: {
        isDeleted: false,
        teacherId: null,
      },
      include: { subject: true },
    })

    return res.json({ status: 'success', msg: "successfully retrieved unassigned topics", data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}

// topics filtered by status (without subject filter)
export async function retrieveTopicsByStatus(req: any, res: any) {
  const { status } = req.params
  try {
    const data = await prisma.topic.findMany({
      where: {
        isDeleted: false,
        ...(status ? { status } : {}),
      },
      include: { subject: true, teacher: true },
    })

    return res.json({ status: 'success', msg: "successfully retrieved topics by status", data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}

// quizzes of one topic, with their questions
export async function retrieveTopicQuizzes(req: any, res: any) {
  const { topicId } = req.params
  try {
    const data = await prisma.quiz.findMany({
      where: { topicId: Number(topicId) },
      include: { questions: true },
    })

    return res.json({ status: 'success', msg: "successfully retrieved quizzes", data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}

// users base on role
export async function retrieveUser(req: any, res: any) {  const { role } = req.params
  try {
    const data = await prisma.user.findMany({
      where: { role },
    })

    return res.json({ status: 'success', msg: "successfully retrieved courses", data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}

// which relations to include per table
const includes: Record<string, any> = {
  user: {
    section: true,
    topics: true,
    invitesSent: true,
    invitations: true,
    notificationsSent: true,
    notificationsReceived: true,
    quizAttempts: true,
  },
  subject: { topics: true },
  topic: { subject: true, teacher: true, quizzes: true },
  quiz: { topic: true, questions: true, attempts: true },
  question: { quiz: true },
  quizAttempt: { user: true, quiz: true },
  invitation: { sentBy: true, received: true },
  notification: { sender: true, receiver: true },
  section: { users: true },
}

// any table by id, with its related data
export async function retrieveDataById(req: any, res: any) {
  const { table, id } = req.params
  try {
    const data = await (prisma as any)[table].findUnique({
      where: { id: Number(id) },
      include: includes[table],
    })

    if (!data) {
      return res.status(404).json({ status: 'error', msg: `${table} not found` })
    }

    return res.json({ status: 'success', msg: 'successfully retrieved record', data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}
