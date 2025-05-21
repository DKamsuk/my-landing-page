document.addEventListener('DOMContentLoaded', function() {
  // Загружаем занятые столы из localStorage
  document.querySelectorAll('.table').forEach(table => {
    const tableNumber = table.getAttribute('data-number');
    if (localStorage.getItem(`table-${tableNumber}-occupied`)) {
      table.classList.add('occupied');
    }
  });

  const tables = document.querySelectorAll('.table:not(.occupied)');
  const tableInput = document.getElementById('table');
  const guestsSelect = document.getElementById('guests');
  const reserveBtn = document.querySelector('.reserve-btn');
  const bookingForm = document.getElementById('booking-form');
  let selectedTable = null;
  
  // Выбор стола
  tables.forEach(table => {
    table.addEventListener('click', function() {
      if (this.classList.contains('occupied')) return;
      
      // Снимаем выделение с предыдущего стола
      if (selectedTable) {
        selectedTable.classList.remove('selected');
      }
      
      // Выделяем новый стол
      this.classList.add('selected');
      selectedTable = this;
      
      // Заполняем поле с выбранным столом
      tableInput.value = `Stůl ${this.getAttribute('data-number')} (${this.getAttribute('data-seats')} míst)`;
      
      // Проверяем соответствие количества гостей и мест за столом
      checkGuestsCount();
      
      // Активируем кнопку, если все поля заполнены
      updateReserveButton();
    });
  });
  
  // Проверка соответствия количества гостей и мест за столом
  function checkGuestsCount() {
    if (!selectedTable || !guestsSelect.value) return;
    
    const seats = parseInt(selectedTable.getAttribute('data-seats'));
    const guests = parseInt(guestsSelect.value);
    
    if (guests > seats) {
      alert(`Tento stůl je pouze pro ${seats} osob. Prosím, vyberte menší počet hostů nebo větší stůl.`);
      guestsSelect.value = '';
      updateReserveButton();
    }
  }
  
  // Проверка заполненности формы
  function updateReserveButton() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = guestsSelect.value;
    const phone = document.getElementById('phone').value;
    
    if (date && time && guests && phone && selectedTable) {
      reserveBtn.disabled = false;
    } else {
      reserveBtn.disabled = true;
    }
  }
  
  // Слушатели изменений полей формы
  document.getElementById('date').addEventListener('change', updateReserveButton);
  document.getElementById('time').addEventListener('change', updateReserveButton);
  guestsSelect.addEventListener('change', function() {
    checkGuestsCount();
    updateReserveButton();
  });
  document.getElementById('phone').addEventListener('input', updateReserveButton);
  
  // Обработка отправки формы
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
      date: this.date.value,
      time: this.time.value,
      guests: this.guests.value,
      table: this.table.value,
      phone: this.phone.value
    };
    
    // Здесь можно добавить AJAX-запрос для отправки данных на сервер
    console.log('Form data:', formData);
    
    // Показываем сообщение об успехе
    showSuccessMessage();
    
    // Сброс формы
    this.reset();
    if (selectedTable) {
      const tableNumber = selectedTable.getAttribute('data-number');
      selectedTable.classList.remove('selected');
      // Добавляем класс occupied и сохраняем в localStorage
      selectedTable.classList.add('occupied');
      localStorage.setItem(`table-${tableNumber}-occupied`, 'true');
      selectedTable = null;
    }
    tableInput.value = '';
    reserveBtn.disabled = true;
  });
  
  // Показать сообщение об успешном бронировании
  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <h3>Rezervace byla úspěšně odeslána!</h3>
      <p>Děkujeme za vaši rezervaci. Brzy vás budeme kontaktovat pro potvrzení.</p>
      <button class="close-message">OK</button>
    `;
    
    document.body.appendChild(successDiv);
    
    // Закрытие сообщения
    document.querySelector('.close-message').addEventListener('click', function() {
      document.body.removeChild(successDiv);
    });
  }
  
  // Установка минимальной даты (сегодня) и времени
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  document.getElementById('date').setAttribute('min', today);
  
  // Установка текущего времени + 1 час (округление до ближайших 30 минут)
  const hours = now.getHours() + 1;
  const minutes = now.getMinutes() < 30 ? '30' : '00';
  document.getElementById('time').value = `${hours.toString().padStart(2, '0')}:${minutes}`;
});


// document.addEventListener('DOMContentLoaded', function() {
//   const tables = document.querySelectorAll('.table:not(.occupied)');
//   const tableInput = document.getElementById('table');
//   const guestsSelect = document.getElementById('guests');
//   const reserveBtn = document.querySelector('.reserve-btn');
//   const bookingForm = document.getElementById('booking-form');
//   const modal = document.getElementById('table-modal');
//   const closeModal = document.querySelector('.close-modal');
//   const confirmSelection = document.getElementById('confirm-selection');
//   const modalTableNumber = document.getElementById('modal-table-number');
//   const modalTableImg = document.getElementById('modal-table-img');
//   const modalTableInfo = document.getElementById('modal-table-info');
  
//   let selectedTable = null;
//   let tempSelectedTable = null;
  
//   tables.forEach(table => {
//     table.addEventListener('click', function() {
//       if (this.classList.contains('occupied')) return;
      
//       tempSelectedTable = this;
      
//       modalTableNumber.textContent = this.getAttribute('data-number');
//       modalTableInfo.textContent = this.getAttribute('data-info');
//       modalTableImg.src = this.getAttribute('data-img');
//       modalTableImg.alt = `Stůl ${this.getAttribute('data-number')}`;

//       modal.style.display = "block";
//     });
//   });

//   confirmSelection.addEventListener('click', function() {
//     if (selectedTable) {
//       selectedTable.classList.remove('selected');
//     }

//     tempSelectedTable.classList.add('selected');
//     selectedTable = tempSelectedTable;

//     tableInput.value = `Stůl ${selectedTable.getAttribute('data-number')} (${selectedTable.getAttribute('data-seats')} míst)`;

//     checkGuestsCount();

//     updateReserveButton();

//     modal.style.display = "none";
//   });

//   closeModal.addEventListener('click', function() {
//     modal.style.display = "none";
//   });

//   window.addEventListener('click', function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   });

//   function checkGuestsCount() {
//     if (!selectedTable || !guestsSelect.value) return;
    
//     const seats = parseInt(selectedTable.getAttribute('data-seats'));
//     const guests = parseInt(guestsSelect.value);
    
//     if (guests > seats) {
//       alert(`Tento stůl je pouze pro ${seats} osob. Prosím, vyberte menší počet hostů nebo větší stůl.`);
//       guestsSelect.value = '';
//       updateReserveButton();
//     }
//   }

//   function updateReserveButton() {
//     const date = document.getElementById('date').value;
//     const time = document.getElementById('time').value;
//     const guests = guestsSelect.value;
//     const phone = document.getElementById('phone').value;
    
//     if (date && time && guests && phone && selectedTable) {
//       reserveBtn.disabled = false;
//     } else {
//       reserveBtn.disabled = true;
//     }
//   }

//   document.getElementById('date').addEventListener('change', updateReserveButton);
//   document.getElementById('time').addEventListener('change', updateReserveButton);
//   guestsSelect.addEventListener('change', function() {
//     checkGuestsCount();
//     updateReserveButton();
//   });
//   document.getElementById('phone').addEventListener('input', updateReserveButton);

//   bookingForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     const formData = {
//       date: this.date.value,
//       time: this.time.value,
//       guests: this.guests.value,
//       table: this.table.value,
//       phone: this.phone.value
//     };
    
//     console.log('Form data:', formData);
    
//     showSuccessMessage();
    
//     this.reset();
//     if (selectedTable) {
//       selectedTable.classList.remove('selected');
//       selectedTable = null;
//     }
//     tableInput.value = '';
//     reserveBtn.disabled = true;
//   });
  
//   function showSuccessMessage() {
//     const successDiv = document.createElement('div');
//     successDiv.className = 'success-message';
//     successDiv.innerHTML = `
//       <h3>Rezervace byla úspěšně odeslána!</h3>
//       <p>Děkujeme za vaši rezervaci. Brzy vás budeme kontaktovat pro potvrzení.</p>
//       <button class="close-message">OK</button>
//     `;
    
//     document.body.appendChild(successDiv);
    
//     document.querySelector('.close-message').addEventListener('click', function() {
//       document.body.removeChild(successDiv);
//     });
//   }
  
//   const now = new Date();
//   const today = now.toISOString().split('T')[0];
//   document.getElementById('date').setAttribute('min', today);

//   const hours = now.getHours() + 1;
//   const minutes = now.getMinutes() < 30 ? '30' : '00';
//   document.getElementById('time').value = `${hours.toString().padStart(2, '0')}:${minutes}`;
// });