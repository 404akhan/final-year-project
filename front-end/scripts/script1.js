var base_url = "https://backend-jasa-fyp.herokuapp.com";
// var base_url = "http://localhost:3000";
var entity = 'trump',
	year = '2018',
	month = '9';


function getComments(entity, year, month, day)
{
	var limit = 100;
	var comments_arr_pos = [];
	var url = base_url + "/rest?entity=" + entity + "&sentiment=positive" + 
		"&year=" + year + "&month=" + month + "&day=" + day + "&limit=" + limit;
	
	$.get({url: url, async: false}, function( data ) 
	{
		for (var d in data)
			comments_arr_pos.push(data[d]['comment']);
	});


	var comments_arr_neg = [];
	url = base_url + "/rest?entity=" + entity + "&sentiment=negative" + 
		"&year=" + year + "&month=" + month + "&day=" + day + "&limit=" + limit;
	
	$.get({url: url, async: false}, function( data ) 
	{
		for (var d in data)
			comments_arr_neg.push(data[d]['comment']);
	});

	return {'pos': comments_arr_pos, 'neg': comments_arr_neg};
}


google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(function(){ drawChart2(entity, year, month) });


function drawChart2(entity, year, month) 
{
	var dataPointsPos;
	var url_count = base_url + "/count?entity=" + entity + "&year=" + year + "&month=" + month;
	$.get({url: url_count, async: false}, function( data ) 
	{
		dataPointsPos = data;
	});

	
	var data = google.visualization.arrayToDataTable(dataPointsPos);
	var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

	var options = 
	{
		title: 'Comments about ' + entity + ' on Twitter during ' + year + '-' + month,
		chartArea: 
		{
			width: '60%', 
			height: '90%',     
			backgroundColor: 
			{
				'fill': '#F4F4F4',
				'opacity': 100
			}
		},
		hAxis: 
		{
			title: 'Number of Comments',
			minValue: 0,
		},
		vAxis: 
		{
			title: 'Date'
		}
		 
	};


	function selectHandler() 
	{
		var selectedItem = chart.getSelection()[0];
		console.log(selectedItem);
		
		if (selectedItem) 
		{
			var date = data.getValue(selectedItem.row, 0).split('-');
			var year = date[0],
				month = date[1],
				day = date[2];

			var comments = getComments(entity, year, month, day);

			$('#tbodyid').empty();
			for (var i = 0; i < Math.max(comments["pos"].length, comments["neg"].length); i++) 
			{
				var pos = comments["pos"][i];
				var neg = comments["neg"][i];
				
				if (!pos) 
					pos = "";
				if (!neg)
					neg = "";

				$('#tbodyid').append('<tr><td>' + (i+1) + '</td><td>' + pos + 
					'</td><td>' + neg + '</td></tr>');
			}
		}
	}

	google.visualization.events.addListener(chart, 'select', selectHandler);    
	chart.draw(data, options);
}
