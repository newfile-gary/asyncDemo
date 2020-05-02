//0先获取到包含商品的json文件
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
    let searchTerm=document.querySelector("#searchTerm")
    let button=document.querySelector("button");
    var main=document.querySelector("main");
    //var products={};
    var oneSelectProducts=[];
    var twoSelectProducts=[];
    twoSelectProducts=products;
    selectThree();
    twoSelectProducts=[];
    button.addEventListener("click", selectOne);

    //1先判断是什么类型的商品
    function selectOne(event){
        event.preventDefault();
        if(select.value.toLowerCase()==="all"){
            oneSelectProducts=products;
        }else{
            for(let i=0;i<products.length;i++){
                if(products[i].type===select.value.toLowerCase()){
                    oneSelectProducts.push(products[i]);
                }
            }
        }
        selectTwo();
    }

    //2再判断同类型中符合搜索关键字的商品
    function selectTwo(){
        let formatSearchTerm=searchTerm.value.toLowerCase().trim();
       
        if(formatSearchTerm===""){
            twoSelectProducts=oneSelectProducts;
        }else{
            for(let i=0;i<oneSelectProducts.length;i++){
                if(!(oneSelectProducts[i].name.indexOf(formatSearchTerm)===-1)){
                    twoSelectProducts.push(oneSelectProducts[i]);
                }
            }
        }
        selectThree();
        
    }

    function selectThree(){
        main.innerHTML="";
        if(twoSelectProducts.length===0){
            let text=document.createTextNode("没有结果！");
            main.appendChild(text);
        }else{
            for(let i=0;i<twoSelectProducts.length;i++){
                fetchBlob(twoSelectProducts[i]);
            }
        }
    }

    //获取商品图片地址
    function fetchBlob(product){
        let promise = fetch(product.image);
        promise.then(response=>response.blob()).then(
            blob=>{
                let url=URL.createObjectURL(blob);
                showImg(url,product);
            }
        ).catch(e=>console.log("图片获取失败："+e.message));
    }

    function showImg(url,product){
        let section=document.createElement("section");
        let h2=document.createElement("h2");
        let p=document.createElement("p");
        let img=document.createElement("img");
        section.setAttribute("class",product.type);
        h2.textContent=product.name;
        p.textContent="$"+product.price;
        img.src="images/"+url;
        img.setAttribute("alt",product.name);
        section.appendChild(h2);
        section.appendChild(p);
        section.appendChild(img);
        main.appendChild(section);
        
    }

    
   
    
    // function showSelectImg(){
    //     event.preventDefault();
    //     main.innerHTML="";
    //     let key=select.value;
    //     key=key.toLowerCase();
    //     console.log(key);
    //     if(key==="all"){
    //         for(let i=0;i<products.length;i++)
    //         {   showImg(products[i]);}
    //     }else{
    //         for(let i=0;i<products.length;i++){
    //             if(key===products[i].type){
    //                 showImg(products[i]);
    //             }
    //         }
    //     }
    // }
}
