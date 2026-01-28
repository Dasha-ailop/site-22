// script.js - РАБОЧАЯ ВЕРСИЯ БЕЗ API
const USE_LOCAL_STORAGE = true; // Всегда используем localStorage

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Система записи на консультации загружена');
    initApp();
});

// Основная функция инициализации
function initApp() {
    // Инициализация формы записи
    if (document.getElementById('bookingForm')) {
        initBookingForm();
    }
    
    // Инициализация админ-панели
    if (document.getElementById('adminLoginForm') || document.getElementById('adminPanel')) {
        initAdminPanel();
    }
    
    // Инициализация обработчиков модальных окон
    initModalHandlers();
}

// Функция для инициализации формы записи
function initBookingForm() {
    console.log('Инициализация формы записи...');
    
    // Загружаем список учителей
    loadTeachers();
    
    // Загружаем список классов
    loadClassOptions();
    
    // Инициализируем календарь
    initSaturdayCalendar();
    
    // Инициализируем слоты времени
    updateTimeSlots();
    
    // Обработчик отправки формы
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Обработчик кнопки сброса
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }
    
    // Обработчик изменения выбора учителя
    const teacherSelect = document.getElementById('teacher');
    if (teacherSelect) {
        teacherSelect.addEventListener('change', function() {
            updateTimeSlots();
        });
    }
    
    // Добавляем маску для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhone);
    }
}

