function Create2DArray(rows, columns) {
  var arr = new Array(columns);

  for (var i=0; i<rows; i++) {
     arr[i] = new Array(rows);
  }
  return arr;
}

var Board = {
	htmlTable : document.getElementById('bingoBoard'),
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
				this.htmlTable.rows[j].cells[i].innerHTML = this.table[i][j];
			}
		}
	}
}


Board.createNumbers();
Board.createLetters();
Board.displayNumbers();
console.log(Board.htmlTable);