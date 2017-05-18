function runGame() {

	var board = [];
	var isHe=[];
	initData();

	//  数据初始化
	function initData() {
		for(var i = 0; i < 4; i++) {
			board[i] = new Array();
			isHe[i] = new Array();
			for(var j = 0; j < 4; j++) {
				board[i][j] = 0;
                isHe[i][j]=false;
			}

		}

	}
	//	初始化背景
	var numberHtml = '';
	initBg();

	function initBg() {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				var bgItem = '#grid-cell-' + i + '-' + j;
				$(bgItem).css({
					left: getPosition(i) + "px",
					top: getPosition(j) + "px"
				});

			}
		}
	}

	// 刷新页面
	function upDateScreen() {
		$('.number-cell').remove();
		
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				isHe[i][j]=false;
			}
		}
		
		
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				numberHtml += '<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>';
			}

		}
		$('#grid-container').append(numberHtml);

		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {

				if(board[i][j] == 0) {
					$('#number-cell-' + i + '-' + j).css({
						width: 0,
						height: 0,
						left: (50 + getPosition(j)) + 'px',
						top: (50 + getPosition(i)) + "px"
					});
				} else {
					$('#number-cell-' + i + '-' + j).css({
						width: "100px",
						height: "100px",
						left: getPosition(j) + 'px',
						top: getPosition(i) + "px",
						background: getNumberBackgroundColor(board[i][j]),
						color: getNumberColor(board[i][j])

					});

					$('#number-cell-' + i + '-' + j).text(board[i][j]);

				}

			}
		}

	}



