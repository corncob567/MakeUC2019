function Create2DArray(rows, columns) {
  var arr = new Array(columns);

  for (var i=0; i<rows; i++) {
     arr[i] = new Array(rows);
  }
  return arr;
}

var Board = {
	grid : document.getElementsByClassName('grid-item'),
	table : Create2DArray(5,5),
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
				this.grid[(i * 5) + j].innerHTML = this.table[j][i];
			}
		}
	}
}

var Editable = {
	isEditable : false,
 	squares : document.getElementsByClassName('grid-item'),
 	toggle() {
 		if (this.isEditable){
 			this.isEditable = false;
 			for (var i = 0; i < this.squares.length; i++) {
				this.squares[i].setAttribute('contenteditable', 'false');
			}
 		}
 		else {
 			this.isEditable = true;
 			for (var i = 0; i < this.squares.length; i++) {
				this.squares[i].setAttribute('contenteditable', 'true');
			}
 		}
		
	}
}

function toggleEditable() {
	Editable.toggle();
}

Board.createNumbers();
Board.createLetters();
Board.displayNumbers();
// console.log(Board.grid);



$(document).ready(function(){
	$(".grid-item").click(function(){
    	$(this).darken();
  	});
});


jQuery.fn.toggleDark = function() {
  $(this).each(function() {
		var darkenPercent = 35; // darken color by 35 percent
		var rgb = $(this).css('background-color');
		rgb = rgb.replace('rgb(', '').replace(')', '').split(',');
		var red = $.trim(rgb[0]);
		var green = $.trim(rgb[1]);
		var blue = $.trim(rgb[2]);
				
		// darken
		if ()
		red = parseInt(red * (100 - darkenPercent) / 100);
		green = parseInt(green * (100 - darkenPercent) / 100);
		blue = parseInt(blue * (100 - darkenPercent) / 100);
		// lighten
		/* red = parseInt(red * (100 + darkenPercent) / 100);
		green = parseInt(green * (100 + darkenPercent) / 100);
		blue = parseInt(blue * (100 + darkenPercent) / 100); */
		
		rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		
		$(this).css('background-color', rgb);
  });
  return this;
}


