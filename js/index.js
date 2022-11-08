window.onload=function(){
    
    // 汲取資料
    var is =document.getElementsByClassName("is");
    var total=document.getElementById("total");
    var btn=document.getElementById("btn");
    var rec=document.getElementById("rec");
    var as=document.getElementsByClassName("as");
    var main=document.getElementById("main");
    var title=document.getElementById("title");
    var currentTime;
    
    // 計算金額
    for(var i=0;i<is.length;i++){
        is[i].onclick=function(){
            calSum();
        }
    }

    // 判斷是否為訂餐期間
    setInterval(function(){
        currentTime= new Date().toString().split(" ")[4];
        calSum();
        ct.innerText=currentTime;
        if(currentTime.split(":")[0]>=10 && currentTime.split(":")[0]<13){
            btn.disabled=true;
            btn.innerText="非訂餐期間";
        }
        else{
            btn.disabled=false;
            btn.innerText="送出";
        }
    }, 1000);
    
    // 簡易判斷 --> 多餘
    btn.onclick=function(){
        console.log(document.getElementById("sel").value<11);
        if(document.getElementById("name").value==""){
            alert("名字不可為空");
        }
        if(document.getElementById("sel").value.toString().split(":")[0]<11||document.getElementById("sel").value.toString().split(":")[0]>=13){
            
            alert("取餐時間須介於11:00~13:00");
        }
    };

    // 計算金額
    function calSum(){
                var sum=0;
                for(var j=0;j<is.length;j++){
                    if(j<=1){
                        sum+=(is[j].value)*70;
                    }
                    else{
                        sum+=(is[j].value)*80;
                    }
                    total.innerText=sum;
                }
            }


    // 設置 Date 上限
    var sel =document.getElementById("sel");
        var now = new Date().toISOString().split(":")[0]+":"+new Date().toISOString().split(":")[1];
        
        var end =new Date().toISOString().split("-")[0]+"-"+new Date().toISOString().split("-")[1]+"-"+new Date().toISOString().split("-")[2].split("")[0]+(parseInt(new Date().toISOString().split("-")[2].split("")[1])+3)+"T"+new Date().toISOString().split("T")[1].split(".")[0].split(":")[0]+":"+new Date().toISOString().split("T")[1].split(".")[0].split(":")[1];
       
        };
        
