////////////////////////////////////////////////////////////////////////////////
//
// computeSunRiseSunSet(Latitude, Longitude, TimeZone)
//                     Computes SunRise/SunSet based on Latitude/Longitude
// Return: Object retVal {
//           Date SunRise,
//           Date SunSet,
//           String str    // Sun Rise, Sun Set (transformed by TimeZone)
//         };
//
////////////////////////////////////////////////////////////////////////////////
export default function(Latitude, Longitude, TimeZone) {
    var curTime = new Date();
    // Variable names used: B5, C, C2, C3, CD, D, DR, H, HR, HS, L0, L5, M, MR, MS, N, PI, R1, RD, S1, SC, SD, str
    var retVal = new Object();
    var PI = Math.PI;
    var DR = PI / 180;
    var RD = 1 / DR;
    var B5 = Latitude;
    var L5 = Longitude;
    var H = -1 * (curTime.getTimezoneOffset() / 60 * -1); // Local timezone
    // Overriding TimeZone to standardize on UTC
    // H = 0;
    var M = curTime.getMonth() + 1;
    var D = curTime.getDate();
    B5 = DR * B5;
    var N = parseInt(275 * M / 9) - 2 * parseInt((M + 9) / 12) + D - 30;
    var L0 = 4.8771 + .0172 * (N + .5 - L5 / 360);
    var C = .03342 * Math.sin(L0 + 1.345);
    var C2 = RD * (Math.atan(Math.tan(L0 + C)) - Math.atan(.9175 * Math.tan(L0 + C)) - C);
    var SD = .3978 * Math.sin(L0 + C);
    var CD = Math.sqrt(1 - SD * SD);
    var SC = (SD * Math.sin(B5) + .0145) / (Math.cos(B5) * CD);
    if (Math.abs(SC) <= 1) {
        var C3 = RD * Math.atan(SC / Math.sqrt(1 - SC * SC));
        var R1 = 6 - H - (L5 + C2 + C3) / 15;
        var HR = parseInt(R1);
        var MR = parseInt((R1 - HR) * 60);
        retVal.SunRise = parseTime(HR + ":" + MR);
        var TargetTimezoneOffset = (TimeZone * 60 * 60 * 1000) + (retVal.SunRise.getTimezoneOffset() * 60 * 1000);
        var transformedSunRise = new Date(retVal.SunRise.getTime() + TargetTimezoneOffset);
        var strSunRise = "日出" + transformedSunRise.getHours() + ":" + (transformedSunRise.getMinutes() < 10 ? "0" + transformedSunRise.getMinutes() : transformedSunRise.getMinutes());
        var S1 = 18 - H - (L5 + C2 - C3) / 15;
        var HS = parseInt(S1);
        var MS = parseInt((S1 - HS) * 60);
        retVal.SunSet = parseTime(HS + ":" + MS);
        var transformedSunSet = new Date(retVal.SunSet.getTime() + TargetTimezoneOffset);
        var strSunSet = "日落" + transformedSunSet.getHours() + ":" + (transformedSunSet.getMinutes() < 10 ? "0" + transformedSunSet.getMinutes() : transformedSunSet.getMinutes());
        retVal.Noon = new Date((retVal.SunRise.getTime() + retVal.SunSet.getTime()) / 2);
        var transformedNoon = new Date(retVal.Noon.getTime() + TargetTimezoneOffset);
        var strNoon = "正午" + transformedNoon.getHours() + ":" + (transformedNoon.getMinutes() < 10 ? "0" + transformedNoon.getMinutes() : transformedNoon.getMinutes());
    } else {
        if (SC > 1) {
            // str="Sun up all day";
            strSunRise = ".";
            strNoon = ".";
            strSunSet = ".";
            var tDate = new Date();
            // Set Sunset to be in the future ...
            retVal.SunSet = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
            // Set Sunrise to be in the past ...
            retVal.SunRise = new Date(tDate.getFullYear() - 1, tDate.getMonth(), tDate.getDay(), tDate.getHours() - 1);
        }
        if (SC < -1) {
            // str="Sun down all day";
            strSunRise = ".";
            strNoon = ".";
            strSunSet = ".";
            // Set Sunrise and Sunset to be in the future ...
            retVal.SunRise = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
            retVal.SunSet = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
        }
    }
    retVal.strSunRise = strSunRise;
    retVal.strNoon = strNoon;
    retVal.strSunSet = strSunSet;
    retVal.str = strSunRise + ' | ' + strNoon + ' | ' + strSunSet;
    return retVal;
}
////////////////////////////////////////////////////////////////////////////////
//
// parseTime(string aTime) - takes a string of time in the format HH:MM:SS
//                           and returns Javascript Date Object
//
////////////////////////////////////////////////////////////////////////////////
function parseTime(aTime) {
    var aDateTimeObject = 'none';
    if (aTime !== undefined && aTime.length) {
        aDateTimeObject = GMTTime();
        try {
            var theHour = parseInt(aTime.split(':')[0]);
            var theMinutes = parseInt(aTime.split(':')[1]);
            aDateTimeObject.setHours(theHour);
            aDateTimeObject.setMinutes(theMinutes);
        } catch (ex) {}
    }
    return aDateTimeObject;
}
////////////////////////////////////////////////////////////////////////////////
//
// GMTTime() - returns time adjusted to GMT (Universal Time)
//
////////////////////////////////////////////////////////////////////////////////
function GMTTime() {
    var aDate = new Date();
    var aDateAdjustedToGMTInMS = aDate.getTime() + (aDate.getTimezoneOffset() * 60 * 1000);
    return (new Date(aDateAdjustedToGMTInMS));
}