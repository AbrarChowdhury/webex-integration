const { response } = require("express");
const request = require("request")


// const authorize = ()=>{
//     return
// }

var requestUrl = `https://webexapis.com/v1/authorize?response_type=code&scope=spark%3Arooms_read + &client_id=${process.env.WEBEX_CLIENT_ID}&redirect_uri=${process.env.WEBEX_REDIRECT_URI}` // The custom app's Redirect URI
//window.location = requestUrl; // Redirect the browser to the OAuth2 kickoff URL

const redirect = async (code) => {

    return new Promise (async (resolve, reject)=>{
        request.post({
            form:{
                code:code,
                client_id: process.env.WEBEX_CLIENT_ID,
                grant_type:"authorization_code",
                client_secret:process.env.WEBEX_CLIENT_SECRET,
                redirect_uri: process.env.WEBEX_REDIRECT_URI
            },
            url:"https://webexapis.com/v1/acess_token"
        }, (error, res, body)=>{
            if (error){
                console.log(error)
                reject(error)
            }
            resolve(JSON.parse(body))
        })
    }).then(response=>{
        process.env.WEBEX_ACCESS_TOKEN= response.access_token
        return response
    }).catch(error=>{
        return error
    })

}

module.exports = {
    requestUrl,
    redirect
}