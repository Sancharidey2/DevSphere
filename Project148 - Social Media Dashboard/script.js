// Mock database
const users = [
  { username: "john_doe", password: "password123", name: "John Doe" },
  { username: "jane_smith", password: "password456", name: "Jane Smith" },
];

let currentUser = null;
let posts = [
  {
    id: 1,
    username: "john_doe",
    title: "First Post",
    content: "Hello everyone! This is my first post.",
    likes: 0,
    comments: [],
    timestamp: new Date().toISOString(),
  },
];

// Authentication functions
function showLoginForm() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("profile").style.display = "none";
  document.getElementById("createPost").style.display = "none";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    currentUser = user;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("profile").style.display = "block";
    document.getElementById("createPost").style.display = "block";

    displayProfile();
    displayPosts();
  } else {
    alert("Invalid username or password!");
  }
}

function logout() {
  currentUser = null;
  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("profile").style.display = "none";
  document.getElementById("createPost").style.display = "none";
  document.getElementById("posts").innerHTML = "";
  showLoginForm();
}

// Post management functions
function createPost() {
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;

  if (!title || !content) {
    alert("Please fill in both title and content!");
    return;
  }

  const newPost = {
    id: posts.length + 1,
    username: currentUser.username,
    title: title,
    content: content,
    likes: 0,
    comments: [],
    timestamp: new Date().toISOString(),
  };

  posts.unshift(newPost);
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  displayPosts();
}

function likePost(postId) {
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.likes++;
    displayPosts();
  }
}

function addComment(postId) {
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const commentInput = document.getElementById(`comment-${postId}`);
  const commentText = commentInput.value;

  if (!commentText) {
    alert("Please enter a comment!");
    return;
  }

  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.comments.push({
      username: currentUser.username,
      text: commentText,
      timestamp: new Date().toISOString(),
    });
    commentInput.value = "";
    displayPosts();
  }
}

// Display functions
function displayProfile() {
  if (!currentUser) return;

  const profileElement = document.getElementById("profile");
  profileElement.innerHTML = `
        <h2>${currentUser.name}</h2>
        <p>@${currentUser.username}</p>
    `;
}

function displayPosts() {
  const postsElement = document.getElementById("posts");
  postsElement.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const postDate = new Date(post.timestamp).toLocaleString();

    postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p class="post-meta">Posted by @${post.username} on ${postDate}</p>
            <p>${post.content}</p>
            <div class="post-actions">
                <button onclick="likePost(${post.id})">
                    👍 ${post.likes} Likes
                </button>
            </div>
            <div class="comments">
                <h3>Comments (${post.comments.length})</h3>
                ${post.comments
                  .map(
                    (comment) => `
                    <div class="comment">
                        <p><strong>@${comment.username}</strong>: ${
                      comment.text
                    }</p>
                        <small>${new Date(
                          comment.timestamp
                        ).toLocaleString()}</small>
                    </div>
                `
                  )
                  .join("")}
                <div class="add-comment">
                    <input type="text" id="comment-${
                      post.id
                    }" placeholder="Add a comment...">
                    <button onclick="addComment(${post.id})">Comment</button>
                </div>
            </div>
        `;

    postsElement.appendChild(postElement);
  });
}

// Initial setup
window.onload = function () {
  showLoginForm();
};
