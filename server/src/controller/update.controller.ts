import prisma from "../db"
import { allowedTables } from "./create.controller"

export async function update(req: any, res: any, next: any) {
  const { data } = req.body
  const { table, id } = req.params

  try {
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ status: 'error', msg: `Invalid table: ${table}` })
    }

    const result = await (prisma as any)[table].update({
      where: { id: Number(id) },
      data,
    })
    return res.json({ status: 'success', msg: 'successfully updated data', data: result })
  }
  catch (e: any) {
    next(e)
  }
}
