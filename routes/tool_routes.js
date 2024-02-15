const { Router } = require("express")

const toolController = require("../controllers/tool_controller")

const toolRouter = Router()

toolRouter.get("/", toolController.index)
toolRouter.get("/:id", toolController.show)
toolRouter.post("/", toolController.create)
toolRouter.patch("/:id", toolController.update)
toolRouter.delete("/:id", toolController.destroy)

module.exports = toolRouter