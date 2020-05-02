var promise=fetch("products.json");
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
    let form=document.querySelector("form");
    let select=document.querySelector("select");
    let button=document.querySelector("button");
    var main=document.querySelector("main");
    //var products={};
    var selectProducts=[];
    button.addEventListener("click", showSelectImg);
    
    for(let i=0;i<products.length;i++){
        showImg(products[i]);
    }


    function showImg(product){
        let section=document.createElement("section");
        let h2=document.createElement("h2");
        let p=document.createElement("p");
        let img=document.createElement("img");
        section.setAttribute("class",product.type);
        h2.textContent=product.name;
        p.textContent="$"+product.price;
        img.src="images/"+product.image;
        img.setAttribute("alt",product.name);
        section.appendChild(h2);
        section.appendChild(p);
        section.appendChild(img);
        main.appendChild(section);
        
    }

    
   
    
    function showSelectImg(){
        event.preventDefault();
        main.innerHTML="";
        let key=select.value;
        key=key.toLowerCase();
        console.log(key);
        for(let i=0;i<products.length;i++){
            if(key===products[i].type){
                showImg(products[i]);
            }else{
                showImg(products[i]);
            }
        }
    }
}
