async function filterFormHandler(event) {
    event.preventDefault();

    const departTrain = document.querySelector('select[name="departing-train"]')
    const depart_station = departTrain.options[departTrain.selectedIndex].text
    console.log(depart_station)

    const response = await fetch(`/filter`, {
      method: 'POST',
      body: JSON.stringify({
        depart_station
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('.filter').addEventListener('click', filterFormHandler);
  