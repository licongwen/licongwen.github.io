

$(function () {
	$("#dowebok").fullpage({
		anchors:['page1','page2','page3','page4','page5'],
		scrollSpeed:400,
		menu:"#fullpageMenu",
		navigation:true,
		navigationPosition:'right',
		//navigationToltips:['page1','page2','page3','page4','page5'],
	});

	//顶部文字切换
	$('#header_p').mouseover(function(event) {
		$('#header_p1').html('Resume');
		$('#header_p2').html('前端工程师');
	}).mouseout(function(event) {
		$('#header_p1').html("F2E");
		$('#header_p2').html('个人简历');
	});;

});