const taskFieldPlacement = document.querySelector('.task__fieldPlacement');
const btnAddTask = document.querySelector('.addTask__btnAdd');

// Данные для создания изначальных задач
const data = [
	{
		id: 1,
		text: 'Задача 1'
	},
	{
		id: 2,
		text: 'Задача 2'
	}
];

// Создание начальных полей с 2 задачами
function loadOriginTask() {
	data.forEach(stroke => {
		taskFieldPlacement.insertAdjacentHTML('beforeend', `
			<div id="${stroke.id}" class="task__wrupperListTask">
				<div id="${stroke.id}" class="task__containerText">
					<input class="task__checkbox" type="checkbox">
					<div id="${stroke.id}" class="task__text">${stroke.text}</div>
				</div>
				<div class="task__btnContainer">
					<button id="${stroke.id}" class="task__btnEditing"></button>
					<button id="${stroke.id}" class="task__btnSave"></button>
					<button id="${stroke.id}" class="task__btnDelete"></button>
				</div>
			</div>
		`);
	});
}


loadOriginTask();

// Функция редактирования задач
function updateStroke() {
	const allBtn = document.querySelectorAll('.task__btnEditing');
	const container = document.querySelectorAll('.task__containerText');
	allBtn.forEach(elem => {
		elem.addEventListener('click', (event) => {
			let elemTarget = event.target;
			let getIDElem = elemTarget.getAttribute('id');
			const text = document.querySelectorAll('.task__text');
			text.forEach(el => {
				if (el.getAttribute('id') == getIDElem) {
					let textElem = el.textContent;
					let checkboxEl = el.previousElementSibling;
					checkboxEl.checked = false; // убираем флажок с checkbox-a
					checkboxEl.disabled = true; // делаем checkbox не активным
					el.remove();
					container.forEach(cont => {
						if (cont.getAttribute('id') == getIDElem) {
							cont.insertAdjacentHTML('beforeend', `
								<input id="${getIDElem}" class="editingTask" value="${textElem}">
							`)

						}
					})
					let nextButton = elemTarget.nextElementSibling;
					nextButton.style.display = 'block';
					elemTarget.style.display = 'none';
				}
			})
		})
	})
}

// Сохранение редактированных данных
function saveStroke() {
	const allBtnSave = document.querySelectorAll('.task__btnSave');
	const container = document.querySelectorAll('.task__containerText');
	allBtnSave.forEach(elem => {
		elem.addEventListener('click', (event) => {
			let elemTarget = event.target;
			let getIDElem = elemTarget.getAttribute('id');
			const input = document.querySelectorAll('.editingTask');
			input.forEach(el => {
				if (el.getAttribute('id') == getIDElem) {
					let textElem = el.value;
					if (textElem != '') {
						let activeChecbox = el.previousElementSibling;
						activeChecbox.disabled = false; // включаем обратно checkbox
						el.remove();
						container.forEach(cont => {
							if (cont.getAttribute('id') == getIDElem) {
								cont.insertAdjacentHTML('beforeend', `
									<div id="${getIDElem}" class="task__text">${textElem}</div>
								`)
							}
						})
						let previousButton = elemTarget.previousElementSibling;
						previousButton.style.display = 'block';
						elemTarget.style.display = 'none';
					} else {
						el.setAttribute('placeholder', 'Заполните поле...');
					}
				}
			})
		})
	})
}

// Удаление задачи
function deleteStroke() {
	const allBtnDel = document.querySelectorAll('.task__btnDelete');
	const wrupper = document.querySelectorAll('.task__wrupperListTask');
	allBtnDel.forEach(elem => {
		elem.addEventListener('click', (event) => {
			let elemTarget = event.target;
			let getIDElem = elemTarget.getAttribute('id');
			wrupper.forEach(wrup => {
				if (wrup.getAttribute('id') == getIDElem) {
					wrup.remove();
				}
			})
		})
	})
}

// Назначение событий при загрузке страницы
window.addEventListener('load', () => {
	updateStroke();
	saveStroke();
	deleteStroke();
});

// Создание новой задачи
btnAddTask.addEventListener('click', () => {
	const enterNewTask = document.querySelector('.addTask__enterText');
	let enterNewTaskVal = enterNewTask.value;
	if (enterNewTaskVal) {
		let uniqueID = Date.now();
		taskFieldPlacement.insertAdjacentHTML('beforeend', `
			<div id="${uniqueID}" class="task__wrupperListTask">
				<div id="${uniqueID}" class="task__containerText">
					<input class="task__checkbox" type="checkbox">
					<div id="${uniqueID}" class="task__text">${enterNewTaskVal}</div>
				</div>
				<div class="task__btnContainer">
					<button id="${uniqueID}" class="task__btnEditing"></button>
					<button id="${uniqueID}" class="task__btnSave"></button>
					<button id="${uniqueID}" class="task__btnDelete"></button>
				</div>
			</div>
		`)
	}
	updateStroke();
	saveStroke();
	deleteStroke();
	enterNewTask.value = " "; // Очистка поля ввода новой задачи
})

// Назначает событие на checkbox для зачеркивания задачи
function checkboxLineThrough(targetElement) {
		let checkText = targetElement.nextElementSibling;
		if (checkText.style.textDecoration != 'line-through') {
			checkText.style.textDecoration = 'line-through';
		} else {
			checkText.style.textDecoration = 'none'
		}
}

// Подчеркивает важную задачу
function borderBottomImportantTask(targetElement) {
	if (targetElement.style.borderBottom == '1px solid red') {
		targetElement.style.border = 'none';
	} else {
		targetElement.style.borderBottom = '1px solid red';
	}
}

// Устанавливаем на контейнер с задачами события с помощью метода - делигирование событий
taskFieldPlacement.onclick = (e) => {
	let targetElement = e.target;
	if (targetElement.className == 'task__checkbox') {
		checkboxLineThrough(targetElement);
	} else if (targetElement.className == 'task__text') {
		borderBottomImportantTask(targetElement);
	}
}