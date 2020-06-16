const helpers = {}
const bcrypt = require('bcryptjs');

helpers.encriptar = async(password) => {

    const hash = await bcrypt.genSalt(15); //numero de veces que genera el hash
    const resultadoHash = await bcrypt.hash(password, hash);
    return resultadoHash;
}

helpers.login = async(password, guardada) => {
    return await bcrypt.compare(password, guardada);
};

module.exports = helpers;