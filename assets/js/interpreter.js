

function outf(text) { 
        var mypre = document.getElementById("output"); 
            mypre.innerHTML = mypre.innerHTML + text; 
} 
function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                        throw "File not found: '" + x + "'";
                            return Sk.builtinFiles["files"][x];
}

function runit() { 
   var prog = document.getElementById("yourcode").value; 
   var mypre = document.getElementById("output"); 
   mypre.innerHTML = ''; 
   Sk.canvas = "mycanvas";
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead}); 
   eval(Sk.importMainWithBody("<stdin>",false,prog)); 
} 
