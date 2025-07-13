let posts = JSON.parse(localStorage.getItem('posts')) || [];
const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
const userDislikes = JSON.parse(localStorage.getItem('userDislikes')) || {};

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
    localStorage.setItem('userDislikes', JSON.stringify(userDislikes));
}

function toggleComposeModal() {
    const modal = document.getElementById('composeModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function createPost() {
    const text = document.getElementById('newPostText').value;
    const image = document.getElementById('newPostImage').files[0];

    if (text || image) {
        const postId = posts.length;
        const post = {
            id: postId,
            text: text,
            image: image ? URL.createObjectURL(image) : null,
            likes: 0,
            dislikes: 0,
            comments: []
        };
        posts.push(post);
        savePosts(); // Save posts to localStorage
        renderPosts();
        document.getElementById('newPostText').value = '';
        document.getElementById('newPostImage').value = '';
        toggleComposeModal();
    } else {
        alert("Please enter some text or upload an image.");
    }
}

function renderPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        // Delete Icon
        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '&#10060;';
        deleteIcon.classList.add('delete-icon');
        deleteIcon.onclick = () => deletePost(index);
        postElement.appendChild(deleteIcon);

        if (post.image) {
            const imgElement = document.createElement('img');
            imgElement.classList.add('post-image');
            imgElement.src = post.image;
            postElement.appendChild(imgElement);
        }

        const textElement = document.createElement('p');
        textElement.innerText = post.text;
        postElement.appendChild(textElement);
        
        const ratingsContainer = document.createElement('div');
        ratingsContainer.classList.add('post-ratings-container');

        // Like Button
        const likeButton = document.createElement('button');
        likeButton.classList.add('post-rating-button');
        likeButton.innerHTML = '<i class="fa fa-thumbs-up"></i>';
        likeButton.onclick = () => {
            if (!userDislikes[index]) { // Can only like if not disliked
                if (!userLikes[index]) { 
                    post.likes++;
                    userLikes[index] = true; 
                } else { // Undo like
                    post.likes--;
                    userLikes[index] = false;
                }
                savePosts();
                renderPosts(); 
            }
        };

        const likeCount = document.createElement('span');
        likeCount.classList.add('post-rating-count');
        likeCount.innerText = post.likes;

        // Dislike Button
        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('post-rating-button');
        dislikeButton.innerHTML = '<i class="fa fa-thumbs-down"></i>';
        dislikeButton.onclick = () => {
            if (!userLikes[index]) { // Can only dislike if not liked
                if (!userDislikes[index]) { 
                    post.dislikes++;
                    userDislikes[index] = true; 
                } else { // Undo dislike
                    post.dislikes--;
                    userDislikes[index] = false;
                }
                savePosts();
                renderPosts();
            }
        };

        const dislikeCount = document.createElement('span');
        dislikeCount.classList.add('post-rating-count');
        dislikeCount.innerText = post.dislikes;

        // Comment Section (Always Visible)
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');

        const commentInput = document.createElement('textarea');
        commentInput.placeholder = "Write a comment...";
        commentInput.rows = 2; 

        const submitCommentButton = document.createElement('button');
        submitCommentButton.innerText = "Comment";
        submitCommentButton.classList.add('comment-button'); 
        submitCommentButton.onclick = () => {
            if (commentInput.value) {
                post.comments.push(commentInput.value);
                savePosts(); // Save after adding comment
                commentInput.value = '';
                renderPosts(); 
            }
        };

        commentSection.appendChild(commentInput);
        commentSection.appendChild(submitCommentButton);

      
        post.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerText = comment;
            commentSection.appendChild(commentElement);
        });

        ratingsContainer.appendChild(likeButton);
        ratingsContainer.appendChild(likeCount);
        ratingsContainer.appendChild(dislikeButton);
        ratingsContainer.appendChild(dislikeCount);
        
        postElement.appendChild(ratingsContainer);
        postElement.appendChild(commentSection);
        postsContainer.appendChild(postElement);
    });
}

function deletePost(index) {
    posts.splice(index, 1);
    savePosts();  
    renderPosts();
}

renderPosts();  

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('open');
  }