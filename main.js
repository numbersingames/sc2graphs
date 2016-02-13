    /* global Highcharts, parseFloat */

var currentRegion = 0;
    var currentLeague = 0;
    var playersTable = new Array();
    var charts=[];
    var leagues = ["grandmaster", "master", "diamond", "platinum", "gold", "silver", "bronze"];
    var shortLeagues = [ "GM", "M", "D", "P", "G", "S", "B" ];
    var regions = ["global", "eu", "us", "kr", "cn", "sea", "global" ];
    var races = ["terran", "zerg", "protoss", "random"];
    var columnChart;
    var pieChart;
    var stackedChart;
    var currentChart;
    
    
    function startSC2Stats() {
        $(document).ready(function() {
        $.ajax({
        type: "GET",
        url: "https://cdn.rawgit.com/numbersingames/sc2graphs/tree/master/tables5",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});  
    };
    //https://cdn.rawgit.com/numbersingames/master/dc66ff825d01d72ae8604a385b7297f25dec43e3/tables3.txt
   var startColumn = function() { 
       
        columnChart = new Highcharts.Chart({     
               credits: {
            enabled: false
        }, 
               chart: { 
                    renderTo: 'container2',
                    type: 'column'
                },
                title: {
                    text: 'Race Distrubution - ' + leagues[currentLeague] + ' - ' + regions[currentRegion]                 
                },
                
                yAxis: {
                    title: {
                        text: 'Players'
                    }
                },
                xAxis: {
                    labels:
                {
                    enabled: false
                }
            },
            tooltip: {
                formatter:function(){
                    return this.series.name +': <b>' + this.point.y + '</b>';
                }
            },
            
            series: [{
            name: 'T',
            data: [playersTable[currentRegion][currentLeague][0]],
            color: '#7cb5ec'
        }, {
            name: 'Z',
            data: [playersTable[currentRegion][currentLeague][1]],
            color: '#FFB8B8'

        }, {
            name: 'P',
            data: [playersTable[currentRegion][currentLeague][2]],
            color: '#90ed7d'
        }, {
            name: 'R',
            data: [playersTable[currentRegion][currentLeague][3]],
            color: 'rgba(255,255,130,1)'

        }]
                
        
    });
    //columnChart.setOption(Theme);
    charts.push(columnChart);
};
var HCDefaults;

    function processData(allText) {
        HCDefaults = $.extend(true, {}, Highcharts.getOptions(), {});
        //ResetOptions(theme1);
        for (var l = 0; l < 6; l++) {
            playersTable[l] = new Array(7);
            
            for (var i = 0; i < 7; i++) {
                playersTable[l][i]= new Array(4);
                
                for (var j = 0; j < 4; j++) {
                    playersTable[l][i][j] = 0;
                   
                }
            }
        }
        var arrays = allText.split("\n");
       
        var line = 0;
        
        for (var l = 1; l < 6; l++) {
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 4; j++) {
                    
                    playersTable[l][i][j] = parseInt(arrays[line]);
                    //percentageTable[l][i][j] = parseFloat((temp[1]));
                    line++;
                }
            }
        }
        
        for (var i = 0; i < 7; i++) {
        var totalT = 0;
        var totalZ = 0;
        var totalP = 0;
        var totalR = 0;
            for (var j = 1; j < 6; j++) {
                totalT += playersTable[j][i][0];
                totalZ += playersTable[j][i][1];
                totalP += playersTable[j][i][2];
                totalR += playersTable[j][i][3];
            }
          playersTable[0][i][0] = totalT;
          playersTable[0][i][1] = totalZ;
          playersTable[0][i][2] = totalP;
          playersTable[0][i][3] = totalR;
         
          
        } 
        startStacked();
        startPie();
        startColumn();
        setFact();
        setRegionStats();
        
};
    
var startStacked = function() {
    
   
        stackedChart = new Highcharts.Chart({
        credits: {
            enabled: false
        },    
        chart: {
            type: 'column',
            renderTo: 'container1'
            
        },
        title: {
            text: 'Races split by league - ' + regions[currentRegion]
        },
        xAxis: {
            categories: ['T', 'Z', 'P', 'R']            
        },
        yAxis: {
            
            title: {
                text: '%'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
                
            }
        },
        series: [{
            name: 'GM',
            data: getAllRegions(currentRegion,0),
            color: 'rgba(255,200,20,1)'
        }, {
            name: 'M',
            data: getAllRegions(currentRegion,1),
            color: 'rgba(100,100,240,1)'
        }, {
            name: 'D',
            data: getAllRegions(currentRegion,2),
            color: 'rgba(150,150,240,1)'
        }, {
            name: 'P',
            data: getAllRegions(currentRegion,3),
            color: 'rgba(229,228,226,1)'
        }, {
            name: 'G',
            data: getAllRegions(currentRegion,4),
            color: 'rgba(255,215,0,1)'
        }, {
            name: 'S',
            data: getAllRegions(currentRegion,5),
            color: 'rgba(192,192,192,1)'
        }, {
            name: 'B',
            data: getAllRegions(currentRegion,6),
            color: 'rgba(205, 127, 50,0.9)'
        }]
    
    });
    //stackedChart.setOptions(Theme);
    charts.push(stackedChart);
};    

function getAllRegions(r, l) {
    var list = [];
    list.push(playersTable[r][l][0]);
    list.push(playersTable[r][l][1]);
    list.push(playersTable[r][l][2]);
    list.push(playersTable[r][l][3]);
    return list;
};

