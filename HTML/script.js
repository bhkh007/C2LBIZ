
function addRow() {
    const table = document.getElementById('addressTable').getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);
    
    
    newRow.querySelectorAll('input').forEach(input => {
        input.value = '';
        if (input.type === 'checkbox') input.checked = false;
    });
    
    const deleteCell = newRow.cells[0];
    deleteCell.innerHTML = '<input type="checkbox" onclick="deleteRow(this)">'; 
    

    const actionCell = newRow.cells[1];
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
  


    function toggleFields() {
      const ownerType = document.getElementById('ownerType').value;
      const corporateNameField = document.getElementById('corporateName');
      const titleField = document.getElementById('title');
      const firstNameField = document.getElementById('firstName');
      const lastNameField = document.getElementById('lastName');
      const fatherFirstNameField = document.getElementById('fatherFirstName');
      const fatherMiddleNameField = document.getElementById('fatherMiddleName');
      const fatherLastNameField = document.getElementById('fatherLastName');
      const genderField = document.getElementById('gender');
      const occupationClass = document.getElementById('occupationClass');
      const dateOfBirth = document.getElementById('dateInput');
      
      const disableFields = ownerType === 'organization';

      dateOfBirth.disabled = disableFields;
      occupationClass.disabled = disableFields;
      corporateNameField.disabled = disableFields;
      titleField.disabled = disableFields;
      firstNameField.disabled = disableFields;
      lastNameField.disabled = disableFields;
      fatherFirstNameField.disabled = disableFields;
      fatherMiddleNameField.disabled = disableFields;
      fatherLastNameField.disabled = disableFields;
      genderField.disabled = disableFields;
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
        
        if (!dateInput) return; 
        
        const dob = new Date(dateInput);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();
      
        
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
          age--;
        }
      
        ageField.value = age;
      
        
        if (age < 18) {
          alert("To take Insurance age should be greater than 18");
        }
      }

      
      // Country state selection

      const countryStateMap = {
        
        india: ["Maharashtra", "Karnataka", "UP", "Delhi"],
        thailand: ["Chiang Mai","Chumphon","Chonburi","Kalasin"],
        malaysia: ["Johor","Kedah","Kelantan","Kuala Lumpur"],
        brazil: ["Acre","Amazonas","Amapa","Alagoas"],
      };
      
      // Function to update the states dropdown based on the selected country
      function updateStates() {
        const country = document.getElementById('countryId').value;
        const stateSelect = document.getElementById('stateId');
        
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
      