/*
 * Project Doodly GetDoodlies service
 */

exports.userLoginImpl = function (req, res)
{
    var data = req.body;
    
    //add user details to the DB
    //send e-mail/sms for confirmation 
    //send back registered successfully and as to verify using code 
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});    
    res.end(JSON.stringify(data));
};
