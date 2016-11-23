import haxegon.*;

class Main{
  function update(){
    //results in 5
    trace(2 + 3);  
    
    //results in "23"
    trace(Convert.tostring(2) + Convert.tostring(3));
  }
}