$(document).ready(
  function () {
    $('.value').change(function() {
      $(calc);
      $(que)});
    $('.focusOn').change(calcMargin);

    $('a').tooltip('hide');

//    $(".a").click(function() {
//      if($("#collapseme").hasClass("out")) {
//        $("#collapseme").addClass("in");
//        $("#collapseme").removeClass("out");
//      } else {
//        $("#collapseme").addClass("out");
//        $("#collapseme").removeClass("in");
//      }
//    });

  function calc() {
      $('tr.calc').each(function(){
        var sum = 0;
        $(this).find("input[id^='value']").each(function(){
          sum += parseInt($(this).val()) || 0;
        });

        $(this).find("td.sum").text(sum);
      });};

    function que() {
      $('tr.calc').each(function(){
        var qu1 = 0;
        var qu2 = 0;
        var qu3 = 0;
        var qu4 = 0;
        var all = $(this).find("input[id^='value']");

        var m1 = $(all[0])  ;
        var m2 = $(all[1])  ;
        var m3 = $(all[2])  ;
        var m4 = $(all[3])  ;
        var m5 = $(all[4])  ;
        var m6 = $(all[5])  ;
        var m7 = $(all[6])  ;
        var m8 = $(all[7])  ;
        var m9 = $(all[8])  ;
        var m10 = $(all[9]) ;
        var m11 = $(all[10]);
        var m12 = $(all[11]);

        qu1 = parseInt($(m1).val())   + parseInt($(m2).val())   + parseInt($(m3).val()) ;
        qu2 = parseInt($(m4).val())   + parseInt($(m5).val())   + parseInt($(m6).val()) ;
        qu3 = parseInt($(m7).val())   + parseInt($(m8).val())   + parseInt($(m9).val()) ;
        qu4 = parseInt($(m10).val())  + parseInt($(m11).val())  + parseInt($(m12).val());

        $(this).find("td.qu1").text(qu1);
        $(this).find("td.qu2").text(qu2);
        $(this).find("td.qu3").text(qu3);
        $(this).find("td.qu4").text(qu4);
      }); };

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
