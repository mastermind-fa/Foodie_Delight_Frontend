const navLogo = document.getElementById("nav-logo");
const navMain = document.getElementById("nav-main");
const navItems = document.getElementById("nav-items");
const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const searchOpen = document.getElementById("search-open");
const searchClose = document.getElementById("search-close");
const searchTrigger = document.getElementById("search-trigger");
const contactForm = document.getElementById("contactForm");
const handleScroll = () => {
  if (window.scrollY > 1) {
    navLogo.classList.remove("w-[140px]");
    navMain.classList.add("shadow");
    navLogo.classList.add("w-[100px]");
  } else {
    navLogo.classList.remove("w-[100px]");
    navMain.classList.remove("shadow");
    navLogo.classList.add("w-[140px]");
  }
};

window.addEventListener("scroll", handleScroll);

menuOpen.addEventListener("click", () => {
  navItems.classList.remove("nav-items-hidden");
  navItems.classList.remove("hidden");
  navItems.classList.add("block");
  navItems.classList.add("nav-items");
});

menuClose.addEventListener("click", () => {
  navItems.classList.remove("nav-items");
  navItems.classList.add("nav-items-hidden");
  setTimeout(() => {
    navItems.classList.remove("block");
    navItems.classList.add("hidden");
  }, 500);
});

searchOpen.addEventListener("click", () => {
  searchTrigger.classList.remove("nav-items-hidden");
  searchTrigger.classList.remove("hidden");
  searchTrigger.classList.add("flex");
  searchTrigger.classList.add("nav-items");
});

searchClose.addEventListener("click", () => {
  searchTrigger.classList.remove("nav-items");
  searchTrigger.classList.add("nav-items-hidden");
  setTimeout(() => {
    searchTrigger.classList.remove("block");
    searchTrigger.classList.add("hidden");
  }, 1000);
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;
  const time = e.target.time.value;
  const date = e.target.date.value;
  const guest = e.target.guest.value;
  if (
    name === "" &&
    email === "" &&
    phone === "" &&
    time === "" &&
    date === "" &&
    guest === ""
  ) {
    alert("Please Enter All Field");
  } else {
    alert("Form Sumbitted Successfully");
  }
});
