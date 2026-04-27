// Aos - the right initialisation
jQuery(document).ready(function () {
  (function () {
    // your page initialization code here
    // the DOM will be available here
    AOS.init({
      duration: 750,
      offset: 0, // offset (in px) from the original trigger point
      anchorPlacement: "top-bottom", // define where the AOS animations will be triggered
    });
  })();
});
// //

$(function () {
  $(".header__burger").on("click", function (event) {
    $("body").toggleClass("body--active");
  });

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  // Если устройство мобильное, то используем событие клика
  if (isMobileDevice()) {
    $(document).on("click", function (event) {
      // Проверяем, является ли цель клика элементом с классом '.lang'
      if (!$(event.target).closest(".dropdown").length) {
        // Если нет, убираем класс 'dropdown--active' у всех элементов с этим классом
        $(".dropdown").removeClass("dropdown--active");
      } else {
        // Иначе добавляем/убираем класс 'dropdown--active' для элемента с классом '.dropdown'
        $(event.target).closest(".dropdown").toggleClass("dropdown--active");
      }
    });
  } else {
    // Иначе используем событие ховера
    $(".dropdown").on("mouseover", function () {
      $(this).addClass("dropdown--active");
    });

    $(".dropdown").on("mouseout", function () {
      $(this).removeClass("dropdown--active");
    });
  }
  var advantagesItems = document.querySelectorAll(".advantages-item");

  if (advantagesItems.length) {
    var advantagesDesktopMedia = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    var updateAdvantagesHiddenHeights = function () {
      Array.prototype.forEach.call(advantagesItems, function (item) {
        var hiddenText = item.querySelector(".advantages-item__text--hidden");

        if (!hiddenText) {
          return;
        }

        hiddenText.style.setProperty(
          "--advantages-hidden-height",
          hiddenText.scrollHeight + "px",
        );
      });
    };

    var openAdvantagesItem = function (item) {
      var trigger = item.querySelector(".advantages-item__more");

      updateAdvantagesHiddenHeights();
      item.classList.add("advantages-item--active");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "true");
      }
    };

    var closeAdvantagesItem = function (item) {
      var trigger = item.querySelector(".advantages-item__more");

      item.classList.remove("advantages-item--active");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    };

    var closeAllAdvantagesItems = function (exceptionItem) {
      Array.prototype.forEach.call(advantagesItems, function (item) {
        if (item === exceptionItem) {
          return;
        }

        closeAdvantagesItem(item);
      });
    };

    updateAdvantagesHiddenHeights();
    window.addEventListener("load", updateAdvantagesHiddenHeights);
    window.addEventListener("resize", updateAdvantagesHiddenHeights);

    Array.prototype.forEach.call(advantagesItems, function (item) {
      var trigger = item.querySelector(".advantages-item__more");

      if (!trigger) {
        return;
      }

      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-expanded", "false");

      item.addEventListener("mouseenter", function () {
        if (!advantagesDesktopMedia.matches) {
          return;
        }

        openAdvantagesItem(item);
      });

      item.addEventListener("mouseleave", function () {
        if (!advantagesDesktopMedia.matches) {
          return;
        }

        closeAdvantagesItem(item);
      });

      trigger.addEventListener("click", function (event) {
        if (advantagesDesktopMedia.matches) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (item.classList.contains("advantages-item--active")) {
          closeAdvantagesItem(item);
          return;
        }

        closeAllAdvantagesItems(item);
        openAdvantagesItem(item);
      });

      trigger.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        trigger.click();
      });
    });

    document.addEventListener("click", function (event) {
      if (advantagesDesktopMedia.matches) {
        return;
      }

      if (event.target.closest(".advantages-item")) {
        return;
      }

      closeAllAdvantagesItems();
    });

    if (advantagesDesktopMedia.addEventListener) {
      advantagesDesktopMedia.addEventListener("change", function () {
        closeAllAdvantagesItems();
        updateAdvantagesHiddenHeights();
      });
    } else if (advantagesDesktopMedia.addListener) {
      advantagesDesktopMedia.addListener(function () {
        closeAllAdvantagesItems();
        updateAdvantagesHiddenHeights();
      });
    }
  }

  // // //

  $(document).ready(function () {
    var $popup = $(".popup");
    var $popups = {
      contact: $(".popup--contact"),
    };

    // Функция для показа попапа
    function showPopup($popupToShow) {
      $popupToShow.addClass("popup--active").fadeIn(250, function () {
        $(this).animate({ opacity: 1 }, 250);
      });
      $("body").addClass("body--popup");
    }

    // Функция для скрытия попапа
    function hidePopup($popupToHide) {
      $popupToHide.removeClass("popup--active").fadeOut(250, function () {
        $(this).animate({ opacity: 1 }, 250);
      });
      $("body").removeClass("body--popup");
    }

    $(".heading__titling-link, .funnel__link").click(function (event) {
      event.stopPropagation();
      event.preventDefault();
      showPopup($popups.contact);
    });

    // Обработчик кликов для скрытия попапов
    $(".cls").click(function (event) {
      event.stopPropagation();
      event.preventDefault();
      hidePopup($popup);
    });

    // Скрываем попап при клике вне его области
    $(document).click(function (event) {
      $.each($popups, function (key, $popupToCheck) {
        if ($popupToCheck.hasClass("popup--active")) {
          var $popupInner = $popupToCheck.find(".popup__inner");
          if (
            !$popupInner.is(event.target) &&
            $popupInner.has(event.target).length === 0
          ) {
            hidePopup($popupToCheck);
          }
        }
      });
    });
  });

  // // //
  // $('.header-top-lang').on('click', function (event) {
  //     $('.header-top-lang-content').toggleClass('header-top-lang-content--active');
  //     $(this).toggleClass('header-top-lang--active');
  // });

  // Делаем попап и скрываем по клику вне его
  // $(document).ready(function () {
  //     var $popup = $('.popup');
  //     var $popups = {
  //         call: $('.popup--call'),
  //         application: $('.popup--application'),
  //     };

  //     // Функция для показа попапа
  //     function showPopup($popupToShow) {
  //         $popupToShow.addClass('popup--active').fadeIn(250, function () {
  //             $(this).animate({ opacity: 1 }, 250);
  //         });
  //         $('body').addClass('body--popup');
  //     }

  //     // Функция для скрытия попапа
  //     function hidePopup($popupToHide) {
  //         $popupToHide.removeClass('popup--active').fadeOut(250, function () {
  //             $(this).animate({ opacity: 1 }, 250);
  //         });
  //         $('body').removeClass('body--popup');
  //     }

  //     // Обработчики кликов для показа попапов
  //     $('.heading-body__link').click(function (event) {
  //         event.stopPropagation();
  //         event.preventDefault();
  //         showPopup($popups.application);
  //     });

  //     // Обработчик кликов для скрытия попапов
  //     $('.cls').click(function (event) {
  //         event.stopPropagation();
  //         event.preventDefault();
  //         hidePopup($popup);
  //     });

  //     // Скрываем попап при клике вне его области
  //     $(document).click(function (event) {
  //         $.each($popups, function (key, $popupToCheck) {
  //             if ($popupToCheck.hasClass('popup--active')) {
  //                 var $popupInner = $popupToCheck.find('.popup__inner');
  //                 if (!$popupInner.is(event.target) && $popupInner.has(event.target).length === 0) {
  //                     hidePopup($popupToCheck);
  //                 }
  //             }
  //         });
  //     });
  // });
  //

  // Копировать значение с инпута
  // if (document.querySelector('.transfer-body__wallet-copy')) {
  //     document.querySelector('.transfer-body__wallet-copy').addEventListener('click', function () {
  //         // Находим элемент <input> по его id
  //         var inputElement = document.querySelector('.transfer-body__wallet-input');

  //         // Вызываем метод select() для выбора текста внутри элемента <input>
  //         inputElement.select();

  //         // Выполняем команду копирования выбранного текста в буфер обмена
  //         document.execCommand('copy');

  //         // Снимаем фокус с элемента, чтобы выделение текста не оставалось
  //         inputElement.blur();

  //         // Подсветка кнопки для обратной связи
  //         this.classList.add('copied');

  //         // Через какое-то время убираем подсветку кнопки
  //         setTimeout(function () {
  //             document.querySelector('.transfer-body__wallet-copy').classList.remove('copied');
  //         }, 500);
  //     });
  // }
});

