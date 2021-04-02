async function filterFormHandler(event) {
    event.preventDefault();

    const oldContent = document.querySelector('select[name="departing-train"]')
    const content = oldContent.options[oldContent.selectedIndex].text
    console.log(content)
  
    const departTrain = document.querySelector('select[name="departing-train"]')
    const depart_station = departTrain.options[departTrain.selectedIndex].text
    console.log(depart_station)
  
    const arriveTrain = document.querySelector('select[name="departing-train"]')
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
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('.filter').addEventListener('click', filterFormHandler);
  