inintOneCell();
inintOneCell();
upDateScreen();
	
	function inintOneCell() {
		
		
		var randomPosition=getRandomPosition();
		board[randomPosition.x][randomPosition.y] = getRandomNum();
		 console.log('randomPosition.x: '+randomPosition.x+" randomPosition.y: "+randomPosition.y+"   board: "+board[randomPosition.x][randomPosition.y]);
		

	}
	var lastTime=+new Date();
	var nowTime=0;
	$(document).on('keydown', function(event) {

		switch(event.keyCode) {
			case 37:
				//			向左运动
			nowTime=+new Date();
			if(nowTime-lastTime>250){
				lastTime=nowTime;
					if(canMoveLeft()) {

						setTimeout(function() {
							inintOneCell();
						}, 150);
						setTimeout(function() {
							
							for(var i=0;i<4;i++){
								for(var j=0;j<4;j++){
									if(board[i][j]!=0){
										console.log('borad: '+board[i][j]+"   i: "+i+"  j: "+j);
										
									}
								}
							}
				                  console.log('--------------------------');
										console.log('--------------------------');
							upDateScreen();
					
						}, 200);
						
                 
					}
			}
				

				break;

			case 38:
				//						向上运动

			nowTime=+new Date();
			if(nowTime-lastTime>250){
				lastTime=nowTime;
					if(canMoveTop()) {

						setTimeout(function() {
							inintOneCell();
						}, 150);
						setTimeout(function() {
								for(var i=0;i<4;i++){
								for(var j=0;j<4;j++){
									if(board[i][j]!=0){
										console.log('borad: '+board[i][j]+"   i:  "+i+"  j: "+j);
									}
								}
							}
								console.log('--------------------------');
										console.log('--------------------------');
							upDateScreen();
							
						}, 200);
					}
			}
				
				

				break;

			case 39:
				//			向右运动
			
			nowTime=+new Date();
			if(nowTime-lastTime>250){
				lastTime=nowTime;
				if(canMoveRight()) {

							setTimeout(function() {
							inintOneCell();
						}, 150);
						setTimeout(function() {
								for(var i=0;i<4;i++){
								for(var j=0;j<4;j++){
									if(board[i][j]!=0){
										console.log('borad: '+board[i][j]+"  i: "+i+"  j: "+j);
									}
								}
							}
								console.log('--------------------------');
										console.log('--------------------------');
							upDateScreen();
						}, 200);
					
				}
				break;
			}
					
				//			向下运动
			case 40:
			nowTime=+new Date();
			if(nowTime-lastTime>250){
				lastTime=nowTime;
				if(canMoveBottom()) {

						setTimeout(function() {
							inintOneCell();
						}, 150);
						setTimeout(function() {
							for(var i=0;i<4;i++){
								for(var j=0;j<4;j++){
									if(board[i][j]!=0){
										console.log('borad: '+board[i][j]+"   i: "+i+"  j: "+j);
									}
								}
							}
							
							console.log('--------------------------');
										console.log('--------------------------');
							upDateScreen();
								
						}, 200);
					}
			}
					
				
				break;

			default:
				break;
		}

	});

	//     向左运动开始
	function moveLeft() {
		//   1.填补空位 	
		//   2.合并
		for(var i = 0; i < 4; i++) {
			for(var n = 1; n < 4; n++) {

				var item = board[i][n];

				if(item != 0) {

					var moveLeftPosition = canMoveLeftWhere(i, n, item);
					var whereLeft = moveLeftPosition.a;
					var whereTop = moveLeftPosition.b;
					var isHe = moveLeftPosition.he;
					if(n != whereTop) {
						moveNumAnimation(i, n, whereLeft, whereTop, isHe);
					}

				}

			}
		}

	}

	function canMoveLeftWhere(x, y, boardItem) {

		for(var i = y - 1; i >= 0; i--) {
			if(board[x][i] != 0) {
				if(board[x][i] == boardItem) {
					if(isHe[x][i]){
					return {
						a: x,
						b: i + 1,
						he: false
					}
					}
					
					else{
						isHe[x][i]=true;
						return {
						a: x,
						b: i,
						he: true
					}
					}

				} else {
					return {
						a: x,
						b: i + 1,
						he: false
					}
				}
			};
		}

		return {
			a: x,
			b: 0,
			he: false
		}
	}

	function canMoveLeft() {
		//  			左侧有0
		//              有可以合并的cell
		if(!canLeftMove() && !canLeftAdd()) {
			return false;
		}
		moveLeft();

		return true;
	}

	function canLeftAdd() {
		for(var i = 0; i < 4; i++) {
			for(var j = 1; j < 4; j++) {
				if(board[i][j] != 0) {
					if(board[i][j] == board[i][j - 1]) {
						return true;
					}

				}

			}
		}
		return false;
	}

	function canLeftMove() {
		for(var i = 0; i < 4; i++) {
			for(var j = 1; j < 4; j++) {

				if(board[i][j] != 0) {
					for(var m = 0; m < j; m++) {
						if(board[i][m] == 0) {
							return true;
						}
					}

				}

			}
		}
		return false;
	}
	//向左运动结束

	//向上运动开始
	function canMoveTop() {
		//  			左侧有0
		//              有可以合并的cell
		if(!canTopMove() && !canTopAdd()) {
			return false;
		}

		moveTop();

		return true;
	}

	function moveTop() {
		for(var i = 1; i < 4; i++) {
			for(var n = 0; n < 4; n++) {

				var item = board[i][n];

				if(item != 0) {

					var moveTopPosition = canMoveTopWhere(i, n, item);

					var whereLeft = moveTopPosition.a;
					var whereTop = n;
				
					var isHe = moveTopPosition.he;
					if(whereLeft != i) {
						moveNumAnimation(i, n, whereLeft, whereTop, isHe);
					}
				}

			}
		}

	}

	function canTopAdd() {
		for(var i = 1; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(board[i][j] != 0) {
					if(board[i][j] == board[i - 1][j]) {
						return true;
					}

				}

			}
		}
		return false;
	}

	function canMoveTopWhere(x, y, boardItem) {

		for(var i = x - 1; i >= 0; i--) {
			if(board[i][y] != 0) {
				if(board[i][y] == boardItem) {
					
					if(isHe[i][y]){
					return {
						a: i + 1,
						b: y,
						he: false
					}	
					}
					
					else{
						isHe[i][y]=true;
						return {
						a: i,
						b: y,
						he: true
					}
					}
					
				} else {
					return {
						a: i + 1,
						b: y,
						he: false
					}
				}
			};

		}

		return {
			a: 0,
			b: y,
			he: false
		}
	}

	function canTopMove() {
		for(var i = 1; i < 4; i++) {
			for(var j = 0; j < 4; j++) {

				if(board[i][j] != 0) {
					for(var m = i - 1; m >= 0; m--) {
						if(board[m][j] == 0) {
							return true;
						}
					}

				}

			}
		}
		return false;
	}
	//向上运动结束

	//向右运动开始
	function canMoveRight() {
		//  			左侧有0
		//              有可以合并的cell
		if(!canRightMove() && !canRightAdd()) {
			return false;
		}
		
		moveRight();

		return true;
	}

	function moveRight() {
		for(var i = 0; i < 4; i++) {
			for(var n = 2; n >= 0; n--) {

				var item = board[i][n];

				if(item != 0) {

					var moveLeftPosition = canMoveRightWhere(i, n, item);
					var whereLeft = moveLeftPosition.a;
					var whereTop = moveLeftPosition.b;
					var isHe = moveLeftPosition.he;
					if(whereTop != n) {
						moveNumAnimation(i, n, whereLeft, whereTop, isHe);
					}

				}

			}
		}

	}

	function canRightAdd() {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 3; j++) {
				if(board[i][j] != 0) {
					if(board[i][j] == board[i][j+1]) {
						return true;
					}

				}

			}
		}
		return false;
	}

	function canMoveRightWhere(x, y, boardItem) {

		for(var i = y + 1; i < 4; i++) {
			if(board[x][i] != 0) {
				if(board[x][i] == boardItem) {
					if(isHe[x][i]){
						return {
						a: x,
						b: i - 1,
						he: false
					}
					}else{
						isHe[x][i]=true;
						return {
						a: x,
						b: i,
						he: true
					}
					}
					
				} else {
					return {
						a: x,
						b: i - 1,
						he: false
					}
				}
			};

		}

		return {
			a: x,
			b: 3,
			he: false
		}
	}

	function canRightMove() {
		for(var i = 0;i<4; i++) {
			for(var j = 3; j>=0; j--) {

				if(board[i][j] != 0) {
					for(var m = j + 1; m < 4; m++) {
						if(board[i][m] == 0) {
							return true;
						}
					}

				}

			}
		}
		return false;
	}

	//向右运动结束

	// 向下运动开始

	function canMoveBottom() {
		//  			左侧有0
		//              有可以合并的cell
		if(!canBottomMove() && !canBottomAdd()) {
			return false;
		}
	
		moveBottom();

		return true;
	}

	function moveBottom() {
		for(var bi = 3; bi >=0; bi--) {
			for(var bn = 0; bn < 4; bn++) {

				var item = board[bi][bn];

				if(item != 0) {

					var moveBottomPosition = canMoveBottomWhere(bi, bn, item);
					var whereLeft = moveBottomPosition.a;
					var whereTop =moveBottomPosition.b;
					var isHe = moveBottomPosition.he;
					if(whereLeft != bi){
						moveNumAnimation(bi, bn, whereLeft, whereTop, isHe);
					}
						
					

				}

			}
		}

	}

	function canBottomAdd() {
		for(var bi = 0; bi < 3; bi++) {
			for(var bj = 0; bj < 4; bj++) {
				if(board[bi][bj] != 0) {
					if(board[bi][bj] == board[bi + 1][bj]) {
						return true;
					}

				}

			}
		}
		return false;
	}

	function canMoveBottomWhere(x, y, boardItem) {

		for(var bi = x + 1; bi < 4; bi++) {
			if(board[bi][y] != 0) {
				if(board[bi][y] == boardItem) {
					
					
					if(isHe[bi][y]){
						return {
						a: bi - 1,
						b: y,
						he: false
					}
					}else{
						return {
						a: bi,
						b: y,
						he: true
					}
					}
					
				} else {
					return {
						a: bi - 1,
						b: y,
						he: false
					}
				}
			};

		}

		return {
			a: 3,
			b: y,
			he: false
		}
	}

	function canBottomMove() {
		for(var bi = 0; bi < 3; bi++) {
			for(var bj = 0; bj < 4; bj++) {

				if(board[bi][bj] != 0) {
					for(var m = bi + 1; m < 4; m++) {
						if(board[m][bj] == 0) {
							return true;
						}
					}

				}

			}
		}
		return false;
	}

	// 向下运动结束

	function getRandomNum() {

		return Math.random() < 0.5 ? 2 : 4;

	}

	function getRandomPosition() {
		var randomX = 0;
		var randomY = 0;
	
		for(var count=0;count<10;count++){
			randomX = Math.floor(Math.random() * 4);
			randomY = Math.floor(Math.random() * 4);
          
			if(board[randomX][randomY] == 0) {
				
				return {
					x: randomX,
					y: randomY
				};

			}
		}

		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {

				if(board[i][j] === 0) {
					return {
						x: i,
						y: j
					};
				}

			}
		}

	}

	function getPosition(x) {
		return 20 + 120 * x;
	}

	function getNumberBackgroundColor(number) {
		switch(number) {
			case 2:
				return "#eee4da";
				break;
			case 4:
				return "#ede0c8";
				break;
			case 8:
				return "#f2b179";
				break;
			case 16:
				return "#f59563";
				break;
			case 32:
				return "#f67c5f";
				break;
			case 64:
				return "#f65e3b";
				break;
			case 128:
				return "#edcf72";
				break;
			case 256:
				return "#edcc61";
				break;
			case 512:
				return "#9c0";
				break;
			case 1024:
				return "#33b5e5";
				break;
			case 2048:
				return "#09c";
				break;
			case 4096:
				return "#a6c";
				break;
			case 8192:
				return "#93c";
				break;
		}

		return "black";
	}

	function getNumberColor(number) {
		if(number <= 4)
			return "#776e65";

		return "white";
	}

	function moveNumAnimation(fromLeft, fromTop, toLeft, toTop, isHe) {
		
		if(isHe) {
			var sum = board[fromLeft][fromTop] + board[toLeft][toTop];
			board[toLeft][toTop] = sum;
			board[fromLeft][fromTop] = 0;
			setTimeout(function(){
		$('#number-cell-' + toLeft + '-' + toTop).text(sum);
		},50);
		} else {
			board[toLeft][toTop] = board[fromLeft][fromTop];
			board[fromLeft][fromTop] = 0;
		}
		var toX = getPosition(toTop) + 'px';
		var toY = getPosition(toLeft) + 'px';

		
		
		$('#number-cell-' + fromLeft + '-' + fromTop).animate({
			left: toX,
			top: toY
		}, 100);

	}
}