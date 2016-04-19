if (document.readyState !== 'loading') { // Run the function eventHandler when the DOM is loaded
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}

function eventHandler() {
  var tasks_div = document.getElementById('tasks'); //Grab the element with id tasks
  var submit = document.getElementById('submit')  // Grab the elemnt with id submit
  submit.addEventListener('click', function() { //When the submit is clicked, run this function
    xmlhttp = new XMLHttpRequest(); // Create a new request object
    xmlhttp.onreadystatechange = function() {  //When the request state changes, run this function
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { // If the request is finished and is successful
        update_tasks(JSON.parse(xmlhttp.responseText).tasks); // Run update_task on the the JSON response.
      }
    }
    xmlhttp.open("GET", "/api/v1/tasks", true) // Make the request a GET to /api/v1/tasks
    xmlhttp.send(); //Send the request
  });

  function update_tasks(tasks) {
    while(tasks_div.firstChild) { //Remove all the current listed task
      tasks_div.removeChild(tasks_div.firstChild);
    }
    for(var i = 0; i < tasks.length; i ++) { // For all tasks in the JSON Response
      p = document.createElement("P"); //Create a p node
      t = document.createTextNode(tasks[i].name) // Create text with the task name
      p.appendChild(t) // Add the text to the p tag
      tasks_div.appendChild(p)  // add the p tag to the list of tasks
    }
  }

  var create = document.getElementById("create"); // Grab the create button
  create.addEventListener('click', function() { // On click run this function
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        update_tasks(JSON.parse(xmlhttp.responseText).tasks);
      }
    }
    xmlhttp.open("POST", "/api/v1/tasks", true)  // Make a post request instead of a GET
    var data = JSON.stringify({task: {name: document.getElementById('name').value}}) // Set Data to the JSON string of the input box
    xmlhttp.setRequestHeader('Content-Type', 'application/json') // Tell the server we are sending our string in JSON format.
    xmlhttp.send(data); // Send the request with data
  })
}
