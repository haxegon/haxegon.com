import haxegon.*;

class Main {	
	function new(){
		var temparray:Array< Any> = ["cat", "dog", 47, -0.52, false];
		
		Debug.log("Randomly choosing " + Random.pick(temparray) + " from " + temparray);
	}
}