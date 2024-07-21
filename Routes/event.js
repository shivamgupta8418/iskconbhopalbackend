const {createEvent,getAllEvent,deleteEvent} = require('../Controllers/event')
const express = require('express')
const router = express.Router()

router.post('/create', createEvent)
router.get('/', getAllEvent)
router.delete('/delete/:id', deleteEvent)

module.exports = router;
