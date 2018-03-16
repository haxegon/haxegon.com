import haxegon.*;

class Main{
  function update(){
    var a:String = "1.25";
    trace(a + 1); //a is a string
    
    var f:Float = Convert.tofloat(a);
    trace(f + 1); //add the floats
  }
}