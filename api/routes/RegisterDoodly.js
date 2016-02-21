/*
 * Project Doodly GetDoodlies service
 */

exports.registerDoodlyImpl = function (req, res)
{
    var data = req.body;
    
    //Send doodly data to magna
    //Receieve doodly data with id and next path details.
    //send back to client
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});    
    res.end(JSON.stringify(data));
};
