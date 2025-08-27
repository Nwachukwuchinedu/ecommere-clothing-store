import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { summary, weekly, monthly } from '../controllers/analyticsController.js'

export const router = Router()

router.use(requireAuth, requireAdmin)

router.get('/summary', summary)

router.get('/weekly', weekly)

router.get('/monthly', monthly)


