import React from 'react';

function ClosestTimesSorting(inputArray) {
    var queryTimeInMS = new Date().getTime();
    console.log(queryTimeInMS)

    var sorted = inputArray.sort((a, b) =>
        Math.abs((a.startTime.seconds*1000) - queryTimeInMS) -
        Math.abs((b.startTime.seconds*1000) - queryTimeInMS))

    return sorted;
}

export default ClosestTimesSorting;