const Project = require('../model/Project.model');
const cloudinary = require('../config/cloudinary');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        // Images already have Cloudinary URLs, so just return them
        const { lang } = req.query;
        if (lang && ['az', 'ru', 'en'].includes(lang)) {
            const filtered = projects.map(p => ({
                ...p.toObject(),
                titles: p.titles.map(t => t[lang]),
                description: p.description.map(d => d[lang]),
                role: p.role.map(r => r[lang])
            }));
            return res.status(200).json(filtered);
        }
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const { lang } = req.query;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (lang && ['az', 'ru', 'en'].includes(lang)) {
            return res.status(200).json({
                ...project.toObject(),
                titles: project.titles.map(t => t[lang]),
                description: project.description.map(d => d[lang]),
                role: project.role.map(r => r[lang])
            });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadImagesToCloudinary = async (images) => {
    // images: [{ src, alt }], src can be a file path or base64 string
    const uploadedImages = [];
    for (const img of images) {
        if (img.src && !img.src.startsWith('http')) { // Only upload if not already a URL
            const result = await cloudinary.uploader.upload(img.src, { folder: 'projects' });
            uploadedImages.push({ src: result.secure_url, alt: img.alt });
        } else {
            uploadedImages.push(img);
        }
    }
    return uploadedImages;
};

const createProject = async (req, res) => {
    try {
        const { titles, description, role, techStack, images, video, githubURL, linkedIn } = req.body;
        if (!Array.isArray(titles) || !titles.length || !titles.every(t => t.az && t.en && t.ru) ||
            !Array.isArray(description) || !description.length || !description.every(d => d.az && d.en && d.ru) ||
            !Array.isArray(role) || !role.length || !role.every(r => r.az && r.en && r.ru) ||
            !Array.isArray(techStack) || !techStack.length ||
            !Array.isArray(images) || !images.length || !images.every(img => img.src && img.alt) ||
            !video || typeof video !== 'string' || !githubURL || !linkedIn) {
            return res.status(400).json({ message: "All fields are required and must be arrays with required properties" });
        }
        const uploadedImages = await uploadImagesToCloudinary(images);
        const newProject = { titles, description, role, techStack, images: uploadedImages, video, githubURL, linkedIn };
        const createdProject = await Project.create(newProject);
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { titles, description, role, techStack, images, video, githubURL, linkedIn } = req.body;
        if (!Array.isArray(titles) || !titles.length || !titles.every(t => t.az && t.en && t.ru) ||
            !Array.isArray(description) || !description.length || !description.every(d => d.az && d.en && d.ru) ||
            !Array.isArray(role) || !role.length || !role.every(r => r.az && r.en && r.ru) ||
            !Array.isArray(techStack) || !techStack.length ||
            !Array.isArray(images) || !images.length || !images.every(img => img.src && img.alt) ||
            !video || typeof video !== 'string' || !githubURL || !linkedIn) {
            return res.status(400).json({ message: "All fields are required and must be arrays with required properties" });
        }
        const uploadedImages = await uploadImagesToCloudinary(images);
        const updatedProject = { titles, description, role, techStack, images: uploadedImages, video, githubURL, linkedIn };
        const projectDoc = await Project.findByIdAndUpdate(id, updatedProject, { returnDocument: 'after' });
        if (!projectDoc) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(projectDoc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};