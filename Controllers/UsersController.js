import UserModel from '../Models/UserModel.js'

const UsersController = {
    getList: async (req, res) => {
        try {
            const users = await UserModel.find();//ללא סינון
            res.json({ users });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    getById: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);//שליפה לפי מזהה
            res.json(user);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    add: async (req, res) => {
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            links: req.body.links

        });

        try {
            const result = await user.save();
            res.status(201).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });//עדכון לפי מזהה
            res.json(updatedUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await UserModel.findByIdAndDelete(id);//מחיקה לפי מזהה
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
};

export default UsersController;
