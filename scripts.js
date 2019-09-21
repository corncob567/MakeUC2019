function Create2DArray(rows, columns) {
  	var arr = new Array(columns);

  	for (var i=0; i<rows; i++) {
    	arr[i] = new Array(rows);
    	arr[i].fill("",0,rows);
  	}
  	return arr;
}

var width = 5;
var height = 5;
var Board = {
	grid : document.getElementsByClassName('grid-item'),
	//width : new Number('5'),
	//height : new Number('5'),
	table : Create2DArray(height, width),
	customTable : Create2DArray(height, width),
	createNumbers : function() {
		for (var i = 0; i < this.table.length; i++) { // i = column
			var existingNums = [];
			for (var j = 0; j < this.table[i].length; j++) { // j = row
				while(1){
					var rowMin = i * 15;
					var rowMax = 15;
					var squareValue = Math.ceil(Math.random() * rowMax) + rowMin;
					if (!existingNums.includes(squareValue)) {
						this.table[i][j] = squareValue;
						existingNums.push(squareValue);
						break;
					}
				}
			}
		}
	},
	createLetters : function() {
		for (var i = 0; i < this.table.length; i++) { // i = column
			for (var j = 0; j < this.table[i].length; j++) { // j = row
				switch (i){
					case 0:
						this.table[i][j] = "B " + String(this.table[i][j]);
						break;
					case 1:
						this.table[i][j] = "I " + String(this.table[i][j]);
						break;
					case 2:
						this.table[i][j] = "N " + String(this.table[i][j]);
						break;
					case 3:
						this.table[i][j] = "G " + String(this.table[i][j]);
						break;
					case 4:
						this.table[i][j] = "O " + String(this.table[i][j]);
						break;
				}
			}
		}
	},
	displayNumbers : function() {
		for (var i = 0; i < this.table.length; i++) { // i = column
			for (var j = 0; j < this.table[i].length; j++) { // j = row
				if (FreeSpace.isFree && i == FreeSpace.freeLocation2d[1] && j == FreeSpace.freeLocation2d[0]) {
					continue;
				}
				else {
					this.grid[(i * width) + j].innerHTML = this.table[j][i];
				}
			}
		}
	},
	displayCustom : function () {
		for (var i = 0; i < this.customTable.length; i++) { // i = column
			for (var j = 0; j < this.customTable[i].length; j++) { // j = row
				if (FreeSpace.isFree && i == FreeSpace.freeLocation2d[1] && j == FreeSpace.freeLocation2d[0]) {
					continue;
				}
				else {
					this.grid[(i * width) + j].innerHTML = this.customTable[j][i];
				}
			}
		}
	},
	checkWin : function() {
		//get colors
		win = false;
		colorArray = [];
		winArray = [];
		for (var i = 0; i < this.grid.length; i++) {
			colorArray[i] = getComputedStyle(this.grid[i]).backgroundColor;
			
			if (colorArray[i] == "rgb(160, 160, 160)"){
				colorArray[i] = true;
			}
			else{
				colorArray[i] = false;
			}
		}

		for(var i = 0; i < 5; i++){
			winArray = colorArray.slice(i*5, (i*5)+5);

			if(winArray[0] == true && winArray[1] == true && winArray[2] == true && winArray[3] == true && winArray[4] == true){
				win = true;
			}
		}


		winArray = [];

		for(var i = 0; i < 5; i++){
			for(var j = i; j < 25; j = j + 5){
				winArray.push(colorArray[j]);
			}
			for(var i = 0; i < 5; i ++){
				winArray = winArray.slice(i*5, (i*5) + 5);


				if(winArray[0] == true && winArray[1] == true && winArray[2] == true && winArray[3] == true && winArray[4] == true){
					win = true;
				}
			}
		}


		console.log(winArray);
		
		console.log(win);
		return win;

	


		
	}

}

var BoardMode = {
	mode : "Autogen",
	selector : document.getElementById("modeSelect"),
	toggle() {
		switch($("#modeSelect :selected").val()){
			case "Custom":
				if (Editable.isEditable){
					Editable.toggle();
				}
				$(".customize-button").css({'background-color':'blue', 'color':'#01CCFE'});
				this.mode = "Custom";
				Board.displayCustom();
				break;
			case "Autogen":
				if (Editable.isEditable){
					Editable.toggle();
				}
				$(".customize-button").css({'background-color':'#8A8CC0', 'color':'#000000'}); 
				this.mode = "Autogen";
				Board.displayNumbers();
				break;
			case "Images":
				if (Editable.isEditable){
					Editable.toggle();
				}
				$(".customize-button").css({'background-color':'blue', 'color':'#01CCFE'});
				this.mode = "Images";
				break;
		}
	}
}

