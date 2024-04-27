
var latitude = 0;
var longitude = 0;








document.addEventListener("DOMContentLoaded", function() {
    var citySelect = document.getElementById("citySelected");

    citySelect.addEventListener("change", function() {
        var selectedOption = citySelect.options[citySelect.selectedIndex];
        
        if (selectedOption.value !== "") {
            var coordinates = selectedOption.value.match(/\d+\.\d+/g);
            latitude = coordinates[0];
            longitude = coordinates[1];

            

            // Construct the API URL inside the event listener
            var apiUrl = `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=xml`;

            // Make the API call
            fetch(apiUrl)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.text(); // Parse response as text
              })
              .then(data => {
                // Parse the XML response
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data, "text/xml");
                var  ar=["3h","24h","48h","54h","66h"];
                var divr=["1st","2nd","3rd","4th","5th"];
                 for(var  i=0; i<ar.length ; i++)
                 {
                // Change this to the desired timepoint
                const date = new Date();

                let day = date.getDate()+i;
               let month = date.getMonth() + 1;
                let year = date.getFullYear();

              // This arrangement can be altered based on how we want the date's format to appear.
              let currentDate = `${day}-${month}-${year}`;
              
                var desiredTimepoint = ar[i];
                // Find the <data> element with the desired timepoint
                var dataElement = xmlDoc.querySelector(`data[timepoint="${desiredTimepoint}"]`);
                
                // Display the data for the desired timepoint
         
                if (dataElement) {
                    var divElement = document.getElementById(divr[i]); // Assuming the <div> has an ID of "responseContainer"
                    divElement.innerHTML = ''; // Clear the content of the <div> before displaying new data
                    
                    var cloudcover = dataElement.querySelector('cloudcover').textContent;
                    var seeing = dataElement.querySelector('seeing').textContent;
                    var transparency = dataElement.querySelector('transparency').textContent;
                    var lifted_index = dataElement.querySelector('lifted_index').textContent;
                    var rh2m = dataElement.querySelector('rh2m').textContent;
                    var wind10m_direction = dataElement.querySelector('wind10m_direction').textContent;
                    var wind10m_speed = dataElement.querySelector('wind10m_speed').textContent;
                    var temp2m = dataElement.querySelector('temp2m').textContent;
                    var  prec_type=dataElement.querySelector('prec_type').textContent;
                  
                    // Create HTML elements to display the data
                    var dataDiv = document.createElement('div');
                       if(cloudcover<3) 
                       {

                         dataDiv.innerHTML = `
                      
                       
                        <p ><b>${currentDate}</p></b>
                        <img src="./images/clear.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}</</b>p>
                    `;
                       }

                      else  if(cloudcover>=3 && cloudcover<6) 
                       {
                    dataDiv.innerHTML = `
                   
                    <p><b>${currentDate}</p></b>
                    <img src="./images/pcloudy.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }
                       
                      else  if(cloudcover>=6 && cloudcover<8) 
                       {
                    dataDiv.innerHTML = `
                   
                    <p><b>${currentDate}</p></b>
                    <img src="./images/mcloudy.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }
                      else if(cloudcover>=8) 
                       {
                    dataDiv.innerHTML = `
                 
                    <p><b>${currentDate}</p></b>
                    <img src="./images/cloudy.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }

                      else if(rh2m>90 && cloudcover<6) 
                       {
                    dataDiv.innerHTML = `
              
                    <p><b>${currentDate}</p></b>
                    <img src="./images/fog.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }

                      else if( prec_type='rain'&& cloudcover>=8) 
                       {
                    dataDiv.innerHTML = `
                  
                    <p><b>${currentDate}</p></b>
                    <img src="./images/rain.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }

                        else if( prec_type='rain' && cloudcover>=6 && cloudcover<8) 
                       {
                    dataDiv.innerHTML = `
                
                    <p><b>${currentDate}</p></b>
                    <img src="./images/oshower.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }

                      else  if( prec_type='rain' && cloudcover<6 ) 
                       {
                    dataDiv.innerHTML = `
                 
                    <p><b>${currentDate}</p></b>
                    <img src="./images/ishower.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }
                     else  if( prec_type='rain' ) 
                       {
                    dataDiv.innerHTML = `
                   
                    <p><b>${currentDate}</p></b>
                    <img src="./images/rain.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }

                      else if( prec_type='snow' ) 
                       {
                    dataDiv.innerHTML = `
               
                    <p><b>${currentDate}</p></b>
                    <img src="./images/snow.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }

                     else  if( prec_type='frzr ' ) 
                       {
                    dataDiv.innerHTML = `
               
                    <p><b>${currentDate}</p></b>
                    <img src="./images/rainsnow.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }
                     

                     
                      else if( prec_type='rain'&& lifted_index <-5  ) 
                       {
                    dataDiv.innerHTML = `
                   
                    <p><b>${currentDate}</p></b>
                    <img src="./images/tsrain.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }
                      else if(  lifted_index <-5 ) 
                       {
                    dataDiv.innerHTML = `
                   
                    <p><b>${currentDate}</p></b>
                    <img src="./images/tstrom.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }
                       

                       

                       else if( wind10m_speed>=10.8 ) 
                       {
                    dataDiv.innerHTML = `
                 
                    <p><b>${currentDate}</p></b>
                    <img src="./images/windy.png" alt="clear"/></img>
                         <p>Transparency: <b>${transparency}</b></p>
                        <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                        <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                        <p>Temperature:<b> ${temp2m}ºC</b></p>
                    `;
                       }

                       else{
                        dataDiv.innerHTML = `
                       
                             <p>Transparency: <b>${transparency}</b></p>
                            <p>Wind Direction at 10m: <b>${wind10m_direction}</b></p>
                            <p>Wind Speed at 10m: <b>${wind10m_speed}</b></p>
                            <p>Temperature:<b> ${temp2m}ºC</b></p>
                        `;

                       }


                    
                    // Append the dataDiv to the output <div>
                    divElement.appendChild(dataDiv);
                    divElement.style. border=' 1px solid lightblue';
                   
                   

                } 
            
               }

              })
            
        }
    });
});




