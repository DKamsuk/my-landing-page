const dortyData = {
  "red_velvet": {
    "name": "RED VELVET",
    "description": "Klasický americký dort s charakteristickou červenou barvou a jemným krémovým sýrovým krémem. Složení: červené piškoty, krémový sýr, máslo, vanilkový extrakt, kakao.",
    "image": "img/dorty/red_velvet.jpg",
    "prices": [
      {"size": "8 porcí", "price": "650 Kč"},
      {"size": "12 porcí", "price": "800 Kč"},
      {"size": "18 porcí", "price": "1300 Kč"},
      {"size": "32 porcí", "price": "2200 Kč"}
    ]
  },
  "mrkvac": {
    "name": "Mrkvač",
    "description": "Vlhký mrkvový dort s ořechy a krémem z mascarpone. Ideální pro milovníky přírodních chutí. Složení: mrkev, vlašské ořechy, mascarpone, med, skořice, hřebíček.",
    "image": "img/dorty/mrkvac.jpg",
    "prices": [
      {"size": "8 porcí", "price": "600 Kč"},
      {"size": "12 porcí", "price": "750 Kč"},
      {"size": "18 porcí", "price": "1200 Kč"}
    ]
  },
  "mechovy": {
    "name": "Mechový dort",
    "description": "Nadýchaný piškotový dort s vrstvami krému a čerstvého ovoce. Složení: piškoty, šlehačka, čerstvé jahody, maliny, borůvky, vanilkový pudink.",
    "image": "img/dorty/mechovy.jpg",
    "prices": [
      {"size": "8 porcí", "price": "700 Kč"},
      {"size": "12 porcí", "price": "850 Kč"},
      {"size": "18 porcí", "price": "1350 Kč"}
    ]
  },
  "kubansky": {
    "name": "Kubanský dort",
    "description": "Bohatý dort s vrstvami piškotu, krému a karamelu. Složení: piškoty, kondenzované mléko, máslo, karamel, vlašské ořechy, rumová esence.",
    "image": "img/dorty/kubansky.jpg",
    "prices": [
      {"size": "8 porcí", "price": "750 Kč"},
      {"size": "12 porcí", "price": "950 Kč"},
      {"size": "18 porcí", "price": "1450 Kč"}
    ]
  },
  "cheesecake": {
    "name": "Cheesecake",
    "description": "Krémový dezert na korpusu z drcených sušenek. Složení: smetanový sýr, zakysaná smetana, vanilka, sušenky Digestive, máslo, čerstvé ovoce dle sezóny.",
    "image": "img/dorty/cheesecake.jpg",
    "prices": [
      {"size": "8 porcí", "price": "800 Kč"},
      {"size": "12 porcí", "price": "1000 Kč"},
      {"size": "18 porcí", "price": "1500 Kč"}
    ]
  },
  "black_velvet": {
    "name": "Black Velvet",
    "description": "Dramatický černý dort s červeným sametovým efektem. Složení: černé kakao, krémový sýr, červené potravinářské barvivo, čokoládová poleva.",
    "image": "img/dorty/black_velvet.jpg",
    "prices": [
      {"size": "8 porcí", "price": "850 Kč"},
      {"size": "12 porcí", "price": "1100 Kč"},
      {"size": "18 porcí", "price": "1600 Kč"}
    ]
  },
  "medovnik": {
    "name": "Klasický medovník",
    "description": "Tradiční ruský dort s medovými pláty a smetanovým krémem. Složení: med, smetana, máslo, vejce, mouka, ořechy, kondenzované mléko.",
    "image": "img/dorty/medovnik.jpg",
    "prices": [
      {"size": "8 porcí", "price": "700 Kč"},
      {"size": "12 porcí", "price": "900 Kč"},
      {"size": "18 porcí", "price": "1400 Kč"}
    ]
  },
  "raffaello": {
    "name": "Raffaello dort",
    "description": "Jemný dort inspirovaný známými cukrovinkami. Složení: kokos, bílá čokoláda, smetana, mandle, piškoty, kokosové mléko.",
    "image": "img/dorty/raffaello.jpg",
    "prices": [
      {"size": "8 porcí", "price": "780 Kč"},
      {"size": "12 porcí", "price": "980 Kč"},
      {"size": "18 porcí", "price": "1480 Kč"}
    ]
  },
  "cupcakes": {
    "name": "Cupcakes",
    "description": "Sada 12-ti různých cupcakes s polevou a ozdobami. Složení: vanilkové/čokoládové těsto, máslový krém, jedlé ozdoby, čerstvé ovoce, čokoláda.",
    "image": "img/dorty/cupcakes.jpg",
    "prices": [
      {"size": "12 ks", "price": "990 Kč"},
      {"size": "24 ks", "price": "1800 Kč"},
      {"size": "36 ks", "price": "2600 Kč"}
    ]
  }
};

// Остальной код обработки остается без изменений
function loadDortInfo() {
  const params = new URLSearchParams(window.location.search);
  const dortId = params.get('dort');
  
  if (!dortyData[dortId]) {
    window.location.href = 'dorty.html';
    return;
  }

  const dort = dortyData[dortId];
  
  document.title = `PROSTOR - ${dort.name}`;
  document.getElementById('dort-name').textContent = dort.name;
  document.getElementById('dort-description-text').textContent = dort.description;
  document.getElementById('dort-image').src = dort.image;
  document.getElementById('dort-image').alt = dort.name;

  // Заполнение вариантов цен
  const priceContainer = document.getElementById('price-options');
  priceContainer.innerHTML = '';
  
  dort.prices.forEach((item, index) => {
    const option = document.createElement('div');
    option.className = 'price-option';
    option.innerHTML = `
      <strong>${item.size}</strong>
      <div>${item.price}</div>
    `;
    option.addEventListener('click', function() {
      document.querySelectorAll('.price-option').forEach(el => el.classList.remove('selected'));
      this.classList.add('selected');
    });
    if (index === 0) option.classList.add('selected');
    priceContainer.appendChild(option);
  });

  // Настройка даты
  const dateInput = document.getElementById('date');
  const today = new Date();
  today.setDate(today.getDate() + 2);
  dateInput.min = today.toISOString().split('T')[0];
}

window.addEventListener('load', loadDortInfo);
window.addEventListener('popstate', loadDortInfo);

// Обработка кнопки заказа
document.querySelector('.order-button')?.addEventListener('click', function() {
  const selectedOption = document.querySelector('.price-option.selected');
  const date = document.getElementById('date').value;
  const phone = document.getElementById('phone').value;
  
  if (!selectedOption || !date || !phone) {
    alert('Prosím vyplňte všechny údaje');
    return;
  }
  
  alert(`Děkujeme za objednávku! Brzy vás kontaktujeme.`);
});