// Загрузка учителей
function loadTeachers() {
    const teacherSelect = document.getElementById('teacher');
    if (!teacherSelect) return;
    
    const teachers = [
        {"name": "Акимова В. А.", "room": "1040"},
        {"name": "Александрова В. А.", "room": "3016"},
        {"name": "Антипина С. В.", "room": "3033"},
        {"name": "Антипова Е. О.", "room": ""},
        {"name": "Афанасьева О. В.", "room": "4015"},
        {"name": "Бабкина Е. А.", "room": "3035"},
        {"name": "Балшикая Ю. А.", "room": "1014"},
        {"name": "Балтачева Д. А.", "room": "1080"},
        {"name": "Бондаренко И. М.", "room": "2010"},
        {"name": "Бугушева З. М.", "room": "4022"},
        {"name": "Вагина А. О.", "room": "2007"},
        {"name": "Вакушина Е. В.", "room": "2012"},
        {"name": "Гапанович Е. А.", "room": "4019"},
        {"name": "Голдырева П. И.", "room": "3032"},
        {"name": "Горбачева И. А.", "room": "1085"},
        {"name": "Груздева Н. В.", "room": "4010"},
        {"name": "Гусельникова И. В.", "room": "1084"},
        {"name": "Дубичник Л. М.", "room": "4021"},
        {"name": "Егорова М. И.", "room": "1083"},
        {"name": "Загорская Л. В.", "room": "3034"},
        {"name": "Закалюкина Е. А.", "room": "3014"},
        {"name": "Засыпкина А. В.", "room": "2017"},
        {"name": "Зефирова Е. В.", "room": "1015"},
        {"name": "Зуева Ю. Н.", "room": ""},
        {"name": "Зырянова И. В.", "room": "3054"},
        {"name": "Игнатова Е. Ю.", "room": "2009"},
        {"name": "Ивачёв Е. А.", "room": "3011"},
        {"name": "Ивачёва М. О.", "room": ""},
        {"name": "Ищенко К. А.", "room": "3035"},
        {"name": "Казакова В. В.", "room": "4010"},
        {"name": "Калугина А. В.", "room": "4019"},
        {"name": "Кизирева В. С.", "room": ""},
        {"name": "Кизерова В. С.", "room": ""},
        {"name": "Колодчевская Е. А.", "room": "3013"},
        {"name": "Колпылова П. И.", "room": "2007"},
        {"name": "Кондрашова З. В.", "room": "5012"},
        {"name": "Конищева А. И.", "room": ""},
        {"name": "Кононец Д. С.", "room": "3009"},
        {"name": "Красулина Т. В.", "room": "2018"},
        {"name": "Кропотова М. Ю.", "room": "1081"},
        {"name": "Крутикова А. П.", "room": "4020"},
        {"name": "Кузнецова К. М.", "room": "5013"},
        {"name": "Кунщикова Н. Г.", "room": "3032"},
        {"name": "Липина Ю. С.", "room": "3017"},
        {"name": "Макарова Д. Е.", "room": ""},
        {"name": "Макеева А. О.", "room": "1015"},
        {"name": "Макушина А. В.", "room": ""},
        {"name": "Малышева О. Д.", "room": "3036"},
        {"name": "Малышева Т. В.", "room": "3006"},
        {"name": "Марарова М. С.", "room": ""},
        {"name": "Медведева К. Д.", "room": "2006"},
        {"name": "Мордань Е. В.", "room": "4013"},
        {"name": "Московская Д. Д.", "room": "5014"},
        {"name": "Москалева А. В.", "room": "2083"},
        {"name": "Мусихина И. Д.", "room": "2019"},
        {"name": "Овчинников Д. И.", "room": "2083"},
        {"name": "Опарина А. Ю.", "room": "2082"},
        {"name": "Панченко М. Н.", "room": "2011"},
        {"name": "Павлова К. А.", "room": "2020"},
        {"name": "Пелевина Е. А.", "room": "4006"},
        {"name": "Плетенёва С. А.", "room": "4023"},
        {"name": "Подлисецкая Д. В.", "room": "2015"},
        {"name": "Попович Е. А.", "room": "1017"},
        {"name": "Россов А. В.", "room": "1044"},
        {"name": "Светлакова А. А.", "room": "2065"},
        {"name": "Семенова О. А.", "room": "1016"},
        {"name": "Семянинкова И. Н.", "room": "2015"},
        {"name": "Смирнова И. Р.", "room": "4012"},
        {"name": "Смирнова И. А.", "room": "1082"},
        {"name": "Соловьева Д. О.", "room": "2008"},
        {"name": "Сысолятина М. В.", "room": "3032"},
        {"name": "Толстикова А. С.", "room": "2006"},
        {"name": "Торопова Н. А.", "room": "5014"},
        {"name": "Усольцева А. Д.", "room": "3033"},
        {"name": "Филиппова В. Д.", "room": "3017"},
        {"name": "Фоминова В. А.", "room": "5005"},
        {"name": "Халивина К. В.", "room": "3032"},
        {"name": "Хлопина А. М.", "room": ""},
        {"name": "Цее Л. Ю.", "room": "4018"},
        {"name": "Червов Д. В.", "room": "2013"},
        {"name": "Чиркова В. В.", "room": "3037"},
        {"name": "Чукашина А. В.", "room": "1080"},
        {"name": "Шаблюк О. К.", "room": "2008"},
        {"name": "Шамордина М. С.", "room": "4016"},
        {"name": "Шералиева Б. Х.", "room": "3015"},
        {"name": "Шербакова А. М.", "room": "5007"},
        {"name": "Шипулина Н. Л.", "room": "2083"},
        {"name": "Штуркина Н. С.", "room": "3016"},
        {"name": "Юрина Н. Е.", "room": "1085"},
        {"name": "Ярочкина А. В.", "room": "5005"},
        {"name": "Ярунина О. Ф.", "room": "2016"},
        {"name": "Яхнова Я. Д.", "room": "2065"}
    ];
    
    teacherSelect.innerHTML = '<option value="">-- Выберите учителя --</option>';
    
    // Сортируем по фамилии
    teachers.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    teachers.forEach(teacher => {
        const option = document.createElement('option');
        const roomInfo = teacher.room ? ` (каб. ${teacher.room})` : '';
        option.value = `${teacher.name}|${teacher.room || ''}`;
        option.textContent = teacher.name + roomInfo;
        teacherSelect.appendChild(option);
    });
}

