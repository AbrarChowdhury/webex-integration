const request = require("request")
const { apiBaseUri, meeting } = require("./webexConstants")

const createMeeting = async (payload) => {
  let meetingUri = `${apiBaseUri}${meeting}}`

  return new Promise(async (resolve, reject) => {
    request.post(
      {
        url: meetingUri,
        form: payload,
        header:{
            Authorization: `Bearer ${process.env.access_token}`
        }
      },
      (error, res, body) => {
        if (error) {
          return reject(error)
        }
        resolve(JSON.stringify(body))
      }
    )
  })
    .then((response) => {
      return response
    })
    .catch((error) => error)
}

module.exports = {
    createMeeting
}
