var main=document.querySelector("main");
var promise=fetch("products2.json");
var products={};
promise.then(
    function(response){
        return response.json();
}).then(
    function(json){
        products=json;
        initial(products);
    }
).catch(
    function(e){
        console.log("没有获取到json文件："+e.message);
    }
);

function initial(products){
    for(let i=0;i<products.length;i++){
        fetchBlob(products[i]);
       
    }

}
function fetchBlob(product){
    let promise=fetch("images/"+product.image);
    promise.then(function(response){
        return response.blob();
    }).then(
        function(blob){
            let url=URL.createObjectURL(blob);
            showImg(url,product);
        }
    )
}
function showImg(url,product){
    let section=document.createElement("section");
    let h2=document.createElement("h2");
    let p=document.createElement("p");
    let img=document.createElement("img");
    section.setAttribute("class",product.type);
    h2.textContent=product.name;
    p.textContent="$"+product.price;
    img.src=url;
    img.setAttribute("alt",product.name);
    section.appendChild(h2);
    section.appendChild(p);
    section.appendChild(img);
    main.appendChild(section);
}

let form=document.querySelector("form");
let select=document.querySelector("select");
let button=document.querySelector("button");

button.addEventListener("click", showSelectImg);

function showSelectImg(){
    event.preventDefault();
    main.innerHTML="";
    let key=select.value;
    for(let i=0;i<products.length;i++){
        if(key===products[i].type){
            let section=document.createElement("section");
        let h2=document.createElement("h2");
        let p=document.createElement("p");
        let img=document.createElement("img");
        section.setAttribute("class",products[i].type);
        h2.textContent=products[i].name;
        p.textContent="$"+products[i].price;
        img.src="images/"+products[i].image;
        img.setAttribute("alt",products[i].name);
        section.appendChild(h2);
        section.appendChild(p);
        section.appendChild(img);
        main.appendChild(section);
        }
    }
}
var but=document.querySelector(".button");
but.onclick=function(){
    console.log("成功");
}
