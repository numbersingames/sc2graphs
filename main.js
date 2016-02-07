/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Highcharts, parseFloat */

//global Highcharts;

/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
//{
//			linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
//			stops: [
//				[0, '#2a2a2b'],
//				[1, '#3e3e40']
//			]
//		}

var theme = 0;
var theme1 =Highcharts.theme = {
	colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart: {
		backgroundColor:null,
		style: {
			fontFamily: "'Unica One', sans-serif"
		},
		plotBorderColor: '#606063'
	},
	title: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase',
			fontSize: '20px'
		}
	},
	subtitle: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase'
		}
	},
	xAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#A0A0A3'

			}
		}
	},
	yAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#A0A0A3'
			}
		}
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
		style: {
			color: '#F0F0F0'
		}
	},
	plotOptions: {
		series: {
			dataLabels: {
				color: '#B0B0B3'
			},
			marker: {
				lineColor: '#333'
			}
		},
		boxplot: {
			fillColor: '#505053'
		},
		candlestick: {
			lineColor: 'white'
		},
		errorbar: {
			color: 'white'
		}
	},
	legend: {
		itemStyle: {
			color: '#E0E0E3'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#606063'
		}
	},
	credits: {
		style: {
			color: '#666'
		}
	},
	labels: {
		style: {
			color: '#707073'
		}
	},

	drilldown: {
		activeAxisLabelStyle: {
			color: '#F0F0F3'
		},
		activeDataLabelStyle: {
			color: '#F0F0F3'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			theme: {
				fill: '#505053'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: '#505053',
			stroke: '#000000',
			style: {
				color: '#CCC'
			},
			states: {
				hover: {
					fill: '#707073',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: '#000003',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				}
			}
		},
		inputBoxBorderColor: '#505053',
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(255,255,255,0.1)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		},
		xAxis: {
			gridLineColor: '#505053'
		}
	},

	scrollbar: {
		barBackgroundColor: '#808083',
		barBorderColor: '#808083',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: '#606063',
		buttonBorderColor: '#606063',
		rifleColor: '#FFF',
		trackBackgroundColor: '#404043',
		trackBorderColor: '#404043'
	},

	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};



// Apply the theme


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
    
    
    function testingStuff() {
        $(document).ready(function() {
        $.ajax({
        type: "GET",
        url: "https://cdn.rawgit.com/numbersingames/sc2graphs/master/tables3.txt",
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
                
                tooltip: {
        	pointFormat: '{series.name}: <b>{point.y}</b>',
            	percentageDecimals: 2
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
            renderTo: 'container'
            
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
        	pointFormat: '{series.name}: <b>{point.y}</b>',
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

