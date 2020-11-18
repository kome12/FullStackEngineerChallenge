const express = require('express');
const performanceReviewRouter = express.Router();

const mongoose = require('mongoose');

const PerformanceReview = require('../models/performanceReview');

performanceReviewRouter.post('/performanceReview', (req, res) => {
    const tempPerformanceReview = req.body;
    if (tempPerformanceReview) {
        const performanceReview = new PerformanceReview(tempPerformanceReview).save((err, performanceReview) => {
            if (err) {
                console.error('Error, could not create performanceReview:', err);
                return res.status(400).json({ message: 'Error, could not create performanceReview', err: err });
            }
            else {
                return res.status(200).json({ message: 'Successfully created performanceReview', data: performanceReview });
            }
        });
    }
    else {
        return res.status(400).json({ message: 'no performance review provided' });
    }
});

performanceReviewRouter.get('/performanceReviews', (req, res) => {
    PerformanceReview.find({}, (err, performanceReviews) => {
        if (err) {
            console.error('Error, could not get performanceReviews:', err);
            return res.status(400).json({ message: 'Error, could not get performanceReviews', err: err });
        }
        else {
            console.log('got employess:', performanceReviews)
            return res.status(200).json({ message: 'Successfully got performanceReviews:', data: performanceReviews });
        }
    });
});

performanceReviewRouter.get('/performanceReview/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        PerformanceReview.findById(id, (err, performanceReview) => {
            if (err) {
                console.error(`Error, could not get performanceReview with id ${id}`, err);
                return res.status(400).json({ message: `Error, could not get performanceReview with id ${id}`, err: err });
            }
            else {
                console.log('got employes:', performanceReview)
                return res.status(200).json({ message: 'Successfully got performanceReview:', data: performanceReview });
            }
        });
    }
    else {
        console.error('No id provided to find performanceReview', err);
        return res.status(400).json({ message: 'No id provided to find performanceReview', err: err });
    }
});

performanceReviewRouter.put('/performanceReview/:id', (req, res) => {
    const id = req.params.id;
    const updatedPerformanceReview = req.body;
    if (id && updatedPerformanceReview) {
        PerformanceReview.findById(id, (err, savedPerformanceReview) => {
            savedPerformanceReview.prForId = updatedPerformanceReview.prForId;
            savedPerformanceReview.prFromId = updatedPerformanceReview.prFromId;
            savedPerformanceReview.requestedToId = updatedPerformanceReview.requestedToId;
            savedPerformanceReview.comment = updatedPerformanceReview.comment;
            new PerformanceReview(savedPerformanceReview).save((err, newPerformanceReview) => {
                if (err) {
                    console.error('Error, could not update performanceReview:', err);
                    return res.status(400).json({ message: 'Error, could not update performanceReview', err: err });
                }
                else {
                    return res.status(200).json({ message: 'Successfully updated performanceReview', data: newPerformanceReview });
                }
            });
        });
    }
    else {
        console.error('No id provided to update performanceReview', err);
        return res.status(400).json({ message: 'No id provided to update performanceReview', err: err });
    }
});

module.exports = performanceReviewRouter;
