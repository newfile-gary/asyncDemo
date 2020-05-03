//0先获取到包含商品的json文件

           var products=[
            {
              "name" : "baked beans",
              "price" : 0.40,
              "image" : "beans.jpg",
              "type" : "vegetables"
            },
            {
              "name" : "hot dogs",
              "price" : 1.99,
              "image" : "hotdogs.jpg",
              "type" : "meat"
            },
            {
              "name" : "spam",
              "price" : 2.85,
              "image" : "spam.jpg",
              "type" : "meat"
            },
            {
              "name" : "refried beans",
              "price" : 0.99,
              "image" : "refried.jpg",
              "type" : "vegetables"
            },
            {
              "name" : "kidney beans",
              "price" : 0.58,
              "image" : "kidney.jpg",
              "type" : "vegetables"
            },
            {
              "name" : "garden peas",
              "price" : 0.52,
              "image" : "gardenpeas.jpg",
              "type" : "vegetables"
            },
            {
              "name" : "mushy peas",
              "price" : 0.58,
              "image" : "mushypeas.jpg",
              "type" : "vegetables"
            },
            {
              "name" : "corned beef",
              "price" : 2.39,
              "image" : "cornedbeef.jpg",
              "type" : "meat"
            },
            {
              "name" : "tomato soup",
              "price" : 1.40,
              "image" : "tomatosoup.jpg",
              "type" : "soup"
            },
            {
              "name" : "chopped tomatoes",
              "price" : 0.45,
              "image" : "tomato.jpg",
              "type" : "vegetables"
            },
            {
              "name" : "chicken noodle soup",
              "price" : 1.89,
              "image" : "chickennoodle.jpg",
              "type" : "soup"
            },
            {
              "name" : "carrot and coriander soup",
              "price" : 1.49,
              "image" : "carrotcoriander.jpg",
              "type" : "soup"
            }
          ];
            initial(products);
        
            
function initial(products){
    let form=document.querySelector("form");
    let select=document.querySelector("select");
    let searchTerm=document.querySelector("#searchTerm")
    let button=document.querySelector("button");
    var main=document.querySelector("main");
    
    var oneSelectProducts=[];//第一次筛选结果，
    var twoSelectProducts=[];//第二次筛选结果
    var lastSelectValue=select.value.toLowerCase().trim();//上一次select的值
    var lastSearchValue="";//上一次searchTerm的值
    twoSelectProducts=products;//初始化第一次加载页面时显示所有商品
    selectThree();//不用通过筛选，直接显示所有的商品
    //oneSelectProducts=[];
    
    button.addEventListener("click", selectOne);

    //1先筛选符合select的商品
    function selectOne(event){
        event.preventDefault();
        oneSelectProducts=[];//将上次筛选结果清空
        twoSelectProducts=[];
        let currentSelectValue=select.value.toLowerCase().trim();//当前select值
        let currentSearchTerm=searchTerm.value.toLowerCase().trim();//当前searchTerm值
        //判断当前搜索条件是否和上一次一样，一样则直接返回，不进行下一步。
        if((lastSelectValue===currentSelectValue)
            && lastSearchValue===currentSearchTerm){
                return ;
            }
        if(currentSelectValue==="all"){//显示所有的商品
            oneSelectProducts=products;
        }else{//筛选符合当前select值的商品
            for(let i=0;i<products.length;i++){
                if(products[i].type===currentSelectValue){
                    oneSelectProducts.push(products[i]);
                }
            }
        }
        lastSelectValue=currentSelectValue;//将当前的select值存入上次的变量中
        lastSearchValue=currentSearchTerm;//同上
        selectTwo();
    }

    //2再判断同类型中符合searchTrem的商品
    function selectTwo(){
        let formatSearchTerm=searchTerm.value.toLowerCase().trim();
        if(formatSearchTerm===""){ //如果没有输入searchTerm就直接保存上次结果。
            twoSelectProducts=oneSelectProducts;
        }else{  //如果有输入searchTerm,就在上次筛选结果中继续筛选符合searchTerm的值。
            for(let i=0;i<oneSelectProducts.length;i++){
                if(!(oneSelectProducts[i].name.indexOf(formatSearchTerm)===-1)){
                    twoSelectProducts.push(oneSelectProducts[i]);
                }
            }
        }
        selectThree();
        
    }

    function selectThree(){
        if(main.hasChildNodes()){//如果main元素中有子元素，则清空。
            main.innerHTML="";
        }
        if(twoSelectProducts.length===0){//如果筛选没有结果
            let text=document.createTextNode("没有结果！");
            main.appendChild(text);
        }else{//如果有筛选的结果，将每个结果进行处理，即加载一个商品就显示一个商品
            for(let i=0;i<twoSelectProducts.length;i++){
                fetchBlob(twoSelectProducts[i]);
            }
        }
    }

    //获取商品图片地址
    function fetchBlob(product){
    
                let url="images/"+product.image;
                showImg(url,product);
        
    }
    //将结果进行显示
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