// Загрузка классов
function loadClassOptions() {
    const classSelect = document.getElementById('studentClass');
    if (!classSelect) return;
    
    const classes = [
        '1а', '1б', '1в', '1г', '1д', '1е', '1ж', '1з', '1и', '1к', '1л', '1м', '1н', '1р',
        '2а', '2б', '2в', '2г', '2д', '2е', '2ж', '2з', '2и', '2к', '2л', '2м', '2н', '2о',
        '3а', '3б', '3в', '3г', '3д',
        '4а', '4б', '4в', '4г', '4д',
        '5а', '5б', '5в', '5г', '5д', '5е', '5и',
        '6а', '6б', '6в', '6г', '6д', '6е',
        '7а', '7б', '7в', '7г', '7д',
        '8а', '8б', '8в', '8г', '8и',
        '9а', '9б', '9в',
        '10а', '10б Ест-нау', '10б Соц-эко',
        '11а', '11б', '11в'
    ];
    
    classSelect.innerHTML = '<option value="">-- Выберите класс --</option>';
    
    classes.forEach(className => {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        classSelect.appendChild(option);
    });
}

// Инициализация календаря
function initSaturdayCalendar() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;
    
    const nextSaturday = getNextSaturday();
    
    const calendar = flatpickr(dateInput, {
        locale: "ru",
        dateFormat: "Y-m-d",
        minDate: nextSaturday,
        maxDate: new Date().fp_incr(90),
        disable: [function(date) {
            return date.getDay() !== 6;
        }],
        onChange: function() {
            updateTimeSlots();
        },
        onReady: function(instance) {
            instance.setDate(nextSaturday, false);
        }
    });
    
    window.bookingCalendar = calendar;
}

// Получение ближайшей субботы
function getNextSaturday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = dayOfWeek === 6 ? 0 : (6 - dayOfWeek + 7) % 7;
    
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);
    nextSaturday.setHours(0, 0, 0, 0);
    
    return nextSaturday;
}

// Обновление слотов времени
function updateTimeSlots() {
    const timeSlotsContainer = document.querySelector('.time-slots');
    const selectedTimeInput = document.getElementById('selectedTime');
    const teacherSelect = document.getElementById('teacher');
    const dateInput = document.getElementById('date');
    
    if (!timeSlotsContainer || !teacherSelect || !dateInput) return;
    
    const selectedTeacher = teacherSelect.value;
    const selectedDate = dateInput.value;
    
    if (!selectedTeacher || !selectedDate) {
        createAllTimeSlots(timeSlotsContainer, selectedTimeInput, [], true);
        return;
    }
    
    // Получаем занятые слоты из localStorage
    const occupiedSlots = getOccupiedSlots(selectedTeacher, selectedDate);
    createAllTimeSlots(timeSlotsContainer, selectedTimeInput, occupiedSlots, false);
}

// Получение занятых слотов
function getOccupiedSlots(teacher, date) {
    const bookings = JSON.parse(localStorage.getItem('teacherBookings')) || [];
    return bookings
        .filter(b => b.teacher === teacher && b.date === date && b.status !== 'отменена')
        .map(b => b.selectedTime);
}

