$(document).ready(
  function () {
    $('.value').change(calc);
    $('.focusOn').change(calcMargin)


    function calc() {
      $('tr.calc').each(function(){
        var sum = 0;
        $(this).find("input[id^='value']").each(function(){
          sum += parseInt($(this).val()) || 0;
        });

        $(this).find("td.sum").text(sum);
      });};

    function calcMargin() {
      $('tr.sale').each(function(){
        var column = 0;
        var result = 0;
        var sale = $(this).find("input[id^='value']");
        var margin = $(this).next().find("input[id^='profit_margin']");
        var marginP = $(this).next().next().find("td.myMargin");

        function GetIntOrEmpty(value) {
          var myresult = parseInt(value, 10);
          return isNaN(myresult) ? "0" : result.toFixed(2) + "";
        }

        sale.each(function(){
          var sp = parseInt(sale[column].value) || 0;
          var ma = parseInt(margin[column].value) || 0;
          result = ma / sp * 100;
          marginP[column].textContent = GetIntOrEmpty(result) + " %";
          column = column + 1;
        });
      });}
  });
parseFloat($(this).temp1()).toFixed(2);
