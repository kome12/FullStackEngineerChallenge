const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
    prForId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    prFromId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    requestedToId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    comment: { type: String },
});

module.exports = PerformanceReview = mongoose.model('PerformanceReview', performanceReviewSchema);
