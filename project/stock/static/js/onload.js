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

    //google chart for dashboard
    drawChart1();
    drawChart2();
    drawChart3();
    drawChart4();
    drawChart5();
    drawChart6();
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
    // if (!document.getElementById('schoolName')) {
    //     return;
    // }
    // var schoolName = document.getElementById("schoolName").value;
    // var error = "";
    // if (schoolName == "") {
    //     error = "Missing University Name\n";
    //     alert(error);
    //     return false;
    // }
    // // has to be letter or space
    // var schoolNameRE = /^[a-zA-Z\s_&]+$/;
    // if (!schoolName.match(schoolNameRE)) {
    //     error = "Invalid University Name\n";
    //     alert(error);
    //     return false;
    // }
    // return true;
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
    var origin = window.location.origin;
    var url = origin + "/aveExpense";
    // var url = "http://localhost:3000/aveExpense";
    var doc = [];
    $.get(url, function (data, status) {
        if (status != 'success') {
            console.log("get summarized data failed :" + status);
        } else {
            console.log("get summarized data :" + status);
            doc = data;
            google.charts.load('current', {'packages': ['bar']});
            // $.get() is async, must setOnLoadCallback here, or the doc[] can be empty.
            google.charts.setOnLoadCallback(function () {
                var data = google.visualization.arrayToDataTable([
                    ['Location', 'Public', 'Private'],
                    ['urban', doc.public_urban_ave, doc.private_urban_ave],
                    ['suburban', doc.public_suburban_ave, doc.private_suburban_ave],
                    ['small town', doc.public_smallTown_ave, doc.private_smallTown_ave],
                    ['small city', doc.public_smallCity_ave, doc.private_smallCity_ave]
                ]);
                var options = {
                    chart: {
                        title: 'Average Expense of the College and University ($/half year)',
                        subtitle: 'Expense is primarily affected by ownership, not locations.',
                    },
                    bars: 'vertical',
                    vAxis: {format: 'decimal'},
                    height: 300,
                    width: 500,
                    // colors: ['#d95f02', '#7570b3'],
                    colors: ['#88B972', '#2B4520'],
                    backgroundColor: {
                        fill: '#EEEEEE',
                        fillOpacity: 0.7
                    }
                };
                var chart = new google.charts.Bar(document.getElementById('chart1'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
            });
        }
    });
}

function drawChart2() {
    if (!document.getElementById('chart2')) {
        return;
    }
    var origin = window.location.origin;
    // Define the chart to be drawn.
    var doc = [];
    var schoolNames = ['Stanford', 'Harvard', 'Yale', 'Princeton', 'Columbia', 'UC_berkeley', 'UC_LA', 'GeorgiaTech', 'University_of_NorthCarolina', 'University_of_Michigan'];
    for (var i = 0; i < schoolNames.length; i++) {
        $.ajax({
            async: false,
            type: 'GET',
            // url: "http://localhost:3000/universityInfo?schoolName=" + schoolNames[i],
            url: origin + "/universityInfo?schoolName=" + schoolNames[i],
            success: function (data, status) {
                if (status != 'success') {
                    console.log("get university data failed :" + status);
                } else {
                    console.log("get university data :" + status);
                    doc[i] = {name: schoolNames[i], acceptance: data.percent_admittance, control: data.control};
                }
            }
        });
    }
    // var input = [['university', 'Acceptance Rate %', {role: 'style'}, {role: 'annotation'},'Average', {role: 'style'}]];
    var input = [['university', 'Acceptance Rate %', {role: 'style'}, {role: 'annotation'}]];
    for (var i = 0; i < doc.length; i++) {
        var color = '#88B972';
        if (doc[i].control == 'private') {
            color = '#2B4520';
        }
        // remove 'university_of_'
        var index = doc[i].name.indexOf('_of_');
        var name = doc[i].name;
        if (index >= 0) {
            name = doc[i].name.substring(index + 4);
        }
        var rate = parseFloat(doc[i].acceptance);
        input.push([name, rate, color, rate]);
        // input.push([name, rate, color, rate,'70','red']);
    }

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable(input);
        var options = {
            title: 'Universities with the Lowest Acceptance Rates (%)',
            chartArea: {width: '70%', height: '75%', left: '27%', top: '17%'},
            // colors: ['#88B972', '#2B4520'],
            //  displayAnnotations: true,
            annotations: {
                textStyle: {fontSize: 11},
            },
            hAxis: {
                // title: 'Acceptance Rate',
                minValue: 0,
                // format: 'percent'
                gridlines: {
                    count: 0
                },
                textPosition: 'none'
            },
            vAxis: {
                title: 'Public vs. Private',
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
            // fontSize: 14,
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart2'));
        chart.draw(data, options);
    });
}

function drawChart3() {
    if (!document.getElementById('chart3')) {
        return;
    }
    var origin = window.location.origin;
    var doc = [];
    var schoolNames = ['IllinoisTech', 'GeorgiaTech', 'MIT', 'harvard', 'Carnegie_Mellon', 'stanford', 'UC_berkeley', 'Yale', 'SANJOSEstate', 'BENNINGTON', 'LESLEY'];
    for (var i = 0; i < schoolNames.length; i++) {
        $.ajax({
            async: false,
            type: 'GET',
            // url: "http://localhost:3000/universityInfo?schoolName=" + schoolNames[i],
            url: origin + "/universityInfo?schoolName=" + schoolNames[i],
            success: function (data, status) {
                if (status != 'success') {
                    console.log("get university data failed :" + status);
                } else {
                    console.log("get university data :" + status);
                    doc[i] = {name: data.name, ratio: data.male_female_ratio};
                }
            }
        });
    }
    var input = [['Name', 'Male', 'Female', {role: 'annotation'}]];
    for (var i = 0; i < doc.length; i++) {
        var m = parseInt(doc[i].ratio.substring(0, doc[i].ratio.indexOf(':')));
        var f = parseInt(doc[i].ratio.substring(doc[i].ratio.indexOf(':') + 1));
        var mp = m / (m + f) * 100;
        var fp = f / (m + f) * 100;
        input.push([doc[i].name, mp, fp, '']);
    }
    google.charts.load('current', {'packages': ['bar']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable(input);
        var options = {
            title: 'University Male/Female Ratio (%)',
            annotations: {
                textStyle: {fontSize: 11},
            },
            hAxis: {
                gridlines: {
                    count: 3
                },
            },
            height: 300,
            width: 500,
            bar: {groupWidth: "60%"},
            bars: 'horizontal',
            colors: ['#2B4520', '#88B972'],
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            },
            isStacked: true
        };
        // var chart = new google.charts.Bar(document.getElementById('chart3'));
        // chart.draw(data, google.charts.Bar.convertOptions(options));
        var chart = new google.visualization.BarChart(document.getElementById('chart3'));
        chart.draw(data, options);
    });
}

