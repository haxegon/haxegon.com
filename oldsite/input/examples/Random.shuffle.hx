import haxegon.*;

class Main {	
	function new(){
		var temparray:Array< String> = ["cat", "dog", "pig", "rabbit", "frog"];
		
		Debug.log("Original order is: " + temparray);
		
		Random.shuffle(temparray);
		
		Debug.log("After shuffling: " + temparray);
	}
}