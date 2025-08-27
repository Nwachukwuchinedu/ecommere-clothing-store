import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { listUsers, getUser, updateUser } from '../controllers/userController.js'

export const router = Router()

router.use(requireAuth, requireAdmin)

router.get('/', listUsers)

router.get('/:id', getUser)

router.patch('/:id', updateUser)


