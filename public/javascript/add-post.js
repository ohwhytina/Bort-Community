async function newFormHandler(event) {
    event.preventDefault();
  
    const content = document.querySelector('textarea[name="content"]').value.trim();
  
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
  
  document.querySelector('#new-post-form')?document.querySelector('#new-post-form').addEventListener('click', newFormHandler):null;