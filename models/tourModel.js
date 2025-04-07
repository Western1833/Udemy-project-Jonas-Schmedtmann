const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const User = require('./userModel.js');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A trour must have a name!'],
        unique: true,
        trim: true
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration!']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size!']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty!']
    },
    ratingsAverage: {
        type: Number,
        default: 4.6
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price!']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary!']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a image cover!']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    },
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        adress: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            adress: String,
            description: String,
            day: Number
        }
    ],
    guides: Array
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});

tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

tourSchema.pre('save', async function(next){
    const guidesPromises = this.guides.map(async id => await User.findById(id));
    this.guides = await Promise.all(guidesPromises);
    next();
});

tourSchema.pre(/^find/, function(next) {
    this.find({secretTour: {$ne: true}});
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function(docs, next) {
    console.log(`This query took ${Date.now() - this.start} milliseconds!`);
    // console.log(docs);
    next();
});

tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({$match: {secretTour: {$ne: true}}});
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;