// Создание слотов времени
function createAllTimeSlots(container, selectedTimeInput, occupiedSlots, disabledAll = false) {
    const timeInfo = container.querySelector('.time-info');
    container.innerHTML = '';
    if (timeInfo) {
        container.appendChild(timeInfo);
    }
    
    const startTime = { hour: 11, minute: 30 };
    const endTime = { hour: 13, minute: 0 };
    
    let currentHour = startTime.hour;
    let currentMinute = startTime.minute;
    let hasAvailableSlots = false;
    
    while (currentHour < endTime.hour || (currentHour === endTime.hour && currentMinute < endTime.minute)) {
        const startHourStr = currentHour.toString().padStart(2, '0');
        const startMinuteStr = currentMinute.toString().padStart(2, '0');
        
        let endHour = currentHour;
        let endMinute = currentMinute + 20;
        
        if (endMinute >= 60) {
            endHour += 1;
            endMinute -= 60;
        }
        
        if (endHour > endTime.hour || (endHour === endTime.hour && endMinute > endTime.minute)) {
            break;
        }
        
        const endHourStr = endHour.toString().padStart(2, '0');
        const endMinuteStr = endMinute.toString().padStart(2, '0');
        
        const timeSlotStr = `${startHourStr}:${startMinuteStr}-${endHourStr}:${endMinuteStr}`;
        const isOccupied = occupiedSlots.includes(timeSlotStr) || disabledAll;
        
        const timeSlot = document.createElement('div');
        timeSlot.className = `time-slot ${isOccupied ? 'occupied' : 'available'}`;
        timeSlot.setAttribute('data-time', timeSlotStr);
        timeSlot.textContent = `${startHourStr}:${startMinuteStr} - ${endHourStr}:${endMinuteStr}`;
        
        if (!isOccupied) {
            timeSlot.title = 'Доступно для записи';
            hasAvailableSlots = true;
            
            timeSlot.addEventListener('click', function() {
                document.querySelectorAll('.time-slot').forEach(s => {
                    s.classList.remove('selected', 'active');
                });
                
                this.classList.add('selected', 'active');
                
                if (selectedTimeInput) {
                    selectedTimeInput.value = this.getAttribute('data-time');
                }
            });
        } else {
            timeSlot.title = 'Время занято';
            timeSlot.style.cursor = 'not-allowed';
        }
        
        container.appendChild(timeSlot);
        
        currentMinute += 20;
        if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute -= 60;
        }
    }
    
    if (!disabledAll && hasAvailableSlots) {
        const firstAvailableSlot = container.querySelector('.time-slot.available');
        if (firstAvailableSlot && selectedTimeInput) {
            firstAvailableSlot.classList.add('selected', 'active');
            selectedTimeInput.value = firstAvailableSlot.getAttribute('data-time');
        }
    }
}

// Инициализация модальных окон
function initModalHandlers() {
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
}

// Обработчик отправки формы записи
function handleBookingSubmit(event) {
    event.preventDefault();
    
    if (!validateBookingForm()) return;
    
    const formData = new FormData(event.target);
    const teacherValue = formData.get('teacher');
    const teacherParts = teacherValue.split('|');
    
    const bookingData = {
        id: Date.now(),
        teacher: teacherValue,
        teacherName: teacherParts[0],
        teacherRoom: teacherParts[1] || '',
        date: formData.get('date'),
        selectedTime: formData.get('selectedTime'),
        parentName: formData.get('parentName'),
        studentName: formData.get('studentName'),
        studentClass: formData.get('studentClass'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        comment: formData.get('comment') || '',
        status: 'новая',
        createdAt: new Date().toISOString()
    };
    
    console.log('Создана запись:', bookingData);
    
    // Сохраняем в localStorage
    saveBookingToLocalStorage(bookingData);
    
    // Показываем подтверждение
    showBookingDetails(bookingData);
    
    // Обновляем слоты времени
    updateTimeSlots();
    
    // Уведомление
    showNotification('✅ Запись успешно сохранена!', 'success');
    
    // Очищаем форму через 3 секунды
    setTimeout(() => {
        closeModal();
        event.target.reset();
        if (window.bookingCalendar) {
            const nextSaturday = getNextSaturday();
            window.bookingCalendar.setDate(nextSaturday, false);
        }
        updateTimeSlots();
    }, 3000);
}

// Валидация формы
function validateBookingForm() {
    const teacherSelect = document.getElementById('teacher');
    if (!teacherSelect || teacherSelect.value === '') {
        showNotification('Пожалуйста, выберите учителя.', 'error');
        teacherSelect.focus();
        return false;
    }
    
    const dateInput = document.getElementById('date');
    if (!dateInput || !dateInput.value) {
        showNotification('Пожалуйста, выберите субботу.', 'error');
        dateInput.focus();
        return false;
    }
    
    const selectedDate = new Date(dateInput.value);
    if (selectedDate.getDay() !== 6) {
        showNotification('Запись возможна только по субботам!', 'error');
        const nextSaturday = getNextSaturday();
        if (window.bookingCalendar) {
            window.bookingCalendar.setDate(nextSaturday, false);
        }
        return false;
    }
    
    const selectedTimeInput = document.getElementById('selectedTime');
    if (!selectedTimeInput || !selectedTimeInput.value) {
        showNotification('Пожалуйста, выберите время консультации.', 'error');
        return false;
    }
    
    const parentNameInput = document.getElementById('parentName');
    if (!parentNameInput.value.trim()) {
        showNotification('Пожалуйста, введите ФИО родителя.', 'error');
        parentNameInput.focus();
        return false;
    }
    
    const studentNameInput = document.getElementById('studentName');
    if (!studentNameInput.value.trim()) {
        showNotification('Пожалуйста, введите ФИО ученика.', 'error');
        studentNameInput.focus();
        return false;
    }
    
    const studentClassSelect = document.getElementById('studentClass');
    if (!studentClassSelect.value) {
        showNotification('Пожалуйста, выберите класс ученика.', 'error');
        studentClassSelect.focus();
        return false;
    }
    
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        showNotification('Пожалуйста, введите корректный номер телефона.', 'error');
        phoneInput.focus();
        return false;
    }
    
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showNotification('Пожалуйста, введите корректный email.', 'error');
        emailInput.focus();
        return false;
    }
    
    return true;
}