function getPercents(race) {
    var upto = 0;
    var total = 0;
    for (var i = 0; i < 7; i++) {
        total+= playersTable[currentRegion][i][race];
    }
    for (var i = 6; i > currentLeague; i--) {
        upto += playersTable[currentRegion][i][race];
    }
    
    return parseFloat((upto / total) *100).toFixed(2) + " to " + 
            parseFloat( ((upto + playersTable[currentRegion][currentLeague][race]) / total)*100).toFixed(2) + "% ";
};

function setFact() {
    var factsText = "";
    for (var i = 0; i < 4; i++) {
        factsText += "If you are a " + leagues[currentLeague] + " " + races[i] +  " you are within the top " + getPercents(i) + races[i] + "s " + " on " + regions[currentRegion];
        if (i < 3) {
            factsText+= "<br>";
        }
    }
    $( "#facts" ).html(factsText);
};

function setRegionStats() {
    var regionsText = "";
    var totalT = 0;
    var totalZ = 0;
    var totalP = 0;
    var totalR = 0;
    var total = 0;
    for (var i = 1; i < 6; i++) {
        totalT += playersTable[currentRegion][i][0];
        totalZ += playersTable[currentRegion][i][1];
        totalP += playersTable[currentRegion][i][2];
        totalR += playersTable[currentRegion][i][3];
    }
    total+= totalT+totalZ+totalP+totalR;
    regionsText += "Race representation on " + regions[currentRegion] + " (%):"+ 
            "<br> Terran: " + parseFloat((totalT / total) *100).toFixed(2)+
            "<br> Zerg: " + parseFloat((totalZ / total) *100).toFixed(2) +
            "<br> Protoss: " + parseFloat((totalP / total) *100).toFixed(2) +
            "<br> Random: " + parseFloat((totalR / total) *100).toFixed(2);
    
    $( "#regionStats" ).html(regionsText);
};

function startPie() {
    
    
        pieChart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
            chart: {
                renderTo: 'container3',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true
            },
            title: {
                text: '' +regions[currentRegion] + " - " +leagues[currentLeague]
            },
            tooltip: {
        	formatter: function() {
                return 'Race Distrubution - ' + leagues[currentLeague] + ' - ' + regions[currentRegion]+ ': <b>' + this.point.y + '</b>';
                   
                },
                //pointFormat: 'Race Distrubution - ' + leagues[currentLeague] + ' - ' + regions[currentRegion]+': <b>{point.y}</b>',
            	percentageDecimals: 2
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) + " %";
                        }
                    }
                }
            },
         series: [{
                
                type: 'pie',
                name: 'Race Distrubution - ' + leagues[currentLeague] + ' - ' + regions[currentRegion],
                data: [
                    ['T',   playersTable[currentRegion][currentLeague][0]],
                    ['Z',   playersTable[currentRegion][currentLeague][1]],
                    ['P',   playersTable[currentRegion][currentLeague][2]],
                    ['R',   playersTable[currentRegion][currentLeague][3]]
                
                    ]
                
            }]    
        });
 
    //pieChart.series[0].data[1].setColor({color: 'rgba(255,184,184,1)'});    
    //pieChart.setOptions(Theme);
    charts.push(pieChart);
};

var changeScene = function() { 
    pieChart.series[0].setData([
        ['T', playersTable[currentRegion][currentLeague][0]],
        ['Z', playersTable[currentRegion][currentLeague][1]],
        ['P', playersTable[currentRegion][currentLeague][2]],
        ['R', playersTable[currentRegion][currentLeague][3]]
    ] );
    pieChart.setTitle({text:''+leagues[currentLeague] + " - " + regions[currentRegion]}); 
  
    
    
    columnChart.series[0].setData([playersTable[currentRegion][currentLeague][0]]);
    columnChart.series[1].setData([playersTable[currentRegion][currentLeague][1]]);
    columnChart.series[2].setData([playersTable[currentRegion][currentLeague][2]]);
    columnChart.series[3].setData([playersTable[currentRegion][currentLeague][3]]);
    columnChart.setTitle({text:''+leagues[currentLeague] + " - " + regions[currentRegion]}); 
    
    stackedChart.setTitle({text:'races split by league - ' + regions[currentRegion]});
    

    stackedChart.series[0].setData(getAllRegions(currentRegion,0));
    stackedChart.series[1].setData(getAllRegions(currentRegion,1));
    stackedChart.series[2].setData(getAllRegions(currentRegion,2));
    stackedChart.series[3].setData(getAllRegions(currentRegion,3));
    stackedChart.series[4].setData(getAllRegions(currentRegion,4));
    stackedChart.series[5].setData(getAllRegions(currentRegion,5));
    stackedChart.series[6].setData(getAllRegions(currentRegion,6));
    
    setFact();
    setRegionStats();
};

function ResetOptions(themeSelected) {
    // Fortunately, Highcharts returns the reference to defaultOptions itself
    // We can manipulate this and delete all the properties
    var defaultOptions = Highcharts.getOptions();
    for (var prop in defaultOptions) {
        if (typeof defaultOptions[prop] !== 'function') delete defaultOptions[prop];
    }
    // Fall back to the defaults that we captured initially, this resets the theme
    Highcharts.setOptions(HCDefaults);
    Highcharts.setOptions(themeSelected);
};

var setRegion = function(region) {
    currentRegion = region;
    changeScene();
};

var setLeague = function(league) {
  currentLeague = league;
  changeScene();
};

