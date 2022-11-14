import express from "express"
const router=express.Router();

import {newcollege} from "../controllers/collegeController.js"
import {getcollege,updatecollege,deletecollege} from "../controllers/collegeController.js"
router.route("/").post(newcollege);
router.route("/").get(getcollege);
export default router;