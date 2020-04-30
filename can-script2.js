var main=document.querySelector("main");
var promise=fetch("products.json");
promise.then(
    function(response){
        return response.json();
}).then(
    function(json){
        let products=json;
        initial(products);
    }
).catch(
    function(e){
        console.log("没有获取到json文件："+e.message);
    }
);

function initial(products){
    // for(let i=0;i<products.length;i++){
    //     let section=document.createElement("section");
    //     let h2=document.createElement("h2");
    //     let p=document.createElement("p");
    //     let img=document.createElement("img");
    //     section.s
        
    // }
    console.log(products.length);
}