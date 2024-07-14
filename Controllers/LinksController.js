import LinkModel from '../Models/LinkModel.js';
import UserModel from '../Models/UserModel.js';
// פונקציה ליצירת קישור חדש
const LinksController = {

    createLink: async (req, res) => {
        try {

            const newLink = new LinkModel({
                originalUrl: req.body.originalUrl,
                targetValues: req.body.targetValues,
                targetParamName: req.body.targetParamName
            });
            const savedLink = await newLink.save();
            const user = await UserModel.findById(req.body.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.links.push(newLink._id);
            await user.save();
            res.status(201).json(savedLink);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // פונקציה לקבלת כל הקישורים
    getLinks: async (req, res) => {
        try {
            const links = await LinkModel.find();//ללא סינון

            res.json({ links });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    // פונקציה לקבלת קישור לפי ID
    getLinkById: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);
            if (link) {
                res.status(200).json(link);
            } else {
                res.status(404).json({ message: 'Link not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // פונקציה לעדכון קישור לפי ID
    updateLink: async (req, res) => {
        try {
            const updatedLink = await LinkModel.findByIdAndUpdate(
                req.params.id,
                {
                    originalUrl: req.body.originalUrl,
                    targetValues: req.body.targetValues,
                    targetParamName: req.body.targetParamName
                },
                { new: true } // מחזיר את המסמך המעודכן
            );
            if (updatedLink) {
                res.status(200).json(updatedLink);
            } else {
                res.status(404).json({ message: 'Link not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // פונקציה למחיקת קישור לפי ID
    deleteLink: async (req, res) => {
        try {
            const deletedLink = await LinkModel.findByIdAndDelete(req.params.id);
            if (deletedLink) {
                res.status(200).json({ message: 'Link deleted' });
            } else {
                res.status(404).json({ message: 'Link not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getRedirect: async (req, res) => {

        try {

            const link = await LinkModel.findById(req.params.id);
            console.log(link)
            if (!link) {

                return res.status(404).send({ message: 'Link not found' });
            }

            // שמירת הקליק
            const click = {
                ipAddress: req.ip,
                targetParamValue: req.query[link.targetParamName] || 'unknown'
            };

            link.clicks.push(click);
            await link.save();
            // הפניה לקישור המקורי
            res.redirect(link.originalUrl);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    getClick: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);
            if (!link) {
                return res.status(404).send({ message: 'Link not found' });
            }

            // פילוח נתוני הקליקים לפי מקור
            const clicksByTarget = link.clicks.reduce((acc, click) => {
                const target = click.targetParamValue || 'unknown';
                if (!acc[target]) {
                    acc[target] = 0;
                }
                acc[target]++;
                return acc;
            }, {});

            res.status(200).send(clicksByTarget);
        } catch (err) {
            res.status(400).send(err);
        }
    }
};
export default LinksController;