// Сохранение в localStorage
function saveBookingToLocalStorage(bookingData) {
    try {
        let bookings = JSON.parse(localStorage.getItem('teacherBookings')) || [];
        bookings.push(bookingData);
        localStorage.setItem('teacherBookings', JSON.stringify(bookings));
        console.log('Запись сохранена в localStorage. Всего записей:', bookings.length);
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
        showNotification('Ошибка сохранения записи', 'error');
    }
}

// Показать детали записи
function showBookingDetails(bookingData) {
    const modal = document.getElementById('successModal');
    const detailsContainer = document.getElementById('bookingDetails');
    
    if (modal && detailsContainer) {
        const date = new Date(bookingData.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });
        
        detailsContainer.innerHTML = `
            <div class="booking-summary">
                <p><strong>Учитель:</strong> ${bookingData.teacherName} (каб. ${bookingData.teacherRoom})</p>
                <p><strong>Дата:</strong> ${formattedDate}</p>
                <p><strong>Время:</strong> ${bookingData.selectedTime} (20 минут)</p>
                <p><strong>Родитель:</strong> ${bookingData.parentName}</p>
                <p><strong>Ученик:</strong> ${bookingData.studentName} (${bookingData.studentClass} класс)</p>
                <p><strong>Телефон:</strong> ${bookingData.phone}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                ${bookingData.comment ? `<p><strong>Комментарий:</strong> ${bookingData.comment}</p>` : ''}
                <p><strong>Номер записи:</strong> ${bookingData.id}</p>
                <div class="booking-note">
                    <p><i class="fas fa-info-circle"></i> <strong>Важно:</strong> Консультации проводятся только по субботам с 11:30 до 13:00.</p>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
    }
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Сброс формы
function resetForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.reset();
        
        if (window.bookingCalendar) {
            const nextSaturday = getNextSaturday();
            window.bookingCalendar.setDate(nextSaturday, false);
        }
        
        updateTimeSlots();
        showNotification('Форма очищена', 'info');
    }
}

// Форматирование телефона
function formatPhone(event) {
    let phone = event.target.value.replace(/\D/g, '');
    
    if (phone.length === 0) return '';
    
    let formattedPhone = '+7 ';
    
    if (phone.length > 1) {
        formattedPhone += '(' + phone.substring(1, 4);
    }
    
    if (phone.length >= 5) {
        formattedPhone += ') ' + phone.substring(4, 7);
    }
    
    if (phone.length >= 8) {
        formattedPhone += '-' + phone.substring(7, 9);
    }
    
    if (phone.length >= 10) {
        formattedPhone += '-' + phone.substring(9, 11);
    }
    
    event.target.value = formattedPhone;
}

// ============ АДМИН-ПАНЕЛЬ ============

// Инициализация админ-панели
function initAdminPanel() {
    console.log('Инициализация админ-панели...');
    
    // Проверяем, авторизован ли администратор
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (isAdmin) {
        showAdminPanel();
        setupAdminPanel();
    } else {
        showLoginForm();
    }
    
    // Обработчик формы входа
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
}

// Показать форму входа
function showLoginForm() {
    const loginSection = document.getElementById('loginSection');
    const adminPanel = document.getElementById('adminPanel');
    
    if (loginSection) {
        loginSection.style.display = 'block';
    }
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
}

// Показать админ-панель
function showAdminPanel() {
    const loginSection = document.getElementById('loginSection');
    const adminPanel = document.getElementById('adminPanel');
    
    if (loginSection) {
        loginSection.style.display = 'none';
    }
    if (adminPanel) {
        adminPanel.style.display = 'block';
    }
}

// Обработчик входа администратора
function handleAdminLogin(event) {
    event.preventDefault();
    console.log('Попытка входа в админку...');
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // ПРОСТАЯ ПРОВЕРКА - ВСЕГДА ПУСКАЕМ
    // Измените пароль здесь если нужно
    const validUsername = 'admin';
    const validPassword = 'school123'; // Можете изменить этот пароль
    
    if (username === validUsername && password === validPassword) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminToken', 'admin-token-' + Date.now());
        
        showAdminPanel();
        setupAdminPanel();
        
        showNotification('✅ Вход выполнен успешно!', 'success');
    } else {
        showNotification('❌ Неверные учетные данные', 'error');
    }
}

// Настройка админ-панели
function setupAdminPanel() {
    console.log('Настройка админ-панели...');
    
    setupFilterDates();
    loadBookings();
    
    // Обработчик выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleAdminLogout);
    }
    
    // Обработчик экспорта
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', exportAllToExcel);
    }
    
    // Обработчик экспорта отфильтрованных
    const exportFilteredBtn = document.getElementById('exportFilteredBtn');
    if (exportFilteredBtn) {
        exportFilteredBtn.addEventListener('click', exportFilteredToExcel);
    }
    
    // Обработчик фильтров
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loadBookings();
        });
        
        // Обработчик сброса фильтров
        const resetFilterBtn = document.getElementById('resetFilter');
        if (resetFilterBtn) {
            resetFilterBtn.addEventListener('click', function() {
                filterForm.reset();
                loadBookings();
            });
        }
    }
}

// Настройка дат фильтров
function setupFilterDates() {
    const filterDateInput = document.getElementById('filterDate');
    if (filterDateInput) {
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 1);
        filterDateInput.min = minDate.toISOString().split('T')[0];
        
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        filterDateInput.max = maxDate.toISOString().split('T')[0];
    }
}

// Выход из админки
function handleAdminLogout() {
    if (confirm('Вы уверены, что хотите выйти из системы?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminToken');
        showLoginForm();
        showNotification('Вы успешно вышли из системы.', 'info');
    }
}

// Загрузка записей для админки
function loadBookings() {
    const bookingsTableBody = document.getElementById('bookingsTableBody');
    const noBookingsMessage = document.getElementById('noBookingsMessage');
    
    if (!bookingsTableBody) return;
    
    // Получаем записи из localStorage
    let bookings = JSON.parse(localStorage.getItem('teacherBookings')) || [];
    
    // Применяем фильтры
    bookings = applyFilters(bookings);
    
    // Очищаем таблицу
    bookingsTableBody.innerHTML = '';
    
    // Если записей нет
    if (bookings.length === 0) {
        if (noBookingsMessage) {
            noBookingsMessage.style.display = 'block';
        }
        updateBookingsCounter(0);
        return;
    }
    
    // Скрываем сообщение
    if (noBookingsMessage) {
        noBookingsMessage.style.display = 'none';
    }
    
    // Сортируем по дате создания
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Заполняем таблицу
    bookings.forEach(booking => {
        const row = document.createElement('tr');
        
        const date = new Date(booking.date);
        const formattedDate = date.toLocaleDateString('ru-RU');
        
        const dayOfWeek = date.getDay();
        const weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        const weekday = weekdays[dayOfWeek];
        
        const createdAt = new Date(booking.createdAt);
        const formattedCreatedAt = createdAt.toLocaleDateString('ru-RU') + ' ' + 
                                  createdAt.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
        
        let statusClass = '';
        switch(booking.status) {
            case 'новая': statusClass = 'status-new'; break;
            case 'подтверждена': statusClass = 'status-confirmed'; break;
            case 'отменена': statusClass = 'status-cancelled'; break;
            case 'завершена': statusClass = 'status-completed'; break;
        }
        
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.teacherName}<br><small>Каб. ${booking.teacherRoom}</small></td>
            <td>${formattedDate}<br><small>${weekday}, ${booking.selectedTime}</small></td>
            <td>${booking.parentName}<br><small>${booking.phone}</small></td>
            <td>${booking.studentName}<br><small>${booking.studentClass} класс</small></td>
            <td>
                <select class="status-select ${statusClass}" data-id="${booking.id}">
                    <option value="новая" ${booking.status === 'новая' ? 'selected' : ''}>Новая</option>
                    <option value="подтверждена" ${booking.status === 'подтверждена' ? 'selected' : ''}>Подтверждена</option>
                    <option value="отменена" ${booking.status === 'отменена' ? 'selected' : ''}>Отменена</option>
                    <option value="завершена" ${booking.status === 'завершена' ? 'selected' : ''}>Завершена</option>
                </select>
            </td>
            <td>${formattedCreatedAt}</td>
            <td>
                <button class="btn-delete" data-id="${booking.id}" title="Удалить запись">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        bookingsTableBody.appendChild(row);
    });
    
    // Обработчики изменения статуса
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', handleStatusChange);
    });
    
    // Обработчики удаления
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', handleDeleteBooking);
    });
    
    // Обновляем счетчик
    updateBookingsCounter(bookings.length);
}

// Применение фильтров
function applyFilters(bookings) {
    const teacherFilter = document.getElementById('filterTeacher');
    const dateFilter = document.getElementById('filterDate');
    const statusFilter = document.getElementById('filterStatus');
    
    let filteredBookings = [...bookings];
    
    if (teacherFilter && teacherFilter.value) {
        const searchTerm = teacherFilter.value.toLowerCase();
        filteredBookings = filteredBookings.filter(booking => 
            booking.teacherName.toLowerCase().includes(searchTerm)
        );
    }
    
    if (dateFilter && dateFilter.value) {
        filteredBookings = filteredBookings.filter(booking => 
            booking.date === dateFilter.value
        );
    }
    
    if (statusFilter && statusFilter.value) {
        filteredBookings = filteredBookings.filter(booking => 
            booking.status === statusFilter.value
        );
    }
    
    return filteredBookings;
}

// Изменение статуса записи
function handleStatusChange(event) {
    const bookingId = parseInt(event.target.getAttribute('data-id'));
    const newStatus = event.target.value;
    
    let bookings = JSON.parse(localStorage.getItem('teacherBookings')) || [];
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = newStatus;
        localStorage.setItem('teacherBookings', JSON.stringify(bookings));
        
        event.target.className = `status-select status-${getStatusClass(newStatus)}`;
        showNotification(`Статус записи #${bookingId} изменен`, 'success');
    }
}

