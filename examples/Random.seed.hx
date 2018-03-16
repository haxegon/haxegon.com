import haxegon.*;

class Main {	
	function new(){
		Random.seed = 10;
		
		Debug.log(Random.int(0, 10));
		Debug.log(Random.string(5));
		Debug.log(Random.bool());
		
		Debug.log("Seed is " + Random.seed + ", so this sequence is always 8, bLDAc, true");
	}
}