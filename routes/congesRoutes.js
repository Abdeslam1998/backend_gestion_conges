import express from 'express'
const router = express.Router()

import {
    createConge,
    getAllConges

} from '../controllers/congesController.js'

router.route('/').post(createConge).get(getAllConges)
/*router.route('/:id').delete(deleteApi).patch(updateApi)*/

export default router