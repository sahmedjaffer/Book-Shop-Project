// authorFieldsToggle.js

document.addEventListener('DOMContentLoaded', function () {
  const authorSelect = document.getElementById('authorId');
  const newAuthorFields = document.getElementById('new-author-fields');

  function toggleNewAuthorFields() {
    if (!authorSelect.value) {
      newAuthorFields.classList.add('show-author-fields');
      newAuthorFields.classList.remove('hide-author-fields');
      const firstInput = newAuthorFields.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    } else {
      newAuthorFields.classList.remove('show-author-fields');
      newAuthorFields.classList.add('hide-author-fields');
      newAuthorFields.querySelectorAll('input, textarea').forEach(el => el.value = '');
    }
  }

  if (authorSelect && newAuthorFields) {
    toggleNewAuthorFields();
    authorSelect.addEventListener('change', toggleNewAuthorFields);
  }
});

