

//test
//Profile Creation
async function createProfile(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirm_email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const bio = document.getElementById('bio').value;
  
    if (email !== confirmEmail) {
      alert('Emails do not match.');
      return;
    }
    //prepare data to send to backend
    const profileData = { name, username, email, password, bio };

    //send data to backend
    try{
      const response = await fetch('http://localhost:5000/create-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();//Response from backend
      if (response.ok) {
        alert('Profile created successfully!');
      } else {
        alert('Profile creation failed. '+ data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating profile');
    }
  
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match.');
    //   return;
    // }
    //window.location.href = "profile.html"
    //window.location.replace("profile.html");
    console.log('Sending data:', { name, username, email, password, bio });

    };
