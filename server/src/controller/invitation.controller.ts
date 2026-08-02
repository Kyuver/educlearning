import prisma from "../db"

// all invitations sent by a user (admin view), with topic + teacher
export async function retrieveInvitationsSent(req: any, res: any, next: any) {
  const { userId } = req.params

  try {
    const data = await prisma.invitation.findMany({
      where: { sentById: Number(userId) },
      orderBy: { createdAt: 'desc' },
      include: { topic: { include: { subject: true } }, received: { select: { id: true, name: true } } },
    })

    return res.json({ status: 'success', msg: 'successfully retrieved invitations', data: data })
  }
  catch (e: any) {
    next(e)
  }
}

// pending invitations sent to a teacher, with the topic they are for
export async function retrieveInvitationsByUser(req: any, res: any, next: any) {
  const { userId } = req.params

  try {
    const data = await prisma.invitation.findMany({
      where: { receivedById: Number(userId) },
      orderBy: { createdAt: 'desc' },
      include: { topic: { include: { subject: true, teacher: true } }, sentBy: { select: { id: true, name: true } } },
    })

    return res.json({ status: 'success', msg: 'successfully retrieved invitations', data: data })
  }
  catch (e: any) {
    next(e)
  }
}

// teacher accepts an invitation -> topic gets assigned to them
export async function acceptInvitation(req: any, res: any, next: any) {
  const { id } = req.params

  try {
    const invitation = await prisma.invitation.findUnique({ where: { id: Number(id) } })
    if (!invitation) {
      return res.status(404).json({ status: 'error', msg: 'Invitation not found' })
    }
    if (invitation.status !== 'PENDING') {
      return res.status(400).json({ status: 'error', msg: 'Invitation already responded to' })
    }

    const updated = await prisma.$transaction([
      prisma.invitation.update({
        where: { id: Number(id) },
        data: { status: 'ACCEPTED' },
      }),
      prisma.topic.update({
        where: { id: invitation.topicId },
        data: { teacherId: invitation.receivedById },
      }),
      prisma.notification.create({
        data: {
          type: 'TOPIC_APPROVED',
          title: 'Course invitation accepted',
          message: `${invitation.courseName} is now assigned to you.`,
          status: 'UNREAD',
          senderId: invitation.sentById,
          receiverId: invitation.receivedById,
        },
      }),
    ])

    return res.json({ status: 'success', msg: 'successfully accepted invitation', data: updated[0] })
  }
  catch (e: any) {
    next(e)
  }
}

// teacher declines an invitation -> topic stays unassigned
export async function declineInvitation(req: any, res: any, next: any) {
  const { id } = req.params

  try {
    const invitation = await prisma.invitation.findUnique({ where: { id: Number(id) } })
    if (!invitation) {
      return res.status(404).json({ status: 'error', msg: 'Invitation not found' })
    }
    if (invitation.status !== 'PENDING') {
      return res.status(400).json({ status: 'error', msg: 'Invitation already responded to' })
    }

    const updated = await prisma.invitation.update({
      where: { id: Number(id) },
      data: { status: 'DECLINED' },
    })

    return res.json({ status: 'success', msg: 'successfully declined invitation', data: updated })
  }
  catch (e: any) {
    next(e)
  }
}
