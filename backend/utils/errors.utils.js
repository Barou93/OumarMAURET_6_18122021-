

module.exports.signUpErrors = (err) => {
    let errors = { email: "", password: "" };
    if (err.message.includes("email")) errors.email = "cet email est déjà pris";
    if (err.message.includes("password")) errors.password = `Le mot de passe doit faire au minimum 
    8 caractères, avec une maj, une minuscule et 1 chiffre au moins `;
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré";
    return errors;
},

    module.exports.loginErrors = (err) => {
        let errors = { email: '', password: "" };
        if (err.message.includes('email')) errors.email = "Email inconnu";
        if (err.message.includes('password')) errors.password = "Le mot de passe ne correspond pas.";
        return errors;
    }

