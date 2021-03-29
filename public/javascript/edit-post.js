async function editFormHandler(event) {
    event.preventDefault();
  
    const content = document.querySelector('textarea[name="content"]').value.trim();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const departTrain = document.querySelector('select[name="departing-train"]')
    const depart_station = departTrain.options[departTrain.selectedIndex].text
    console.log(depart_station)

    const arriveTrain = document.querySelector('select[name="arrival-train"]')
    const arrive_station = arriveTrain.options[arriveTrain.selectedIndex].text
    console.log(arrive_station)
    
console.log( id,
  depart_station,
  arrive_station, 
  content)

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        depart_station,
        arrive_station, 
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('.edit-post-btn').addEventListener('click', editFormHandler);
  