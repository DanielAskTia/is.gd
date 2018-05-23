const https = require('https')

module.exports = {
    shorten: function(url, cb) {
        return new Promise((resolve, reject) => {
            https.get('https://is.gd/create.php?format=simple&url=' + encodeURIComponent(url), res => {
                let body = ''
                res.on('data', function(chunk) { body += chunk })
                res.on('end', function() { resolve(cb(body)) })
            }).on('error', e => { reject(cb(e)) })
        })
    },
    custom: function(url, text, cb) {
        return new Promise((resolve, reject) => {
            https.get('https://is.gd/create.php?format=simple&url=' + encodeURIComponent(url) + '&shorturl=' + encodeURIComponent(text), res => {
                let body = ''
                res.on('data', function(chunk) { body += chunk })
                res.on('end', function() { resolve(cb(body)) })
            }).on('error', e => { reject(cb(e)) })
        })
    },
    lookup: function(url, cb) {
        return new Promise((resolve, reject) => {
            https.get('https://is.gd/forward.php?format=simple&shorturl=' + encodeURIComponent(url), res => {
                let body = ''
                res.on('data', function(chunk) { body += chunk })
                res.on('end', function() { resolve(cb(body)) })
            }).on('error', e => { reject(cb(e)) })
        })
    }
}