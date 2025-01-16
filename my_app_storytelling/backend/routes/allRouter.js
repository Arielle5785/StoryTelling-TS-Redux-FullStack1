const { Router } = require("express");
const userController = require("../controllers/userController.js");
const StoryController = require("../controllers/storiesController");
const { verifyToken } = require("../middlewares/verifyToken.js");
const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all", verifyToken, userController.getUsers);
router.post("/logout", userController.logoutUser);
router.get("/auth", verifyToken, userController.verifyAuth);
router.get("/stories", verifyToken, StoryController.getAllStories);
router.get("/stories:id", verifyToken, StoryController.getStoryById);
router.post("/stories", verifyToken, StoryController.createStory);
router.patch("/stories:id", verifyToken, StoryController.updateStory);
router.delete("/stories:id", verifyToken, StoryController.deleteStory);

module.exports = router;
