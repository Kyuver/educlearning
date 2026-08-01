import prisma from "../db"

// Tables that support soft delete (must have an `isDeleted` column)
const softDeletableTables = ["topic"]

export async function softDeleteById(req: any, res: any, next: any) {
  const { table, id } = req.params

  try {
    if (!softDeletableTables.includes(table)) {
      return res.status(400).json({ status: 'error', msg: `Table does not support soft delete: ${table}` })
    }

    const result = await (prisma as any)[table].update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    })
    return res.json({ status: 'success', msg: 'successfully soft deleted data', data: result })
  }
  catch (e: any) {
    next(e)
  }
}

export async function restoreById(req: any, res: any, next: any) {
  const { table, id } = req.params

  try {
    if (!softDeletableTables.includes(table)) {
      return res.status(400).json({ status: 'error', msg: `Table does not support soft delete: ${table}` })
    }

    const result = await (prisma as any)[table].update({
      where: { id: Number(id) },
      data: { isDeleted: false },
    })
    return res.json({ status: 'success', msg: 'successfully restored data', data: result })
  }
  catch (e: any) {
    next(e)
  }
}
