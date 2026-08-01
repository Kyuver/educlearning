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

// users base on id and role
export async function retrieveDataById(req: any, res: any) {
  const { id, role } = req.params
  try {
    const include = {
      section: true,
      topics: true,
      invitesSent: true,
      invitations: true,
      notificationsSent: true,
      notificationsReceived: true,
      ...(role === "student" ? { quizAttempts: true } : {}),
    }

    const data = await prisma.user.findUnique({
      where: { id: Number(id) },
      include,
    })

    if (!data) {
      return res.status(404).json({ status: 'error', msg: "User not found" })
    }

    return res.json({ status: 'success', msg: 'successfully retrieved record', data: data })
  }
  catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ status: 'error', msg: e.message })
  }
}
