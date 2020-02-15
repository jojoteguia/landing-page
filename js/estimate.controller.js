// Adding estimate masks
$(document).ready(function() {
    $('#start').mask('99/99/9999')
    $('#end').mask('99/99/9999');
    $('#members').mask('9');
    $('#members').bind('input', function(event) {
        if(event.target.value > 8) {
            event.target.value = 8;
        }
    });
})

function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

function daysCount(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
}

function calculateEstimate({ members, days, startMonth, endMonth }) {
    const highDemandPrice = 350;
    const lowDemandPrice = 250;
    let price = 0;
    if(isHighDemand(startMonth, endMonth)) {
        price = highDemandPrice;
    } else {
        price = lowDemandPrice;
    }

    return days * price;
}

function isHighDemand(startMonth, endMonth) {
    const highDemand = [1, 6, 7, 8, 11, 12];
    if(highDemand.some(function(s) {return s === startMonth}) || highDemand.some(function(e) {return e === endMonth})) {
        return true;
    } else {
        return false;
    }
}

function getMonth(dateStr) {
    if(dateStr) {
        return parseInt(dateStr.split('/')[1]);
    }
}

function setEstimate() {
    const members = $('#members').val();
    const startDateString = $('#start').val();
    const endDateString = $('#end').val();
    const days = daysCount(toDate(endDateString), toDate(startDateString));
    const estimate = calculateEstimate({members, days, startMonth: getMonth(startDateString), endMonth: getMonth(endDateString)});

    $('#days').val(days);
    $('#estimate').val(estimate);
}
