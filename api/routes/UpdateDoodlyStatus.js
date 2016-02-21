/*
 * Project Doodly GetDoodlies service
 */

exports.updateDoodlyStatusImpl = function (req, res)
{
    var data = req.body;
    // this will contain doodly position, whether in transit or reached next destination
    // if not reached next location, same doodly details can be sent back
    // if  doodly reached next destination, then give updated doodly details pointing to the very next destination and polyline 
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});    
    res.end(JSON.stringify(data));
};
