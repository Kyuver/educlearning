import prisma from "../db"

export async function getNotification(req: any, res: any, next: any) {
  try {
    const { status } = req.params

    const data = await prisma.notification.findMany({
      ...(status ? { where: { status } } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, name: true, role: true } },
        receiver: { select: { id: true, name: true, role: true } },
      },
    })

    return res.json({ status: 'success', msg: 'successfully retrieved notifications', data: data })
  }
  catch (e: any) {
    next(e)
  }
}

export async function getNotificationUserById(req: any, res: any, next: any) {
  try {
    const { id } = req.params

    const data = await prisma.notification.findMany({
      where: { receiverId: Number(id) },
      orderBy: { createdAt: 'desc' },
      include: {
        // returns the user id, name, and his role base on the sender
        sender: { select: { id: true, name: true, role: true } },
      },
    })

    return res.json({ status: 'success', msg: 'successfully retrieved notifications', data: data })
  }
  catch (e: any) {
    next(e)
  }
}

export async function sendNotification(req: any, res: any, next: any) {
  try {
    const { type, title, message, senderId, receiverId } = req.body

    const data = await prisma.notification.create({
      data: {
        type,
        title,
        message,
        senderId,
        receiverId,
      },
    })

    return res.json({ status: 'success', msg: 'successfully sent notification', data: data })
  }
  catch (e: any) {
    next(e)
  }
}
