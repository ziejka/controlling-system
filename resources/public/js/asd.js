$('tr.calc').each(function(){
    var totalPoints = 0;
    $(this).find("input[id^='value']").each(function(){
        totalPoints += parseInt($(this).val()) || 0;
    });
    $(this).find("td.sum").text(totalPoints);
});
