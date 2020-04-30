var main=document.querySelector("main");
var promise=fetch("products.json");
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
function fetchBlob(products){
    let promise=fetch("images/"+products.image);
    promise.then(function(response){
        return response.blob();
    }).then(
        function(blob){
            showImg(blob,products);
        }
    )
}
function showImg(url,products){
    let section=document.createElement("section");
        let h2=document.createElement("h2");
        let p=document.createElement("p");
        let img=document.createElement("img");
        section.setAttribute("class",products.type);
        h2.textContent=products.name;
        p.textContent="$"+products.price;
        img.src=url;
        img.setAttribute("alt",products.name);
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
