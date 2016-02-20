/*
 * Project Doodly GetDoodlies service
 */

exports.updateDoodlyStatusImpl = function (req, res)
{
    var data = req.body;
    
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});    
    res.end(JSON.stringify(data));
};
