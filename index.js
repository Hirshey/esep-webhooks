const https = require('https');

exports.handler = async (event) => {
    var urlinfo = new URL(process.env.API_URL);

    var options = {
        'method': 'POST',
        'hostname': urlinfo.hostname,
        'path': urlinfo.pathname,
        'headers': {
            'Content-Type': 'application/json'
        }
      };
      let promise = new Promise((resolve, reject) => {
        var req = https.request(options, function (res) {
            var chunks = [];
        
            res.on("data", function (chunk) {
            chunks.push(chunk);
            });
        
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        
            res.on("error", function (error) {
            reject(error);
            });
        });
        
        req.write(JSON.stringify({
            text: `Issue Created: ${event.issue.html_url}`
        }));

        req.end();
    });
    
    await promise;

    const response = {
        statusCode: 200
    };
    return response;
};
