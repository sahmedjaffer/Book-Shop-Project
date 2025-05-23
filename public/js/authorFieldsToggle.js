// authorFieldsToggle.js

document.addEventListener('DOMContentLoaded', function () {
  const authorSelect = document.getElementById('authorId');
  const newAuthorFields = document.getElementById('new-author-fields');

  if (authorSelect && newAuthorFields) {
    authorSelect.addEventListener('change', function () {
      if (!this.value) {
        newAuthorFields.style.display = 'flex'; // أو 'block' حسب CSS
      } else {
        newAuthorFields.style.display = 'none';
      }
    });
  }
});
