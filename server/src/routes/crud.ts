import express from 'express'
import { retrieveSubjectTopics, retrieveUser, retrieveDataById, retrieveAll, retrieveUnassignedTopics } from '../controller/read.controller'
import { upload } from '../middleware/upload'
import { create,  } from '../controller/create.controller'
import { update } from '../controller/update.controller'
import { softDeleteById, restoreById } from '../controller/softDelete.controller'
import { getNotification, getNotificationUserById, sendNotification } from '../controller/notification.controller'
import { inputSanitizer } from '../middleware/inputSanitizer'

const crud = express.Router()

// route for fetching all records of a table
crud.get('/api/:table', retrieveAll)

// route for displaying topics of a subject, optionally by status
crud.get('/api/subject/:subjectId/topics/:status', retrieveSubjectTopics)
crud.get('/api/subject/:subjectId/topics', retrieveSubjectTopics)

// route for crud user
crud.get('/api/user/:role', retrieveUser)

// route for topics without an assigned teacher
crud.get('/api/topic/unassigned', retrieveUnassignedTopics)

// route for notifications
crud.get('/api/notification', getNotification)
crud.get('/api/notification/:status', getNotification)
crud.get('/api/notification/user/:id', getNotificationUserById)
crud.post('/api/notification', sendNotification)

// route for uploading an image
crud.post('/api/upload', upload.single('image'), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', msg: 'No file uploaded' })
  }

  return res.json({
    status: 'success',
    msg: 'File uploaded successfully',
    data: {
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    },
  })
})

// route for creating datas dynamic
crud.post('/api/:table', inputSanitizer, create)

// route for creating/updating by id
crud.post('/api/:table/:id', update)

// route for soft delete / restore by id
crud.delete('/api/:table/:id/soft', softDeleteById)
crud.post('/api/:table/:id/restore', restoreById)

// route for any table by id, with related data
crud.get('/api/:table/:id', retrieveDataById)

export default crud
