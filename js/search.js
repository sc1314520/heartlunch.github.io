var per;
 //備用表單
      //apiUri: 'https://script.google.com/macros/s/AKfycbw27PiOS2HXFaHEMBvBNGqIPPJml8pzfoOu8Zc61YFIKxUUzyHKU6-qvZqSyBo1-eNN/exec'

      //使用這個表單
      var apiUri='https://script.google.com/macros/s/AKfycbzYb5m2t_xUBZAds8TdrTcm2BqCAe7xEpfSJAVeVb-2soPUr6RIZIZoTQtmpa8BQMuG9g/exec'
      
document.getElementById("btn").onclick=function(){
    per=document.getElementById("nn").value;
    console.log("點擊");
    submit();
}
// 獲取訂單
function sendData() {
    var obj;
    console.log("send");
    const config = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(this.apiUri, config)
        .then(response => response.text())
        .then(result => {
          var s = JSON.parse(result)[per];
          console.log(s);
          
          while(s==undefined){
            alert("訂單不存在，請重新查詢");
            per = document.getElementById("n").value;
            s=JSON.parse(result)[per];
          }
            set(s);
            document.getElementById("rec").style.display="block";
        })
        .catch(error => console.log('error', error));
}
function submit(){
        console.log("傳送")
        // 發送資料
       return this.sendData();
}
function set(s){
    var time = ((s.time).split("T")[1].split(":")[0])+":"+(s.time).split("T")[1].split(":")[1];
    var gt=new Date(0,0,0,(s.time).split("T")[1].split(":")[0],(s.time).split("T")[1].split(":")[1]).getTime();
    var del=27420000;
    var ed =new Date(gt+del).toTimeString().split(":")[0]+":"+new Date(gt+del).toTimeString().split(":")[1];

    var obj = [
        s.name,s.num,s.m1,s.m3,s.m2,s.m4, s.ta,s.m1*70+s.m2*70+s.m3*80+s.m4*80,ed,
    ]
   var as = document.getElementsByClassName("as");
   for(var i=0;i<as.length;i++){
    as[i].innerHTML=obj[i];
   }
}





// 刪除訂單
function sendData2() {
    var obj={
            name:document.getElementById("nn").value,
            flag:"1"
    };
    var fd=new FormData();
    fd.append("name",obj.name);
    fd.append("flag",obj.flag);

    console.log(obj);
    console.log("send2");
    const config = {
        method: 'POST',
        body: fd,
        redirect: 'follow'
    };

      fetch(this.apiUri, config)
        .then(response => response.text())
        .then(result => {
            console.log("成功刪除")
        })
        .catch(error => console.log('error', error));
}
function submit2(){
    console.log("修改")
    if(confirm("是否確認刪除？")){
        alert("成功刪除");
        // 發送資料
        document.getElementById("rec").style.display="none";
       return this.sendData2();
    } 
}

     

   