// Удаление записи
function handleDeleteBooking(event) {
    const bookingId = parseInt(event.currentTarget.getAttribute('data-id'));
    
    if (!confirm(`Удалить запись #${bookingId}?`)) return;
    
    let bookings = JSON.parse(localStorage.getItem('teacherBookings')) || [];
    const initialLength = bookings.length;
    
    bookings = bookings.filter(b => b.id !== bookingId);
    
    if (bookings.length < initialLength) {
        localStorage.setItem('teacherBookings', JSON.stringify(bookings));
        loadBookings();
        showNotification(`Запись #${bookingId} удалена`, 'info');
    }
}

// Получение класса статуса
function getStatusClass(status) {
    switch(status) {
        case 'новая': return 'new';
        case 'подтверждена': return 'confirmed';
        case 'отменена': return 'cancelled';
        case 'завершена': return 'completed';
        default: return '';
    }
}

// Обновление счетчика записей
function updateBookingsCounter(count) {
    const counterElement = document.getElementById('bookingsCounter');
    if (counterElement) {
        counterElement.textContent = `Найдено записей: ${count}`;
    }
}

// Экспорт в Excel (оставляем как есть)
function exportAllToExcel() {
    let bookings = JSON.parse(localStorage.getItem('teacherBookings')) || [];
    
    if (bookings.length === 0) {
        showNotification('Нет записей для экспорта', 'info');
        return;
    }
    
    exportBookingsToExcel(bookings, 'все_записи_на_консультацию');
}

