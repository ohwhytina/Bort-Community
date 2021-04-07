

async function filterFormHandler(event) {
    event.preventDefault();

    // obtain value from dropdown menu selection

    const departTrain = document.querySelector('select[name="departing-train"]')
    const depart_station = departTrain.options[departTrain.selectedIndex].text

    // obtain node for depart_station value from all posts 
    const articles = document.querySelectorAll('div[value=post-depart-station]');
    console.log("articles is", articles)
    
    // obtain depart_station value from each post
    articles.forEach(article => {

        // delcares section of post from the first line of code for section
        thisSection = article.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement

        // removes all posts
        thisSection.classList.remove("uk-hidden")
        
        console.log("article.textContent is ", article.textContent);
        console.log("this is article.parentElement", article.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
        
        
        // if dropdown menu value is not the same as a post's depart_station value hide the post
        if (depart_station !== article.textContent) {

            thisSection.classList.add("uk-hidden")
        }
       });
}

document.querySelector('.filter').addEventListener('click', filterFormHandler);