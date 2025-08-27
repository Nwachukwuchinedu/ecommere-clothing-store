import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { createOrder, listOrders, getOrder, updateOrderStatus, listMyOrders } from '../controllers/orderController.js'

export const router = Router()

router.post('/', requireAuth, createOrder)
router.get('/mine', requireAuth, listMyOrders)

router.get('/', requireAuth, requireAdmin, listOrders)

router.get('/:id', requireAuth, getOrder)

router.patch('/:id', requireAuth, requireAdmin, updateOrderStatus)


