document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('create-post-form');
    const postList = document.getElementById('posts');

    // Event listener for form submission
    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            // Add the new post to the list
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h2>${data.title}</h2><p>${data.content}</p>`;
            postList.appendChild(listItem);

            // Clear the form
            postForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    // Fetch and display existing posts
    fetch('/api/posts')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
            postList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
});
