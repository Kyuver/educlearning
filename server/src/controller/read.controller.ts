import prisma from "../db"

export async function retrieveTopic(req: any, res: any) {
  const { status } = req.params

  try {
    const data = await prisma.topic.findMany({
      where: { status, isDeleted: false }
    })

    return res.json({ status: 'success', msg: "successfully retrieved courses", data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}

// users base on role
export async function retrieveUser(req: any, res: any) {
  const { role } = req.params
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
