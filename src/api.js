
const createAuth = (token)=> {
    return {
        bearer: new Buffer(token).toString('base64'),
        sendImmediately: true
        }; 
}

module.exports = ()=>{

    // the client loopback application
    const app = require('./client/client');

    const rds = app.dataSources.remoteApi;
    const remotes =  rds.connector.remotes;

    const Account = rds.models.Account;
    const credentials = {
        email:"orders@indiraactive.com",
        password: "password"
    }
    return (cb)=>{

        Account.login(credentials, (err, token)=>{

            if(err)
                return cb(err);
            
            remotes.auth = createAuth(token);

            cb(null, rds, token);
        });
    }
}