var Editable = {
	isEditable : false,
 	squares : document.getElementsByClassName('grid-item'),
 	toggle() {
 		if (BoardMode.mode == "Custom") {
	 		if (this.isEditable){
	 			this.isEditable = false;

	 			$(".shuffle-button").css({'background-color':'blue', 'color':'#01CCFE'});
	 			$("#IdEditable").attr("value","Customize");		
	 			for (var i = 0; i < this.squares.length; i++) {
					this.squares[i].setAttribute('contenteditable', 'false');
				}
	 		}
	 		else {
	 			this.isEditable = true;

	 			$(".shuffle-button").css({'background-color':'#8A8CC0', 'color':'#000000'}); 
	 			$("#IdEditable").attr("value","Play");
	 			for (var i = 0; i < this.squares.length; i++) {
					this.squares[i].setAttribute('contenteditable', 'true');
				}
	 		}
	 	}
		if (BoardMode.mode == "Images") {
			// Do nothing
		}
	}
}

var FreeSpace = {
	isFree : false,
	freeLocation2d : [Math.floor(width / 2), Math.floor(width / 2)],
	freeLocation1d : (Math.floor(width / 2) * width) + (Math.floor(width / 2)),
	toggle() {
		if (this.isFree) {
			this.isFree = false;
			if (BoardMode.mode == "Autogen") {
				Board.grid[this.freeLocation1d].innerHTML = Board.table[this.freeLocation2d[0]][this.freeLocation2d[1]];
			}
			if (BoardMode.mode == "Custom"){
				Board.grid[this.freeLocation1d].innerHTML = Board.customTable[this.freeLocation2d[0]][this.freeLocation2d[1]];
			}
		}
		else {
			this.isFree = true;
			Board.grid[this.freeLocation1d].innerHTML = "FREE";
		}
	}
}

function updateMode() {
	BoardMode.toggle();
}

function toggleFreeSpace() { 
	FreeSpace.toggle();
}

function toggleEditable() {
	Editable.toggle();
}

function shuffleContents() {
	if (BoardMode.mode == "Custom" && !Editable.isEditable){
		var newBoard = new Array(Board.grid.length);
		for (var i = 0; i < Board.grid.length; i++) {
			while (1) {
				var randIndex = Math.floor(Math.random() * Board.grid.length);
				if (newBoard[randIndex] == undefined) {
					newBoard[randIndex] = Board.customTable[Math.floor(i / width)][i % width];
					break; 
				}
			}
		}
		for (var i = 0; i < Board.grid.length; i++ ) {
			Board.customTable[Math.floor(i / width)][i % width] = newBoard[i];
		}
		Board.displayCustom();
	}
	if (BoardMode.mode == "Autogen") {
		Board.createNumbers();
		Board.createLetters();
		Board.displayNumbers();
	}
	if (BoardMode.mode == "Images") {
		console.log("Not yet supported");
	}
}

function boardCheckWin(){
	Board.checkWin();
}


// console.log(Board.grid);





$(document).ready(function() {
	$(".grid-item").click(function() {
		if (!Editable.isEditable) {	
    		$(this).darken();

    			boardCheckWin();

    	}
  	});

});


$("body").on('DOMSubtreeModified', "#cell", function() {
	if (BoardMode.mode == "Custom" && Editable.isEditable){
		for (var i = 0; i < Board.customTable.length; i++) { // i = column
			for (var j = 0; j < Board.customTable[i].length; j++) { // j = row
				if (!(FreeSpace.isFree && Board.customTable[FreeSpace.freeLocation2d[0]][FreeSpace.freeLocation2d[1]])) {
					Board.customTable[j][i] = Board.grid[(i * width) + j].innerHTML;
				}
			}
		}
	}
});
		


jQuery.fn.darken = function() {
  $(this).each(function() {
		var darkenPercent = 35; // darken color by 35 percent
		var rgb = $(this).css('background-color');
		rgb = rgb.replace('rgb(', '').replace(')', '').split(',');
		var red = $.trim(rgb[0]);
		var green = $.trim(rgb[1]);
		var blue = $.trim(rgb[2]);
		// darken
if ((red<255) && (blue<255) && (green<255)) {

		red = 255;
		green = 255;
		blue = 255;
		}
		// lighten
		else{
		red = 160;
		green = 160;
		blue = 160; 
		
		}
		
		rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		
		$(this).css('background-color', rgb);
		boardCheckWin();
  });
  return this;
}

Board.createNumbers();
Board.createLetters();
Board.displayNumbers();
//$(".customize-button").hide();