// authorFieldsToggle.js

document.addEventListener('DOMContentLoaded', function () {
  const authorSelect = document.getElementById('authorId');
  const newAuthorFields = document.getElementById('new-author-fields');

  if (authorSelect && newAuthorFields) {
    authorSelect.addEventListener('change', function () {
      if (!authorSelect) {
        newAuthorFields.style.display = 'flex';
      } 
      if(authorSelect){
        newAuthorFields.style.display = 'none';
      }
    });
  }
});
