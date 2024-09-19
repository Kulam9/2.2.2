import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setStaps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleNext = () => {
		setActiveIndex((prevState) => {
			return prevState + 1;
		});
	};

	const handleBack = () => {
		if (activeIndex > 0) {
			setActiveIndex((prevState) => {
				return prevState - 1;
			});
		}
	};

	const handleReset = () => {
		setActiveIndex(0);
	};

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content};
						{/* Контент соответственный шагу. Сейчас активен шаг 3 */}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{steps.map((step, index) => {
							return (
								<li
									className={
										styles['steps-item'] +
										(activeIndex === index
											? ` ${styles.active}`
											: '') +
										(index < activeIndex ? ` ${styles.done}` : '')
									}
								>
									{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}

									<button className={styles['steps-item-button']}>
										{index + 1}
									</button>
									{/* При клике на кнопку установка выбранного шага в качестве активного */}
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={handleBack}>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={() => (isLastStep ? handleReset() : handleNext())}
						>
							{isLastStep ? 'Начать с начала' : 'Далее'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
