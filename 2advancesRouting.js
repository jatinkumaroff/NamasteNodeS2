const express=require("express");
const app=express();

app.use("/abc",(req,res)=>{             //works for all abc/**/*/*/
        res.send("abc  route");
    });

app.use("/ab?c",(req,res)=>{           // ? makes b optional, works for=> "ab" and "abc" routes
    res.send("abc, ac route");
});

app.use("/ab+c",(req,res)=>{           // + means any number of b's,works for=> "abbbbc" and "abc" routes
    res.send("abc, ac route");
});

 // * means anything bw "ab" and "cd",works for=> "ab6a8sdf4cd" and "abcd" routes
app.use("/ab*cd",(req,res)=>{  
    res.send("abc, ac route");
});

 // means "bc" is optional, works for=> "ad" and "abcd" routes
//  does NOT work for "abd" or "acd"
app.use("/a(bc)?d",(req,res)=>{  
    res.send("abc, ac route");
});

// rejecs: / / => *: anything in start, $:ending , works for=> anything ending with "fly"
app.use(/.*fly$/,(req,res)=>{  
    res.send("abc, ac route");
});





app.listen(3000);