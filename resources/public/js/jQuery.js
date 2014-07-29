$(document).ready(
  function () {
    calc;
    $('.value').change(calc);

    function calc() {
     $('tr.calc').each(function(){
        var totalPoints = 0;
        $(this).find("input[id^='value']").each(function(){
          totalPoints += parseInt($(this).val()) || 0;
        });
        $(this).find("td.sum").text(totalPoints);
      });};


    $('tr.sale').each(function(){
      var column = 0;
      var wynik = 0;
      var sprzedaz = $(this).find("input[id^='value']");
      var marza = $(this).next().find("input[id^='profit_margin']");
      var procent = $(this).next().next().find("td.myMargin");

      sprzedaz.each(function(){
        var sp = parseInt(sprzedaz[column].value) || 0;
        var ma = parseInt(marza[column].value) || 0;
        wynik = ma / sp * 100;
        procent[column].textContent = wynik;
        column = column + 1;
      });
    });
  });
