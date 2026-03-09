const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    titles: [{
        en: { type: String, required: true },
        ru: { type: String, required: true },
        az: { type: String, required: true }
    }],
    description: [{
        en: { type: String, required: true },
        ru: { type: String, required: true },
        az: { type: String, required: true }
    }],
    role: [{
        en: { type: String, required: true },
        ru: { type: String, required: true },
        az: { type: String, required: true }
    }],
    techStack: [{ type: String, required: true }],
    images: [{
        src: { type: String, required: true },
        alt: { type: String, required: true }
    }],
    video: { type: String, required: true }, // Cloudinary URL
    githubURL: { type: String, required: true },
    linkedIn: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;