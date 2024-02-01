const bcrypt = require('bcrypt');
const Encode = async(props)=>{
    console.log(props);
    const salt = await bcrypt.genSalt(); 
    console.log(salt);
    const passwordhashed = await bcrypt.hash(props,salt);
    console.log(passwordhashed)
    return passwordhashed;
}
module.exports =Encode;