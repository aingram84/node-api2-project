// implement your posts router here
const express = require('express');
const postsModel = require('./posts-model')

const expressRouter = express.Router();
expressRouter.get('/', (req, res) => {
    postsModel.find()
        .then(found => {
            res.json(found)
        }).catch(
            err => {
                res.status(500).json({
                    message: "The posts information could not be retrieved",
                    error: err.message
                })
            }
        )
})

expressRouter.get('/:id', async (req, res) => {
    try {
        const post = await postsModel.findById(req.params.id)
        if (!post) {
            res.status(400).json({
                message: "The post with the specified ID does not exist",
                error: err.message
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "The post with the specified ID does not exist",
            error: err.message
        })
    }
})

expressRouter.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
            error: err.message
        })
    } else {
        console.log("You made it!")
        postsModel.insert({ title, contents })
            .then(({ id }) => {
                console.log(`ID Log: ${id}`)
                return postsModel.findById(id)
            }).then(post => {
                res.status(201).json(post)
            })
            .catch(
                err => {
                    res.status(500).json({
                        message: "The posts information could not be retrieved",
                        error: err.message
                    })
                }
            )
    }
})