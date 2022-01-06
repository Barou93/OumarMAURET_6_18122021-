module.exports = (req, res, next) => {
    const emailValidate = (email) => {
        let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        let isValidRegex = emailRegex.test(email);
        isValidRegex ? next() : res.status(401).json({ message: 'Email non valide' })
    }
    emailValidate(req.body.email)
};