import express from 'express'
import { retrieveTopic, retrieveUser } from '../controller/read.controller'
import { upload } from '../middleware/upload'
import { create,  } from '../controller/create.controller'
import { update } from '../controller/update.controller'
import { softDeleteById, restoreById } from '../controller/softDelete.controller'

const display = express.Router()

// route for displaying cards
display.get('/api/topic/:status', retrieveTopic)

// route for display user
display.get('/api/user/:role', retrieveUser)

// route for creating datas dynamic
display.post('/api/:table', create)

// route for creating/updating by id
display.post('/api/:table/:id', update)

// route for soft delete / restore by id
display.delete('/api/:table/:id/soft', softDeleteById)
display.post('/api/:table/:id/restore', restoreById)

// route for uploading an image
// display.post('/api/upload', upload.single('image'), (req: any, res: any) => {
//   if (!req.file) {
//     return res.status(400).json({ status: 'error', msg: 'No file uploaded' })
//   }

//   return res.json({
//     status: 'success',
//     msg: 'File uploaded successfully',
//     data: {
//       filename: req.file.filename,
//       url: `/uploads/${req.file.filename}`,
//     },
//   })
// })

export default display
