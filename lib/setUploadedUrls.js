'use strict'


/**
 * Processes POST data by setting the s3 urls to the uploaded file fields
 * @param {object} data -- expects req.body
 * @param {Array} uploadedUrls -- an array of `{ fieldname: url }`` objects
 * @return {object}
 */
function setUploadedUrls (data, uploadedUrls) {
  let returnedData = JSON.parse(JSON.stringify(data))

  uploadedUrls.map(item => {
    for(let field in item){
      returnedData[field] = item[field]
    }
  })

  return returnedData
}

module.exports = setUploadedUrls
