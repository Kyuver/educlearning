import bcrypt from "bcrypt";
import prisma from "../../db";

export async function register(req: any, res: any, next: any) {
  const { name, password, role, subject, sectionId } = req.body;

  try {
    if (!name || !password) {
      return res.status(400).json({ status: 'error', msg: 'Name and password are required' })
    }

    const existing = await prisma.user.findFirst({
      where: { name },
    })

    if (existing) {
      return res.status(409).json({ status: 'error', msg: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        role,
        subject,
        sectionId,
      },
    })

    const { password: _pw, ...safeUser } = user

    return res.status(201).json({
      status: 'success',
      msg: 'Successfully registered',
      data: safeUser,
    })
  }
  catch (e: any) {
    next(e)
  }
}
