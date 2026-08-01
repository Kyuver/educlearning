import {z}  from "zod";

export const SubjectSchema = z.object({
  name: z.string().min(1, 'Subject name required')
})

const status = z.enum(["PENDING", "APPROVED", "DENIED"]);
export const topicSchema = z.object({
  title: z.string().min(1, 'title required.'),
  content: z.string().min(1, 'content required.'),
  coverImage: z.string().optional(),
  status: status,
  subjectId: z.number().int().min(1, 'subject id required.'),
  teacherId: z.number().int().optional()
})
