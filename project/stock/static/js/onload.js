$(initAll);

var imageNum = 1;
var drawPosition = 0;
var l2r = true;

function initAll() {
    // ajax html template
    // $("#footerDiv").load("/html/footer.html");
    // $("#top10cs").load("/html/top10/top10cs.html");
    // $("#top10medicine").load("/html/top10/top10medicine.html");
    // $("#top10business").load("/html/top10/top10business.html");

    // dropdown menu init
    // dropDownMenu();

    // canvas init and canvas animation init
    // drawSmilingFace();
    //  window.setInterval(drawWelcome, 50);

    // build draggable and droppable object
    // $("#draggableObject1").draggable();
    // $("#draggableObject2").draggable();
    // $("#droppbleObject").droppable();
    // $("#droppbleObject").bind("drop", highlightTarget);
    // $("#droppbleObject").bind("dropout", resetTarget);

    // build ajax tab
    // $("#loginTab").tabs().css('width','500px').css('margin-left','auto').css('margin-right','auto');
    // $("#adminTab").tabs().css('width','1000px').css('margin-left','auto').css('margin-right','auto');

    // rolling image animation init
    window.setInterval("changeImg()", 1200);

    // build resizable and draggable searching form
    $("#searchForm").resizable();
    $("#searchForm").draggable();

    // build sortable tab
    $("#sortableLoginTab").sortable();

    // build dialog widget
    $("#dialog").dialog();
    $("#dialog").dialog("close");

    //google chart for results
    drawChart1();
    drawChart2();
    drawChart3();
    drawChart4();
}

// function dropDownMenu() {
//     var allLinks = document.getElementsByTagName("a");
//     for (var i = 0; i < allLinks.length; i++) {
//         if (allLinks[i].className == "menuLink") {
//             allLinks[i].onmouseover = toggleMenu;
//             allLinks[i].onclick = clickHandler;
//         }
//     }
// }

// function clickHandler(event) {
//     event.preventDefault();
// }

// function toggleMenu() {
//     var startMenu = this.href.lastIndexOf("/") + 1;
//     var stopMenu = this.href.lastIndexOf(".");
//     var thisMenuName = this.href.substring(startMenu, stopMenu);
//     var menuParent = document.getElementById(thisMenuName).parentNode;
//     var thisMenuStyle = document.getElementById(thisMenuName).style;
//
//     thisMenuStyle.display = "block";
//
//     menuParent.onmouseout = function() {
//         thisMenuStyle.display = "none";
//     };
//
//     menuParent.onmouseover = function() {
//         thisMenuStyle.display = "block";
//     };
// }

function changeImg() {
    if (!document.getElementById('rollingImage')) {
        return;
    }
    imageNum++;
    if (imageNum > 3) {
        imageNum = 1;
    }
    var img = document.getElementById("rollingImage");
    img.src = "static/img/" + imageNum + ".jpg";
}

function inputValidate() {
    if (!document.getElementById('dollar_amount')) {
        return;
    }
    var dollar_amount = document.getElementById("dollar_amount").value;
    var error = "";
    if (dollar_amount === "") {
        error = "Missing University Name\n";
        alert(error);
        return false;
    }
    if ((!dollar_amount.match(/^-{0,1}\d+$/) && !dollar_amount.match(/^\d+\.\d+$/)) || parseFloat(dollar_amount) < 5000) {
        error = "Invalid Dollar Amount!\n";
        alert(error);
        return false;
    }

    if (!document.getElementById('investment_strategy_1')) {
        return;
    }
    var investment_strategy_1 = document.getElementById("investment_strategy_1").value;
    if (investment_strategy_1.toLowerCase() !== "ethical investing"
        && investment_strategy_1.toLowerCase() !== "growth investing"
        && investment_strategy_1.toLowerCase() !== "index investing"
        && investment_strategy_1.toLowerCase() !== "quality investing"
        && investment_strategy_1.toLowerCase() !== "value investing") {
        error = "Invalid Strategy 1!\n";
        alert(error);
        return false;
    }

    if (!document.getElementById('investment_strategy_2')) {
        return;
    }
    var investment_strategy_2 = document.getElementById("investment_strategy_2").value;
    if (investment_strategy_2.toLowerCase() !== ""
        && investment_strategy_2.toLowerCase() !== "ethical investing"
        && investment_strategy_2.toLowerCase() !== "growth investing"
        && investment_strategy_2.toLowerCase() !== "index investing"
        && investment_strategy_2.toLowerCase() !== "quality investing"
        && investment_strategy_2.toLowerCase() !== "value investing") {
        error = "Invalid Strategy 2!\n";
        alert(error);
        return false;
    }
    return true;
}

