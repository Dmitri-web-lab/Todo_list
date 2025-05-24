// Объявление типов элементов DOM заранее
type HTMLElementWithId = HTMLDivElement & { id?: string };
type inputElement = HTMLInputElement & { checked: boolean; disabled: boolean };

const btnAddTask = document.querySelector<HTMLElement>('.addTask__btnAdd');

interface startData {
	id: number,
	text: string
}

const startTasks: startData[] = [
	{
		id: 1,
		text: 'Задача 1'
	},
	{
		id: 2,
		text: 'Задача 2'
	}
];

class TaskManagement {

	startTasks: startData[]

	constructor(startTasks: startData[]) {
		this.startTasks = startTasks;
		this.startTasks.forEach(stroke => {
			document.querySelector('.task__fieldPlacement')?.insertAdjacentHTML('beforeend', `
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

	updateStroke(): void {
		const allBtn = document.querySelectorAll<HTMLElement>('.task__btnEditing');
		const container = document.querySelectorAll<HTMLElement>('.task__containerText');
		allBtn.forEach(elem => {
			elem.addEventListener('click', (event) => {
				let elemTarget = event.target as HTMLElementWithId;
				let getIDElem = elemTarget.id;
				const textElements = document.querySelectorAll<HTMLElement>('.task__text');
				textElements.forEach(el => {
					if (el.id === getIDElem) {
						let textElem = el.textContent || '';
						let checkboxEl = el.previousElementSibling as inputElement | null;
						if (checkboxEl !== null && checkboxEl instanceof HTMLInputElement) {
						checkboxEl.checked = false; // убираем флажок с checkbox-a
						checkboxEl.disabled = true; // делаем checkbox не активным
					}
						el.remove();
						container.forEach(cont => {
							if (cont.id === getIDElem) {
								cont.insertAdjacentHTML('beforeend', `
									<input id="${getIDElem}" class="editingTask" value="${textElem}">
								`)
	
							}
						})
						let nextButton = elemTarget.nextElementSibling as HTMLElement | null;
						if (nextButton !== null) {
						nextButton.style.display = 'block';
						elemTarget.style.display = 'none';
					}
					}
				})
			})
		})
	}

	saveStroke(): void {
		const allBtnSave: NodeListOf<HTMLElement> = document.querySelectorAll('.task__btnSave');
		const container: NodeListOf<HTMLElementWithId> = document.querySelectorAll('.task__containerText');
		allBtnSave.forEach((elem: HTMLElement) => {
			elem.addEventListener('click', (event: MouseEvent) => {
				let elemTarget = event.target as HTMLElement;
				let getIDElem = elemTarget.id || '';
				const input: NodeListOf<HTMLInputElement> = document.querySelectorAll('.editingTask');
				input.forEach((el: HTMLInputElement) => {
					if (el.id === getIDElem && el.value.trim().length > 0) {
						let textElem = el.value;
					
					//	if (textElem != '') {
							let activeChecbox = el.previousElementSibling as HTMLInputElement | null;
							if (activeChecbox) {
							activeChecbox.disabled = false; // включаем обратно checkbox
						}
							el.remove();
							container.forEach((cont: HTMLElementWithId) => {
								if (cont.id === getIDElem) {
									cont.insertAdjacentHTML('beforeend', `
										<div id="${getIDElem}" class="task__text">${textElem}</div>
									`)
								}
							})
							let previousButton = elemTarget.previousElementSibling as HTMLElement | null;
							if (previousButton) {
							previousButton.style.display = 'block';
							elemTarget.style.display = 'none';
						}
						} else if (!el.value.length) {
							el.setAttribute('placeholder', 'Заполните поле...');
						}
					
				})
			})
		})
	}

}

class AuxiliaryFunctions extends TaskManagement {

}

let taskLoadPage = new TaskManagement(startTasks)