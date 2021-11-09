window.addEventListener('load', function () {

    //Initialized the client color
    let clientColor = 'black';

    //Created a function that generates a random hex value for colors
    //Reference https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
    function generateRandomColor(){
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        return randomColor;
    }   

    let socket = io();

    socket.on('connect', function () {
        console.log("Connected");
        //Generates random color for user
        clientColor = generateRandomColor();
    });

    //Adds counter with innerHTML to track users 
    socket.on('counter', function(counter){
        let countElement = document.getElementById('myCounter');
        countElement.innerHTML = "Travel Lovers Online: " + counter;
    });

    let list = document.getElementById('allDestinations');

    socket.on('destination', function (data) {
        console.log("Message arrived!");
        console.log(data);

        let currDestination = data.destination;
        let destinationElement = document.createElement('p');
        destinationElement.innerHTML = currDestination;
        //Adding the client color to the destination element that holds the data entered
        destinationElement.style.color = clientColor;

        list.appendChild(destinationElement);
        list.scrollTop = list.scrollHeight;
    });

    let userDestination = document.getElementById('user-destination');
    let submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function () {
        let myDestination = userDestination.value;
        let obj = { "destination": myDestination };
 
        socket.emit('destination', obj);
    });
});