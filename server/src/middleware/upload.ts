import multer from "multer"
import path from "path"
import fs from "fs"

const uploadDir = path.join(__dirname, "../../uploads")

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${unique}${ext}`)
  },
})

const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only image files (JPEG, PNG, WEBP, GIF) are allowed") as any)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})
