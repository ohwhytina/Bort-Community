

async function filterFormHandler(event) {
    event.preventDefault();

    const departTrain = document.querySelector('select[name="departing-train"]')
    const depart_station = departTrain.options[departTrain.selectedIndex].text

    const articles = document.querySelectorAll('div[value=post-depart-station]');
    console.log("articles is", articles)
    
    
    articles.forEach(article => {

        thisSection = article.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement

        thisSection.classList.remove("uk-hidden")
        
        console.log("article.textContent is ", article.textContent);
        console.log("this is article.parentElement", article.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
        
        
        
        if (depart_station === article.textContent) {

        } else {
            thisSection.classList.add("uk-hidden")
        }
       });
}

document.querySelector('.filter').addEventListener('click', filterFormHandler);