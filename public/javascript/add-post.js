async function newFormHandler(event) {
    event.preventDefault();
  
    const content = document.querySelector('textarea[name="content"]').value.trim();
    console.log(content)

    const departTrain = document.querySelector('select[name="departing-train"]')
    const depart_station = departTrain.options[departTrain.selectedIndex].text
    console.log(depart_station)

    const arriveTrain = document.querySelector('select[name="arrival-train"]')
    const arrive_station = arriveTrain.options[arriveTrain.selectedIndex].text
    console.log(arrive_station)

  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
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
  };
  
  document.querySelector('.post-button')?document.querySelector('.post-button').addEventListener('click', newFormHandler):null;