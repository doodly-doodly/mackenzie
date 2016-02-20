/*
 * Project Doodly GetDoodlies service
 */

exports.getDoodliesImpl = function (req, res)
{
    //var data = req.body;
    var response = [
        {
            id: "d1",
            type : "moving",
            currentPosition: {lat: 12.967439, lng: 77.605845}, //j1
            nextDestination : {lat: 12.969875, lng: 77.603227}, //j2
            pathPolyLine : "uvcnAiktxMb@nFHLV@tGiAFx@FbCb@`GDfAPpBHdAgBg@aACmBbAiBrAyBhB{AqCs@qA}@uAyAoBeBkC",
            remainingCapacity : 2,
            rechedDestination : false
        },

        {
            id: "d2",
            type : "moving",
            currentPosition: {lat: 12.976210, lng: 77.605466}, //j3
            nextDestination : {lat: 12.965170, lng: 77.610276}, //j4
            pathPolyLine : "oienAkhtxMnBsMLkAh@ZbB`@~Cn@bDz@z@NZHnABrBHlIbBnB`@lAPbAFf@KpAe@bCmHjAuClHcFf@]g@[",
            remainingCapacity : 2,
            rechedDestination : false
        },

        {
            id: "j1",
            type : "joint",
            currentPosition: {lat: 12.967439, lng: 77.605845},
            remainingCapacity : 2 
        }, 

        {
            id: "j2",
            type : "joint",
            currentPosition: {lat: 12.969875, lng: 77.603227},
            remainingCapacity : 2 
        },
        {
            id: "j3",
            type : "joint",
            currentPosition: {lat: 12.976210, lng: 77.605466},
            remainingCapacity : 2 
        },
        {
            id: "j4",
            type : "joint",
            currentPosition: {lat: 12.965170, lng: 77.610276},
            remainingCapacity : 2 
        }];

    res.writeHead(200, "OK", {'Content-Type': 'text/html'});    
    res.end(JSON.stringify(response));
};
