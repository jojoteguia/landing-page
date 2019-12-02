function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

function daysCount(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
}

function calculateEstimate({ members, days }) {
    const basePricePerPerson = 140;
    return (parseInt(members) * parseInt(days)) * parseInt(basePricePerPerson);
}

function setEstimate() {
    const members = $('#members').val();
    const startDateString = $('#start').val();
    const endDateString = $('#end').val();
    const days = daysCount(toDate(endDateString), toDate(startDateString));
    const estimate = calculateEstimate({members, days});

    $('#days').val(days);
    $('#estimate').val(estimate);
}
