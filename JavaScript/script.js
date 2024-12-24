function addRow() {
  const table = document.getElementById('addressTable').getElementsByTagName('tbody')[0];
  const firstRow = table.querySelector('tr'); // Always get the first row in the table
  const newRow = firstRow.cloneNode(true); // Clone the first row

  // Clear all input values in the cloned row
  newRow.querySelectorAll('input').forEach(input => {
      input.value = '';
      if (input.type === 'checkbox') input.checked = false;
      if (input.type === 'radio') input.checked = false;
  });

  // Reset the dropdowns
  const countrySelect = newRow.querySelector('select[id^="countryId"]');
  const stateSelect = newRow.querySelector('select[id^="stateId"]');
  countrySelect.value = '';
  stateSelect.innerHTML = '<option value="">Select State</option>'; // Reset state options

  // Ensure unique IDs for country and state dropdowns
  const newIndex = table.rows.length + 1;
  countrySelect.id = `countryId${newIndex}`;
  stateSelect.id = `stateId${newIndex}`;

  // Add event listener for updating states
  countrySelect.addEventListener('change', function () {
      updateStates(this);
  });

  // Reset delete checkbox and action button
  const deleteCheckboxCell = newRow.cells[6];
  deleteCheckboxCell.innerHTML = '<input type="checkbox" onclick="deleteRow(this)">';

  const actionCell = newRow.cells[7];
  actionCell.innerHTML = '<button type="button" onclick="addRow()">Add</button>';

  // Append the new row to the table
  table.appendChild(newRow);
}



function deleteRow(button) {
  const row = button.closest('tr'); // Get the closest row
  const table = row.parentNode;

  // Ensure at least one row remains
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




function saveForm() {
    const form = document.querySelector('form'); 
    if (form) {
        
        alert('Form data saved!');
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            console.log(key + ": " + value);  
        });
       
    } else {
        alert('No form found to save!');
    }
}


function resetForm() {
    const form = document.querySelector('form');
    if (form) {
        form.reset(); 
        alert('Form reset successfully!');
    } else {
        alert('No form found to reset!');
    }
}


function submitForm(event) {
    event.preventDefault(); 
    
    const form = document.querySelector('form'); 
    if (form) {
        
        const formData = new FormData(form);
        let isValid = true;
        formData.forEach((value, key) => {
            
            if (!value && key !== 'nriYes' && key !== 'nriNo') {
                alert('Please fill in all fields!');
                isValid = false;
                return;
            }
        });

        if (isValid) {
            alert('Form submitted successfully!');
            form.submit();  
        }
    } else {
        alert('No form found to submit!');
    }
}

document.getElementById('mobileNumber').addEventListener('input', function (event) {
    const input = event.target.value;
    const isValid = /^\d{0,10}$/.test(input); 
    if (!isValid) {
      event.target.value = input.slice(0, -1); 
    }
  });

  document.getElementById('residencePhone').addEventListener('input', function (event) {
    const input = event.target.value;
    const isValid = /^\d{0,10}$/.test(input); 
    if (!isValid) {
      event.target.value = input.slice(0, -1); 
    }
  });
  document.getElementById('pinCodeInput').addEventListener('input', function (event) {
    const input = event.target.value;
    const isValid = /^\d{0,6}$/.test(input); 
    if (!isValid) {
      event.target.value = input.slice(0, -1); 
    }
  });
  document.getElementById('stdCodeInput').addEventListener('input', function (event) {
    const input = event.target.value;
    const isValid = /^\d{0,10}$/.test(input); 
    if (!isValid) {
      event.target.value = input.slice(0, -1); 
    }
  });

  function toggleSubmitButton() {
    const checkbox = document.getElementById('checkboxForUserAcceptance');
    const submitButton = document.getElementById('footerSubmitButton');
    
    // Enable the button if the checkbox is checked, otherwise disable it
    submitButton.disabled = !checkbox.checked;
  }


  function toggleFields() {
    const ownerType = document.getElementById('ownerType').value;
    
    // Fields to disable when "Organization" is selected
    const fieldsToDisable = [
        'title', 'firstName','lastName','fatherTitle','fatherFirstName','fatherMiddleName','fatherLastName','gender',
        'occupationClass','dateInput','age','birthPlace','qualification','sports','degree','occupationClassSelect','nriYes','nriNo'
    ];
    const fieldsToDisableForIndividual = ['corporateName'];
    const corporateDisable = ownerType ==='personal'; 
    const disableFields = ownerType === 'organization';
    

    // Loop through the fields and disable or enable them
    
    fieldsToDisableForIndividual.forEach(fieldId=>{
      const field1 = document.getElementById(fieldId);
      if(field1){
        field1.disabled = corporateDisable;
      }
    })

    fieldsToDisable.forEach(fieldId => {
        const field = document.getElementById(fieldId);

        if (field) {
            field.disabled = disableFields;

            // If disabling the field, remove the required attribute
            if (disableFields) {
                field.removeAttribute('required');
            } else {
                // Re-add the required attribute for enabled fields
                if (['firstName', 'lastName', 'fatherFirstName', 'dateInput'].includes(fieldId)) {
                    field.setAttribute('required', 'required');
                }
            }
        }
    });
}


        function updateGender() {
        const title = document.getElementById('title').value;
        const genderField = document.getElementById('gender');
  
        genderField.value = title === 'Mr' ? 'Male' : title === 'Mrs' || title === 'Miss' ? 'Female' : 'Select';
      }


        function toggleCountryField() {
        const isNRI = document.getElementById('nriYes').checked;
        const countryRow = document.getElementById('countryRow');
        countryRow.style.display = isNRI ? 'table-row' : 'none';
      }
  
  
        function calculateAge() {
        const dateInput = document.getElementById('dateInput').value;
        const ageField = document.getElementById('age');
        
        if (!dateInput) return; // Exit if no date is selected
        
        const dob = new Date(dateInput);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();
      
        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
          age--;
        }
      
        ageField.value = age; // Set age value on screen
      
        // Show alert if age is less than 18
        if (age < 18) {
          alert("To take Insurance age should be greater than 18");
        }
      }

      