function openDialog() {
    $("#dialog").dialog("open");
}

function closeDialog() {
    $("#dialog").dialog("close");
}

// function highlightTarget(event, ui) {
//     $("#droppbleObject").addClass("ui-state-highlight").html("Selected").append(ui.draggable.text());
// }
//
// function resetTarget(event, ui) {
//     $("#droppbleObject").removeClass("ui-state-highlight").html("Select Gender");
// }

function drawChart1() {
    if (!document.getElementById('chart1')) {
        return;
    }
    google.charts.load('current', {'packages': ['table']});
    google.charts.setOnLoadCallback(function () {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Attribute');
        data.addColumn('string', 'Value');

        data.addRow(['investing strategy', document.getElementById('strategy 1').innerText]);
        data.addRow(['invested amount ($)', document.getElementById('investment amount 1').innerText]);
        data.addRow(['invested stocks', document.getElementById('invested stocks 1').innerText]);
        data.addRow(['money split ($)', document.getElementById('money distribution 1').innerText]);
        data.addRow(['current stock prices ($)', document.getElementById('current stock share prices 1').innerText]);
        data.addRow(['number of shares bought', document.getElementById('number of shares 1').innerText]);
        data.addRow(['current overall portfolio value ($)', document.getElementById('portfolio value 1').innerText]);

        var options = {
            height: '100%',
            width: '100%',
            showRowNumber: true
        };
        var table = new google.visualization.Table(document.getElementById('chart1'));
        table.draw(data, options);
    });
}