document.querySelectorAll(".langs").forEach((langs) => {
  const langsList = langs.querySelector(".langs__list");
  if (!langsList) return;

  const items = Array.from(langsList.querySelectorAll(".langs__item"));
  if (!items.length) return;

  let highlight = langs.querySelector(".langs__highlight");
  if (!highlight) {
    highlight = document.createElement("div");
    highlight.classList.add("langs__highlight");
    langs.appendChild(highlight);
  }

  let activeItem = langsList.querySelector(".langs__item--active") || items[0];

  const setActive = (target) => {
    items.forEach((item) => item.classList.remove("langs__item--active"));
    target.classList.add("langs__item--active");
  };

  const moveHighlight = (target) => {
    const rect = target.getBoundingClientRect();
    const parentRect = langsList.getBoundingClientRect();
    const left = rect.left - parentRect.left;
    highlight.style.transform = `translate(${left}px, -50%)`;
  };

  setActive(activeItem);
  moveHighlight(activeItem);

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      setActive(item);
      moveHighlight(item);
    });

    item.addEventListener("click", () => {
      activeItem = item;
    });
  });

  langsList.addEventListener("mouseleave", () => {
    setActive(activeItem);
    moveHighlight(activeItem);
  });

  window.addEventListener("resize", () => {
    moveHighlight(activeItem);
  });
});

if (document.querySelector(".services-swiper")) {
  new Swiper(".services-swiper", {
    speed: 750,
    watchOverflow: true,
    direction: "horizontal",
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      0: {
        direction: "horizontal",
        slidesPerView: 1.1,
        spaceBetween: 15,
        allowTouchMove: true,
        simulateTouch: true,
      },
      576: {
        direction: "horizontal",
        slidesPerView: 1.35,
        spaceBetween: 15,
        allowTouchMove: true,
        simulateTouch: true,
      },
      768: {
        direction: "horizontal",
        slidesPerView: 1.6,
        spaceBetween: 15,
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        direction: "horizontal",
        slidesPerView: 2.5,
        spaceBetween: 20,
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 10,
        allowTouchMove: false,
        simulateTouch: false,
      },
    },
  });
}

if (document.querySelector(".resources-swiper")) {
  new Swiper(".resources-swiper", {
    slidesPerView: 5,
    loop: true,
    spaceBetween: 30,
    speed: 750,
    watchOverflow: true,
    navigation: {
      prevEl: ".arrow--resources-prev",
      nextEl: ".arrow--resources-next",
    },
    pagination: {
      el: ".pagination--resources",
      type: "bullets",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector(".clients-swiper")) {
  new Swiper(".clients-swiper", {
    slidesPerView: 7,
    loop: true,
    spaceBetween: 10,
    speed: 750,
    navigation: {
      prevEl: ".arrow--clients-prev",
      nextEl: ".arrow--clients-next",
    },
    pagination: {
      el: ".pagination--clients",
      type: "bullets",
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      769: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
    },
  });
}