// Country state selection
const countryStateMap = {
  india: ["Maharashtra", "Karnataka", "UP", "Delhi"],
  thailand: ["Chiang Mai", "Chumphon", "Chonburi", "Kalasin"],
  malaysia: ["Johor", "Kedah", "Kelantan", "Kuala Lumpur"],
  brazil: ["Acre", "Amazonas", "Amapa", "Alagoas"],
};

function updateStates(countrySelect) {
  const country = countrySelect.value;
  const stateSelect = countrySelect.closest('tr').querySelector('select[id^="stateId"]'); 
  
  // Clear the current state options
  stateSelect.innerHTML = '<option value="">Select State</option>';

  // If the country is selected and states are available for that country
  if (countryStateMap[country]) {
      const states = countryStateMap[country];
      states.forEach(state => {
          const option = document.createElement("option");
          option.value = state.toLowerCase().replace(/\s+/g, ''); // to create unique option values (e.g. "karnataka")
          option.textContent = state;
          stateSelect.appendChild(option);
      });
  }
}


function toggleSubmitButton() {
  const checkbox = document.getElementById('checkboxForUserAcceptance');
  const submitButton = document.getElementById('footerSubmitButton');

  // Show the button if the checkbox is checked, otherwise hide it
  if (checkbox.checked) {
    submitButton.style.display = 'inline-block'; // Show the button
    
  } else if(!checkbox.checked){
    submitButton.style.display = 'none'; // Hide the button
  }
  
}






$(function () {
  const countryStateMap = {
    india: ["Maharashtra", "Karnataka", "UP", "Delhi"],
    thailand: ["Chiang Mai", "Chumphon", "Chonburi", "Kalasin"],
    malaysia: ["Johor", "Kedah", "Kelantan", "Kuala Lumpur"],
    brazil: ["Acre", "Amazonas", "Amapa", "Alagoas"],
  };

  function updateStates($countrySelect) {
    const selectedCountry = $countrySelect.val(); 
    const $stateSelect = $countrySelect.closest('tr').find('select[id^="stateId"]'); // Find the state dropdown in the same row

    // Clear the state dropdown
    $stateSelect.empty().append('<option value="">Select State</option>');

    // Populate states if the selected country exists in the map
    if (countryStateMap[selectedCountry]) {
      countryStateMap[selectedCountry].forEach(state => {
        const option = `<option value="${state.toLowerCase().replace(/\s+/g, '')}">${state}</option>`;
        $stateSelect.append(option);
      });
    }
  }

  // Add new row
  function addRow() {
    const $lastRow = $('#addressTable tbody tr:last'); // Select the last row
    const $newRow = $lastRow.clone(); // Clone the last row

    // Reset the inputs in the cloned row
    $newRow.find('input, select').each(function () {
      if ($(this).is(':checkbox')) {
        $(this).prop('checked', false); // Uncheck checkboxes
      } else {
        $(this).val(''); // Clear input/select values
      }
    });

    // Append the cloned row to the table
    $('#addressTable tbody').append($newRow);
  }

  // Delete row
  $(document).on('click', 'input[type="checkbox"][onclick="deleteRow(this)"]', function () {
    const $row = $(this).closest('tr'); // Get the parent row of the clicked checkbox

    if ($('#addressTable tbody tr').length > 1) {
      $row.remove(); // Remove the row if there are more than one row
    } else {
      alert('Cannot delete the last remaining row.');
    }
  });

  // Handle state rendering when country changes
  $(document).on('change', 'select[id^="countryId"]', function () {
    updateStates($(this));
  });

  // Bind the addRow function to the Add button
  $(document).on('click', 'button[onclick="addRow()"]', function () {
    addRow();
  });
});
