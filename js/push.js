console.log("執行 push");

// 第一驗證
    var ss = prompt("請輸入學號，外校請填90000100A");
    var reg = /^[4|6|8|9][0-1][0-9][0-9][0-9][1-2][0-4][0-9][A-Z|a-z]$/
    var fg = RegExp(reg).test(ss);
    
    while(!fg){
        alert("學號輸入錯誤！");
        ss = prompt("請輸入學號，外校請填90000100A");
        fg = RegExp(reg).test(ss);
    }
    var pass = (parseInt(ss.slice(0,8))%10000)*parseInt(Math.random()*100);

    alert("您的驗證碼： " +pass);


// 建立 Vue 進行資料建立與傳送
const Demo = new Vue({
    el: '#app',
    data: {
      name: '',
      num: '',
      m1: '',
      m2: '',
      m3: '',
      m4: '',
      time: '',
      ta:'',
        
      sending: false,
     
      //備用表單
      //apiUri: 'https://script.google.com/macros/s/AKfycbw27PiOS2HXFaHEMBvBNGqIPPJml8pzfoOu8Zc61YFIKxUUzyHKU6-qvZqSyBo1-eNN/exec'

      //使用這個表單
      apiUri:'https://script.google.com/macros/s/AKfycbzYb5m2t_xUBZAds8TdrTcm2BqCAe7xEpfSJAVeVb-2soPUr6RIZIZoTQtmpa8BQMuG9g/exec'
    },
    methods: {
      sendData() {
        this.sending = true;
        console.log("send");

        // 資料創建
        let formdata = new FormData();
        formdata.append('name', this.name);
        formdata.append('num', this.num);
        formdata.append('m1', this.m1);
        formdata.append('m2', this.m2);
        formdata.append('m3', this.m3);
        formdata.append('m4', this.m4);
        formdata.append('time', this.time);
        formdata.append('ta', this.ta);

        console.log(formdata.get("ta"));
        const config = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        fetch(this.apiUri, config)
          .then(response => response.text())
          .then(result => {
            if(result === 'success') {
              this.sending = false;
              this.name = this.num = this.m1 = this.m2= this.m3=this.m4=this.time=this.ta = '';
            }
            console.log(result);
          })
          .catch(error => console.log('error', error));
  
      },

      submit() {
        
        console.log("submit");
        console.log(document.getElementById("sel").value);

        // 整理物件
        var is =document.getElementsByClassName("is");
            let objArr=[
                document.getElementById("name").value,
                document.getElementById("num").value,
                is[0].value,
                is[2].value,
                is[1].value,
                is[3].value,
                document.getElementById("ta").value,
                total.innerText,
                document.getElementById("sel").value.split("T")[1],
                document.getElementById("sel").value.split("T")[0],
                document.getElementById("ta").value
            ]

        // confirm 用途
        const flag=confirm("是否確認送出？ 葷食："+objArr[2]+" 葷食(加蛋)："+objArr[3]+" 素食："+objArr[4]+" 素食（加蛋）："+objArr[5]+" 取餐時間："+objArr[7]);
        
        
        if(flag){

            // 呼叫判斷
            var x =Rec(flag);
            if(x){
                console.log("已送出");

                // 發送資料
                this.sendData();
            }
            
            
        } 
      }
    },
})
    // 判斷填寫資料格式
    function Rec(flag){
        var is =document.getElementsByClassName("is");
        var total=document.getElementById("total");
        var btn=document.getElementById("btn");
        var rec=document.getElementById("rec");
        var as=document.getElementsByClassName("as");
        var main=document.getElementById("main");
        var title=document.getElementById("title");
        let objArr=[
            document.getElementById("name").value,
            document.getElementById("num").value,
            is[0].value,
            is[2].value,
            is[1].value,
            is[3].value,
            document.getElementById("ta").value,
            total.innerText,
            document.getElementById("sel").value,
            
        ]
        console.log(objArr);

        // 判斷資料是否亂填
        var sum = objArr[2]+objArr[3]+objArr[4]+objArr[5];
        if(document.getElementById("name").value.trim()=="" || document.getElementById("name").value.trim()==undefined){
            alert("名字不可為空");
            return false;
        }
        else if(!new RegExp(/[\u4E00-\u9FFF]+/g).test(document.getElementById("name").value)){
            alert("請輸入中文實名");
            return false;
        }
        else if(!new RegExp("^\\d+$").test(is[0].value)||!new RegExp("^\\d+$").test(is[1].value)||!new RegExp("^\\d+$").test(is[2].value)||!new RegExp("^\\d+$").test(is[3].value)){
            alert("餐點數目請輸入整數，無則請填 0");
            return false;
        }
        else if (is[0].value>5||is[1].value>5||is[2].value>5||is[3].value>5){
            alert("各餐點一次最多五份");
            return false;
        }
        else if (is[0].value<0||is[1].value<0||is[2].value<0||is[3].value<0){
            alert("餐點數目不可為負值");
            return false;
        }
        else if(sum==0){
            alert("餐點至少訂購一份");
            return false;
        }
        else if (objArr[0].length>10 || objArr[0].length<2){
            alert("訂購姓名長度須介於2~10")
            return false;
        }
        else if(!new RegExp(/^09[0-9]{8}$/).test(objArr[1])||objArr[1].length!=10){
            alert("電話號碼輸入錯誤");
            return false;
        }
        else if(document.getElementById("sel").value.split(":")[0]<11||document.getElementById("sel").value.split(":")[0]>=13){
            
            alert("取餐時間須介於11:00~13:00");
            return false;
        }
        else if(document.getElementById("pass").value!=pass){
            alert("驗證碼輸入錯誤！！");
            return false;
        }
        // 汲取資料建立明細
        else if(flag){
            btn.disabled=true;
            btn.innerText="不可再次提交";
            
            for(var i=0;i<as.length;i++){
                as[i].innerHTML=objArr[i];
            }
            rec.style.display="block";
            main.style.display="none";
            title.innerText="媽媽便當";

            return true;
         }

    }