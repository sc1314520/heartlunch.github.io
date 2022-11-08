var apiUri='https://script.google.com/macros/s/AKfycbxH9u7moSd2e2fOVnoUb0BjkygMFFXf5YY75WSk023FOmagslMPXFs7aEBS3lmEUE8/exec'
   
    submit();
    
    function sendData() {
        
        const config = {
            method: 'GET',
            redirect: 'follow'
        };

      fetch(apiUri, config)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            document.getElementById("countt").innerText=JSON.parse(result)["count"];
        })
        .catch(error => console.log('error', error));
        }
        function submit(){
            return sendData();
        }