function addRow() {
    const table = document.getElementById('addressTable').getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);
    
    // Clear inputs in the new row
    newRow.querySelectorAll('input').forEach(input => {
        input.value = '';
        if (input.type === 'checkbox') input.checked = false;
    });
    
    // Set Delete button for the Delete column
    const deleteCell = newRow.cells[newRow.cells.length - 2];
    deleteCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
    
    // Set Add button for the Action column
    const actionCell = newRow.cells[newRow.cells.length - 1];
    actionCell.innerHTML = '<button type="button" onclick="addRow()">Add</button>';
    
    table.appendChild(newRow);
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const table = row.parentNode;
    
    if (table.rows.length > 1) {
        table.removeChild(row);
    } else {
        alert("Cannot delete the last remaining row.");
    }
}

const now = new Date();

    const formattedDate = now.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

document.getElementById("lastLogin").textContent = `Last Login Date: ${formattedDate}`;



// Function to "Save" the form (simulated save logic)
function saveForm() {
    const form = document.querySelector('form'); // Find the form
    if (form) {
        // For demonstration purposes, we'll log the form data
        alert('Form data saved!');
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            console.log(key + ": " + value);  // Log form data to the console
        });
        // Here you can perform actual saving (e.g., store in local storage, send to API)
    } else {
        alert('No form found to save!');
    }
}

// Function to "Reset" the form (clear all input fields)
function resetForm() {
    const form = document.querySelector('form'); // Find the form
    if (form) {
        form.reset();  // Resets all form fields to their default values
        alert('Form reset successfully!');
    } else {
        alert('No form found to reset!');
    }
}

// Function to "Submit" the form (submit logic)
function submitForm(event) {
    event.preventDefault();  // Prevent default form submission (to handle manually)
    
    const form = document.querySelector('form'); // Find the form
    if (form) {
        // Add custom validation logic here, if needed
        const formData = new FormData(form);
        let isValid = true;
        formData.forEach((value, key) => {
            // Example of simple validation: check if any required field is empty
            if (!value && key !== 'nriYes' && key !== 'nriNo') { // Check if it's not NRI radio
                alert('Please fill in all fields!');
                isValid = false;
                return;
            }
        });

        if (isValid) {
            alert('Form submitted successfully!');
            form.submit();  // This would trigger the actual form submission
        }
    } else {
        alert('No form found to submit!');
    }
}
document.getElementById('Phone').addEventListener('input', function (event) {
    const input = event.target.value;
    const isValid = /^\d{0,10}$/.test(input); // Only allow up to 10 digits
    if (!isValid) {
      event.target.value = input.slice(0, -1); // Remove invalid character
    }
  });
  

  document.getElementById('residencePhone').addEventListener('input', function (event) {
    const input = event.target.value;
    const isValid = /^\d{0,10}$/.test(input); // Only allow up to 10 digits
    if (!isValid) {
      event.target.value = input.slice(0, -1); // Remove invalid character
    }
  });

  
  