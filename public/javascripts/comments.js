// Frontend logic for loading, displaying, and submitting comments

// Tracks which page of comments is currently being displayed
let page = 1;

// Prevents rapid double-click submissions
let submitting = false;

// Loads comments from the backend API and displays them on the page
async function loadComments() {
  try {
    // Sends a GET request for the current page of comments
    const res = await fetch(`/api/comments?page=${page}`);

    // Stops the function if the server response fails
    if (!res.ok) {
      throw new Error('Could not load comments.');
    }

    const data = await res.json();
    const container = document.getElementById('comments');
    
    // Creates a comment card for each comment returned by the server
    data.comments.forEach(function(comment) {
      const div = document.createElement('article');
      div.className = 'comment-card';

      div.innerHTML = `
        <h3>${comment.name}</h3>
        <p>${comment.message}</p>
        <small>${comment.timestamp}</small>
      `;

      container.appendChild(div);
    });
    // Hides the Load More button when there are no more pages
    if (page >= data.totalPages || data.totalPages === 0) {
      document.getElementById('loadMore').style.display = 'none';
    } else {
      document.getElementById('loadMore').style.display = 'inline-block';
    }
  // Shows a friendly error if comments cannot load
  } catch (error) {
    document.getElementById('error').textContent =
      'Comments could not be loaded right now. Please try again later.';
  }
}

// Handles the form submission when a user posts a comment
document.getElementById('commentForm').addEventListener('submit', async function(e) {
  
  // Prevents the page from refreshing
  e.preventDefault();

  // Stops duplicate submissions if the request is already processing
  if (submitting) {
    return;
  }

  submitting = true;

  const submitButton = document.querySelector('#commentForm button');
  
  // Disables the button while the request is being sent
  submitButton.disabled = true;

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const errorEl = document.getElementById('error');

  // Clears old error messages before trying to submit again
  errorEl.textContent = '';

  try {

    // Sends the new comment data to the backend
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, message: message })
    });

    const data = await res.json();

    // Displays the server validation message if the submission fails
    if (!res.ok) {
      errorEl.textContent = data.error;
      return;
    }

    // Clears the form after a successful submission
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    document.getElementById('comments').innerHTML = '';

    // Reloads comments so the newest one appears at the top
    page = 1;
    loadComments();
  
    // Shows a friendly error if the comment cannot submit
  } catch (error) {
    errorEl.textContent =
      'Your comment could not be submitted right now. Please try again later.';
  
  // Re-enables the form after the request finishes
  } finally {
    submitting = false;
    submitButton.disabled = false;
  }
});
// Loads the next page of comments
document.getElementById('loadMore').addEventListener('click', function() {
  page++;
  // Loads the first page of comments when the page opens
  loadComments();
});

