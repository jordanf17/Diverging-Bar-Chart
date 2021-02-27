anychart.onDocumentReady(function () {
  
  
    let chart = anychart.bar();

    
    let winlossData = [
      [ 8,22 ,"2020-21"],
      [ 8,28 ,"2020-21"],
      [ 8, 28,"2019-20"],
      [ 7,39, "2018-19"],
      [ 6, 42,"2017-18"],
      [ 6,42, "2016-17"],
      [ 6, 44,"2015-16"],
      [ 8,52, "2014-15"],
      [ 7,37, "2013-14"],
      [ 7,41, "2012-13"],
      [ 5,50, "2011-12"],
      [ 7,45, "2010-11"],
      [ 8,47, "2009-10"],
      [ 6, 41,"2008-09"],
      [ 8,27, "2007-08"],
      [ 11, 27,"2006-07"],
      [ 5,26, "2005-06"],
      [ 2,7, "2004-05"]
    ];

    
    let createSeries = function (columnNumber, name) {
      let data = [];
      for (let i = 0; i < winlossData.length; i++) {

        
        let val = winlossData[i][columnNumber] * 100;
        if (columnNumber == 0) {
          var percentValue =
            val / (winlossData[i][columnNumber] + winlossData[i][columnNumber + 1]);
       } else {
         var percentValue =
            val / (winlossData[i][columnNumber] + winlossData[i][columnNumber - 1]);
        }
        percentValue = percentValue.toFixed(2);     
    
        let value = winlossData[i][columnNumber];
        let center = 0;
        if (name === "Wins") {
          data.push({
            x: winlossData[i][2],
            low: center,
            high: center + value,
            value: value,
            percentValue: percentValue
          });
        } else {
          data.push({
            x: winlossData[i][2],
            low: -center,
            high: -center - value,
            value: value,
            percentValue: percentValue
          });
        }
      }
  
      let series = chart.rangeBar(data);
      series.name(name).stroke("3 #fff 1").selectionMode("none");
    };

    
    createSeries(0, "Losses");
    createSeries(1, "Wins");

    
    chart
      .title()
      .enabled(true)
      .text("Lionel Messi Win-Loss Record Through The Years (2004-2021)");

    
    chart
      .legend()
      .enabled(true);

    
    chart.yScale().stackMode("value");

    
    chart
      .xAxis()
      .ticks(false);
    chart
      .xAxis()
      .title()
      .enabled(true)
      .text("Years")
      .padding([0, 0, 10, 0]);
    chart
      .xAxis()
      .labels()
      .fontSize(11)
      .fontColor("#474747")
      .padding([0, 10, 0, 0]);
    chart.yScale().maximum(70);
    chart
      .yAxis(0)
      .labels()
      .format(function () {
        return Math.abs(this.value);
      });

    
    chart
      .lineMarker()
      .value(0)
      .stroke("#CECECE");

    
    chart
      .tooltip()
      .useHtml(true)
      .fontSize(12)
      .titleFormat(function () {
        return this.getData("x") + " " + this.seriesName;
      })
      .format(function () {
        return (
          "<h6 style='font-size:12px; font-weight:400; margin: 0.25rem 0;'>Total games: " +
          "<b>" +
          this.getData("value") +
          "</b></h6>" +
          "<h6 style='font-size:12px; font-weight:400; margin: 0.25rem 0;'>Percentage games: " +
          "<b>" +
          this.getData("percentValue") +
          " %</b></h6>"
        );
      });

    
    chart.palette(
      anychart.palettes.distinctColors().items(["#004C99", "#A70042"])
    );

   
    chart.container("container");

    
    chart.draw();

  });