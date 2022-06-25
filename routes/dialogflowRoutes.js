const express = require('express')
const { detectIntent } = require('../middlewares/dialogflowMiddlewares')

const router = express.Router()


router.post('/', detectIntent)


module.exports =  { dialogflowRouter:router }