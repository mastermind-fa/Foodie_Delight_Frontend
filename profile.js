// profile.js

document.addEventListener("DOMContentLoaded", function () {
    fetchProfile();
  
    // Add event listeners to buttons
    document.querySelector(".bg-blue-500").addEventListener("click", () => {
      window.location.href = "login.html";
    });
  
    document.querySelector(".bg-green-500").addEventListener("click", () => {
      window.location.href = "order.html";
    });
  
    document.querySelector(".bg-red-500").addEventListener("click", () => {
      logout();
    });
  });
  
  async function fetchProfile() {
    const userId = localStorage.getItem("user_id"); // Get user ID from localStorage
    if (!userId) {
      alert("User not logged in. Redirecting to login page.");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const response = await fetch(`https://you-fashion-backend.vercel.app/customer/details/${userId}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
  
      const data = await response.json();
      displayProfile(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Failed to fetch profile data. Please try again.");
    }
  }
  
  function displayProfile(data) {
    // Update profile picture (if available)
    const profilePicture = document.querySelector("img");
    if (data.profile_picture) {
      profilePicture.src = data.profile_picture;
    }
  
    // Update username using the id attribute
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
      usernameElement.textContent = data.user;
    }
  
    // Update first name
    document.querySelector('input[placeholder="John"]').value = data.first_name;
  
    // Update last name
    document.querySelector('input[placeholder="Doe"]').value = data.last_name;
  
    // Update email (if available in the API response)
    const emailInput = document.querySelector('input[type="email"]');
    if (data.email) {
      emailInput.value = data.email;
    }
  
    // Update phone number
    document.querySelector('input[type="tel"]').value = data.phone;
  
    // Update address
    document.querySelector("textarea").value = data.address;
  }
  
  function logout() {
    // Clear localStorage and redirect to login page
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }