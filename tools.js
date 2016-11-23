var fs = require('fs');

module.exports = function() {
  this.getAllFilesFromFolder = function(dir, ext) {
    var results = [];

    fs.readdirSync(dir).forEach(function(file) {
        var dirfile = dir+'/'+file;
        var stat = fs.statSync(dirfile);
        if (stat && stat.isDirectory()) {
            //results = results.concat(getAllFilesFromFolder(file))
        } else{
          if(ext == ""){
            results.push(file.substr(0, file.length - 4));
           }else{
             if(file.substr(file.length-ext.length,file.length) == ext){
               results.push(file.substr(0, file.length - 4));
             }
           }
        }
    });
    return results;
 };
}