function drawChart4() {
    if (!document.getElementById('chart4')) {
        return;
    }
    var origin = window.location.origin;
    var doc = [];
    var schoolNames = ['harvard', 'MIT', 'stanford', 'UC_berkeley', 'UC_LA', 'SANJOSEstate'];
    for (var i = 0; i < schoolNames.length; i++) {
        $.ajax({
            async: false,
            type: 'GET',
            // url: "http://localhost:3000/universityInfo?schoolName=" + schoolNames[i],
            url: origin + "/universityInfo?schoolName=" + schoolNames[i],
            success: function (data, status) {
                if (status != 'success') {
                    console.log("get university data failed :" + status);
                } else {
                    console.log("get university data :" + status);
                    doc[i] = {
                        name: data.name,
                        sat_verbal: parseInt(data.sat_verbal),
                        sat_math: parseInt(data.sat_math),
                    };
                }
            }
        });
    }
    var input = [['University', 'SAT Math', {role: 'style'}, 'SAT Verbal', {role: 'style'}]];
    for (var i = 0; i < doc.length; i++) {
        input.push([doc[i].name, doc[i].sat_math, '#2B4520', doc[i].sat_verbal, '#88B972']);
    }
    google.charts.load('current', {'packages': ['bar']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable(input);
        var options = {
            title: 'University SAT scores',
            orientation: 'horizontal',
            vAxis: {
                viewWindow: {
                    max: 800,
                    min: 0,
                },
                gridlines: {
                    count: 4
                },
            },
            colors: ['#2B4520', '#88B972'],
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            },
            height: 300,
            width: 500,
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart4'));
        chart.draw(data, options);
    });
}

function drawChart5() {
    if (!document.getElementById('chart5')) {
        return;
    }
    var origin = window.location.origin;
    var doc = [];
    var total = 0;
    $.ajax({
        async: false,
        type: 'GET',
        // url: "http://localhost:3000/allUniversityInfo",
        url: origin + "/allUniversityInfo",
        success: function (data, status) {
            if (status != 'success') {
                console.log("get university data failed :" + status);
            } else {
                console.log("get university data :" + status);
                for (var i = 0; i < data.length; i++) {
                    if (!doc[data[i].state]) {
                        doc[data[i].state] = 1;
                    } else {
                        doc[data[i].state] = doc[data[i].state] + 1;
                    }
                    total++;
                }
            }
        }
    });
    var input = [['State', 'University Number']];
    for (var key in doc) {
        input.push([key, doc[key]]);
    }
    google.charts.load('current', {'packages': ['geochart']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable(input);
        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            height: 300,
            width: 500,
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            },
        };
        var chart = new google.visualization.GeoChart(document.getElementById('chart5'));
        chart.draw(data, options);
    });
}

function drawChart6() {
    if (!document.getElementById('chart6')) {
        return;
    }
    var origin = window.location.origin;
    var total = 0;
    $.ajax({
        async: false,
        type: 'GET',
        // url: "http://localhost:3000/allUniversityInfo",
        url: origin + "/allUniversityInfo",
        success: function (data, status) {
            if (status != 'success') {
                console.log("get university data failed :" + status);
            } else {
                console.log("get university data :" + status);
                for (var i = 0; i < data.length; i++) {
                    total++;
                }
            }
        }
    });
    $('#chart6').html('<br><br><br><br><br><br><div id="chart6Title">Total Universities</div>' + '<br>' + '<div id="chart6Content">' + total + '</div>');
}
