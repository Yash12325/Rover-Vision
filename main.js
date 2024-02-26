document.addEventListener('DOMContentLoaded', function() {

    const key = 'XJNcrruyvnRhkCImT1dqGMwIi2oR6ZnZsRDlz5ur';

    let getImage = function (){

        var Rover = document.querySelector('input[name="Rover_Radio"]:checked');
        console.log(Rover);
        if(Rover !== null){
            
            Rover = Rover.id;
            var Sol = document.querySelector('#Sol_Input').value;
            console.log(Sol);
            if(Sol !== null)
            {
                var Camera = document.querySelector('#Camera_Select').value;
                console.log(Camera);
                if(Camera !== 'Select'){

                    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${Rover}/photos?sol=${Sol}&camera=${Camera}&api_key=${key}`)
                    .then(Response => Response.json())
                    .then(data => {
                        console.log(data);
                        
                        var Result_Details = document.querySelector('#Result_Details');
                            
                        if(data.photos.length != 0)
                        {
                            var url = data.photos[0].img_src;
                            console.log(url);
                            
                            var Launched = data.photos[0].rover.landing_date;
                            console.log(Launched);

                            var Landed = data.photos[0].rover.launch_date;
                            console.log(Landed);
                            
                            var Earth_Date = data.photos[0].earth_date;
                            console.log(Earth_Date);
                        
                            var Heading = document.createElement("h2");
                            Heading.setAttribute('id','Result_Details_H2');
                            Heading.innerHTML = `Here is your Image from ${Camera} Camera of ${Rover} Rover on ${Sol}th Sol Day`;
                            Result_Details.appendChild(Heading);
                            
                            var Image = document.createElement("img");
                            Image.src = url;
                            Image.setAttribute('id','Result_Image');
                            Result_Details.appendChild(Image);
                            //document.querySelector('#Result_Details').appendChild(document.createElement("img"));

                            for(var i=0; i<2; i++){
                                var br = document.createElement("br");
                                Result_Details.appendChild(br);
                            }

                            var Result_Details_Add = document.createElement("span");
                            Result_Details_Add.setAttribute('class','Result_Details_Span');
                            Result_Details_Add.innerHTML = `The ${Rover} Rover was Launched on ${Launched} and Landed on Mars on ${Landed} and this image was taken on ${Earth_Date} Earth Date`;
                            Result_Details.appendChild(Result_Details_Add);
                            

                            document.querySelector('#Input').style.display = 'none';
                            document.querySelector('#Result').style.display = 'block';

                        }
                        else
                        {
                            alert('Enter some other Sol Day');
                        }
                    
                    })
                    .catch(error => {
                        console.log('Error :', error)
                        alert(`There seem's to be some problem. Please try again after sometime `);
                    })

                }
                else
                {
                    alert('Please Select a Camera Onboard');
                }
        
            }
            else
            {
                alert('Please Enter a Sol Day');
            }

        }
        else
        {
            alert('Please Select a Rover');
        }
        
    }

    let getanother = function (){

        document.querySelector('#Input').style.display = 'block';
        document.querySelector('#Result').style.display = 'none';
        document.querySelector('img').remove();
        document.querySelector('input[name="Rover_Radio"]').checked = null;
        document.querySelector('#Camera_Select').value = 'Select'


    }

    document.querySelector('#Search').addEventListener('click', function() {

        getImage();

    })

    document.querySelector('#Result_Another_Button').addEventListener('click', function() {

        getanother();
    })

})        