function drawChart2() {
    if (!document.getElementById('chart2')) {
        return;
    }

    var stocks = document.getElementById('stock label 1').innerText
    start = 0
    end = 0
    flag = true
    stock_array = []
    for (i = 0; i < stocks.length; i++) {
        if (stocks.charAt(i) === "'" && flag === true) {
            start = i
            flag = false
            continue
        }
        if (stocks.charAt(i) === "'" && flag === false) {
            end = i
            flag = true
            stock_array.push(stocks.substring(start + 1, end))
            continue
        }
    }

    var amounts = document.getElementById('current stock share prices 1').innerText
    start = 0
    amount_array = []
    for (i = 0; i < amounts.length; i++) {
        if (amounts.charAt(i) === ",") {
            amount_array.push(amounts.substring(start + 1, i))
            start = i + 1
        }
    }
    amount_array.push(amounts.substring(start + 1, amounts.length - 1))

    var money_distribution = document.getElementById('money distribution 1').innerText
    start = 0
    money_distribution_array = []
    for (i = 0; i < money_distribution.length; i++) {
        if (money_distribution.charAt(i) === ",") {
            money_distribution_array.push(money_distribution.substring(start + 1, i))
            start = i + 1
        }
    }
    money_distribution_array.push(money_distribution.substring(start + 1, money_distribution.length - 1))

    var input = [['stock', 'current market price', 'invested money']];
    for (var i = 0; i < stock_array.length; i++) {
        input.push([stock_array[i], parseFloat(amount_array[i]), parseFloat(money_distribution_array[i])])
    }

    google.charts.load('current', {'packages': ['bar']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable(input);
        var options = {
            chart: {
                title: 'Stock\'s current market price vs. invested money ($)',
            },
            bars: 'vertical',
            vAxis: {format: 'decimal'},
            height: 300,
            width: 500,
            colors: ['#88B972', '#2B4520'],
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            }
        };
        var chart = new google.charts.Bar(document.getElementById('chart2'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    });
}

function drawChart3() {
    if (!document.getElementById('chart3')) {
        return;
    }

    var stocks = document.getElementById('stock label 1').innerText
    start = 0
    end = 0
    flag = true
    stock_array = []
    for (i = 0; i < stocks.length; i++) {
        if (stocks.charAt(i) === "'" && flag === true) {
            start = i
            flag = false
            continue
        }
        if (stocks.charAt(i) === "'" && flag === false) {
            end = i
            flag = true
            stock_array.push(stocks.substring(start + 1, end))
            continue
        }
    }

    var share = document.getElementById('number of shares 1').innerText
    start = 0
    share_array = []
    for (i = 0; i < share.length; i++) {
        if (share.charAt(i) === ",") {
            share_array.push(share.substring(start + 1, i))
            start = i + 1
        }
    }
    share_array.push(share.substring(start + 1, share.length - 1))

    var input = [['Stock', 'Shares Bought', {role: 'style'}, {role: 'annotation'}]];
    for (var i = 0; i < stock_array.length; i++) {
        input.push([stock_array[i], parseInt(share_array[i]), '#88B972', parseInt(share_array[i])])
    }

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable(input);
        var options = {
            title: 'Number of Shares Bought',
            chartArea: {width: '70%', height: '75%', left: '27%', top: '17%'},
            annotations: {
                textStyle: {fontSize: 11},
            },
            hAxis: {
                minValue: 0,
                gridlines: {
                    count: 0
                },
                textPosition: 'none'
            },
            vAxis: {
                title: 'Stock',
                textStyle: {
                    fontSize: 12
                }
            },
            height: 300,
            width: 400,
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            },
            bar: {groupWidth: "65%"},
            legend: {position: 'none'},
            seriesType: 'bars',
            series: {1: {type: 'scatter'}},
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart3'));
        chart.draw(data, options);
    });
}

function drawChart4() {
    if (!document.getElementById('chart4')) {
        return;
    }

    google.charts.load('current', {'packages': ['line']});
    google.charts.setOnLoadCallback(function () {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'date');
        data.addColumn('number', 'portfolio value');

        var history = document.getElementById('portfolio history 1').innerText
        start = 0
        history_array = []
        for (i = 0; i < history.length; i++) {
            if (history.charAt(i) === ",") {
                history_array.push(history.substring(start + 1, i))
                start = i + 1
            }
        }
        history_array.push(history.substring(start + 1, history.length - 1))

        var today = new Date();
        var date1 = (today.getMonth() + 1) + '-' + (today.getDate() - 4);
        var date2 = (today.getMonth() + 1) + '-' + (today.getDate() - 3);
        var date3 = (today.getMonth() + 1) + '-' + (today.getDate() - 2);
        var date4 = (today.getMonth() + 1) + '-' + (today.getDate() - 1);
        var date5 = (today.getMonth() + 1) + '-' + today.getDate();

        data.addRow([date1, parseFloat(history_array[0])]);
        data.addRow([date2, parseFloat(history_array[1])]);
        data.addRow([date3, parseFloat(history_array[2])]);
        data.addRow([date4, parseFloat(history_array[3])]);
        data.addRow([date5, parseFloat(history_array[4])]);

        var options = {
            title: 'A Weekly Trend of the Overall Portfolio Value',
            hAxis: {
                gridlines: {
                    count: 3
                },
            },
            vAxis: {
                viewWindow: {
                    min:4000,
                    // max:8000,
                }
            },
            colors: ['#2B4520','#88B972'],
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            },
            height: 300,
            width: 500,
        };
        var chart = new google.visualization.LineChart(document.getElementById('chart4'));
        chart.draw(data, options);
    });
}
