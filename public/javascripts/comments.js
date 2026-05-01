let page = 1;
let submitting = false;

async function loadComments() {
  try {
    const res = await fetch(`/api/comments?page=${page}`);

    if (!res.ok) {
      throw new Error('Could not load comments.');
    }

    const data = await res.json();
    const container = document.getElementById('comments');

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

    if (page >= data.totalPages || data.totalPages === 0) {
      document.getElementById('loadMore').style.display = 'none';
    } else {
      document.getElementById('loadMore').style.display = 'inline-block';
    }
  } catch (error) {
    document.getElementById('error').textContent =
      'Comments could not be loaded right now. Please try again later.';
  }
}

document.getElementById('commentForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  if (submitting) {
    return;
  }

  submitting = true;

  const submitButton = document.querySelector('#commentForm button');
  submitButton.disabled = true;

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const errorEl = document.getElementById('error');

  errorEl.textContent = '';

  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, message: message })
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error;
      return;
    }

    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    document.getElementById('comments').innerHTML = '';

    page = 1;
    loadComments();
  } catch (error) {
    errorEl.textContent =
      'Your comment could not be submitted right now. Please try again later.';
  } finally {
    submitting = false;
    submitButton.disabled = false;
  }
});

document.getElementById('loadMore').addEventListener('click', function() {
  page++;
  loadComments();
});

loadComments();