function exportFilteredToExcel() {
    const bookings = window.currentFilteredBookings || [];
    
    if (bookings.length === 0) {
        showNotification('Нет записей для экспорта', 'info');
        return;
    }
    
    exportBookingsToExcel(bookings, 'отфильтрованные_записи');
}

function exportBookingsToExcel(bookings, filename) {
    try {
        const excelData = bookings.map(booking => ({
            'ID': booking.id,
            'Учитель': booking.teacherName,
            'Кабинет': booking.teacherRoom,
            'Дата': booking.date,
            'Время': booking.selectedTime,
            'Родитель': booking.parentName,
            'Телефон': booking.phone,
            'Ученик': booking.studentName,
            'Класс': booking.studentClass,
            'Email': booking.email,
            'Статус': booking.status,
            'Комментарий': booking.comment || '',
            'Создано': booking.createdAt
        }));
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Записи");
        
        const dateStr = new Date().toISOString().split('T')[0];
        XLSX.writeFile(wb, `${filename}_${dateStr}.xlsx`);
        
        showNotification('Экспорт завершен', 'success');
    } catch (error) {
        console.error('Ошибка экспорта:', error);
        showNotification('Ошибка экспорта', 'error');
    }
}

// Показать уведомление
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Инициализация демо-данных при первом запуске
function initDemoData() {
    if (!localStorage.getItem('demoDataCreated')) {
        const bookings = [
            {
                id: 1001,
                teacher: "Акимова В. А.|1040",
                teacherName: "Акимова В. А.",
                teacherRoom: "1040",
                date: new Date().toISOString().split('T')[0],
                selectedTime: "11:30-11:50",
                parentName: "Иванова Мария Сергеевна",
                studentName: "Иванов Петр",
                studentClass: "5А",
                phone: "+7 (912) 345-67-89",
                email: "ivanova@example.com",
                comment: "Обсуждение успеваемости",
                status: "подтверждена",
                createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 1002,
                teacher: "Петров А. В.|2010",
                teacherName: "Петров А. В.",
                teacherRoom: "2010",
                date: new Date().toISOString().split('T')[0],
                selectedTime: "11:50-12:10",
                parentName: "Сидоров Иван Петрович",
                studentName: "Сидорова Анна",
                studentClass: "7Б",
                phone: "+7 (923) 456-78-90",
                email: "sidorov@example.com",
                comment: "",
                status: "новая",
                createdAt: new Date().toISOString()
            }
        ];
        
        localStorage.setItem('teacherBookings', JSON.stringify(bookings));
        localStorage.setItem('demoDataCreated', 'true');
        console.log('Демо-данные созданы');
    }
}

// Добавьте вызов этой функции в initApp() если нужны демо-данные
// initDemoData();