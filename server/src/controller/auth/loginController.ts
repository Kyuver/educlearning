import bcrypt from "bcrypt";
import prisma from "../../db";

export async function login(req: any, res: any, next: any) {
  const { name, password } = req.body;

  try {
    if (!name || !password) {
      return res.status(400).json({ status: 'error', msg: 'Name and password are required' })
    }

    const user = await prisma.user.findFirst({
      where: { name },
    })

    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', msg: 'Invalid password' })
    }

    const { password: _pw, ...safeUser } = user

    return res.json({
      status: 'success',
      msg: 'Successfully logged in',
      data: safeUser,
    })
  }
  catch (e: any) {
    next(e)
  }
}
