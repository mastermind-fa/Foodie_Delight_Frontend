document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://foodie-delight-backend-eta.vercel.app/api/food-items/";
  const swiperContainer = document.querySelector(".mySwiper");

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const swiperSlide = document.createElement("swiper-slide");
        swiperSlide.className =
          "border-2 rounded-3xl cursor-pointer flex items-center py-10 flex-col";

        const slideContent = `
                    <div class="w-[80%]">
                        <img src="https://foodie-delight-backend-eta.vercel.app${item.image}" class="w-full" alt="${item.name}" />
                        <div class="flex text-[22px] mt-4 font-semibold justify-between">
                            <h5 class="text-[#111111]">${item.name}</h5>
                            <h5 class="text-[#f22e3e]">$${item.price}</h5>
                        </div>
                        <div class="my-4">
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                        </div>
                        <p class="text-left text-[18px] font-[500] text-[#777]">${item.description}</p>
                        <button class="mt-3 rounded-full bg-[#fbb200] px-5 uppercase py-3 text-white" onclick="window.location.href='foodDetails.html?id=${item.id}'">
                            <i class="fa-brands hover:text-[#f22e3e] text-[24px] lg:text-[18px] cursor-pointer fa-opencart"></i>
                            <span class="ps-1.5 font-semibold">Order Now</span>
                        </button>
                    </div>
                `;

        swiperSlide.innerHTML = slideContent;
        swiperContainer.appendChild(swiperSlide);
      });

      // Initialize Swiper after adding slides
      const swiper = new Swiper(".mySwiper", {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://foodie-delight-backend-eta.vercel.app/api/food-items/";
  const swiperContainer = document.querySelector(".mySwiper2");

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const swiperSlide = document.createElement("swiper-slide");
        swiperSlide.className =
          "border-2 rounded-3xl cursor-pointer flex items-center py-10 flex-col";

        const slideContent = `
                    <div class="w-[80%]">
                        <img src="https://foodie-delight-backend-eta.vercel.app${item.image}" class="w-full" alt="${item.name}" />
                        <div class="flex text-[22px] mt-4 font-semibold justify-between">
                            <h5 class="text-[#111111]">${item.name}</h5>
                            <h5 class="text-[#f22e3e]">$${item.price}</h5>
                        </div>
                        <div class="my-4">
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                        </div>
                        <p class="text-left text-[18px] font-[500] text-[#777]">${item.description}</p>
                        <button class="mt-3 rounded-full bg-[#fbb200] px-5 uppercase py-3 text-white" onclick="window.location.href='foodDetails.html?id=${item.id}'">
                            <i class="fa-brands hover:text-[#f22e3e] text-[24px] lg:text-[18px] cursor-pointer fa-opencart"></i>
                            <span class="ps-1.5 font-semibold">Order Now</span>
                        </button>
                    </div>
                `;

        swiperSlide.innerHTML = slideContent;
        swiperContainer.appendChild(swiperSlide);
      });

      // Initialize Swiper after adding slides
      const swiper = new Swiper(".mySwiper", {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://foodie-delight-backend-eta.vercel.app/api/food-items/";
  const swiperContainer = document.querySelector(".mySwiper3");

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const swiperSlide = document.createElement("swiper-slide");
        swiperSlide.className =
          "border-2 rounded-3xl cursor-pointer flex items-center py-10 flex-col";

        const slideContent = `
                    <div class="w-[80%]">
                        <img src="https://foodie-delight-backend-eta.vercel.app${item.image}" class="w-full" alt="${item.name}" />
                        <div class="flex text-[22px] mt-4 font-semibold justify-between">
                            <h5 class="text-[#111111]">${item.name}</h5>
                            <h5 class="text-[#f22e3e]">$${item.price}</h5>
                        </div>
                        <div class="my-4">
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                            <i class="fa-solid fa-star text-[#fbb200] text-[14px]"></i>
                        </div>
                        <p class="text-left text-[18px] font-[500] text-[#777]">${item.description}</p>
                        <button class="mt-3 rounded-full bg-[#fbb200] px-5 uppercase py-3 text-white" onclick="window.location.href='foodDetails.html?id=${item.id}'">
                            <i class="fa-brands hover:text-[#f22e3e] text-[24px] lg:text-[18px] cursor-pointer fa-opencart"></i>
                            <span class="ps-1.5 font-semibold">Order Now</span>
                        </button>
                    </div>
                `;

        swiperSlide.innerHTML = slideContent;
        swiperContainer.appendChild(swiperSlide);
      });

      // Initialize Swiper after adding slides
      const swiper = new Swiper(".mySwiper", {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
