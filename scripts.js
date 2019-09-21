Board {
	var table : new array(5,5), //[column][row]
	createNumbers : function() {
		for (var i = 0; this.table.length; i++) { // i = column
			for (var j = 0; this.table[i].length; i++) { // j = row
				var rowMin = i * 15;
				var rowMax = (i + 1) * 15;
				var squareValue = Math.ciel((Math.random()+rowMin)*rowMax);
				table[i][j] = squareValue;
			}
		}
	}
	displayNumbers : function() {
		
	}
}
