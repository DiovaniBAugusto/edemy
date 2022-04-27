import express from 'express'

const router = express.Router();

//controllers
import {register, logout, login} from '../controllers/auth'



router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout);

module.exports = router;