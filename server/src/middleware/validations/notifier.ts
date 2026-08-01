import { z } from 'zod'

export const invitationSchema = z.object({
  courseName: z.string().min(1, 'name of course required.'),
  status: z.enum(["PENDING", 'ACCEPTED', "DENIED"]),
  sentById: z.number().int().min(1, 'sender id required.'),
  receivedId:  z.number().int().min(1, 'receiver id required.'),
})

export const notificationSchema = z.object({
  type: z.enum(['ANNOUNCEMENT', 'INVITATION', 'TOPIC_APPROVED', 'QUIZ_ASSIGNED']),
  title: z.string().min(1, 'title required.'),
  message: z.string().min(1, 'message required.'),
  status: z.enum(['READ', 'UNREAD']),
  senderId: z.number().int().min(1, 'sender id required'),
  receiverId: z.number().int().min(1, 'receiver id required'),
})
