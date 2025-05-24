// authorFieldsToggle.js

document.addEventListener('DOMContentLoaded', function () {
  const authorSelect = document.getElementById('authorId');
  const newAuthorFields = document.getElementById('new-author-fields');

  // This function toggles visibility based on the selected value
  function toggleNewAuthorFields() {
    // If the selected value is empty (i.e., "-- None / Add new --")
    if (!authorSelect.value) {
      newAuthorFields.style.display = 'flex'; // Show the new author fields
    } else {
      newAuthorFields.style.display = 'none'; // Hide the new author fields
    }
  }

  if (authorSelect && newAuthorFields) {
    toggleNewAuthorFields(); // Run on initial page load

    // Run the function whenever the user changes the selection
    authorSelect.addEventListener('change', toggleNewAuthorFields);
  }
});
