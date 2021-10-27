/* eslint-disable no-param-reassign */
export {};

const leftColor = '#feed23';
const rightColor = '#ffffff';

const rangeElList = document.querySelectorAll('.js-range');

const pointsRange = document.querySelector(
  '.js-points-range',
) as HTMLInputElement;
const checkRange = document.querySelector(
  '.js-check-range',
) as HTMLInputElement;
const ordersRange = document.querySelector(
  '.js-orders-range',
) as HTMLInputElement;

const resultLabelEl = document.querySelector(
  '.js-calc-result',
) as HTMLSpanElement;

let result: number;

let pointsCurrentStep = 2;
let checkCurrentStep = 4;
let ordersCurrentStep = 3;

const processEndpointElList = document.querySelectorAll(
  '.js-points-endpoints .calc__endpoint-dot',
);
const checkinEndpointElList = document.querySelectorAll(
  '.js-check-endpoints .calc__endpoint-dot',
);
const workshopEndpointElList = document.querySelectorAll(
  '.js-orders-endpoints .calc__endpoint-dot',
);

let currentTab = 0;

const cafeDelRadioBoxEl = document.querySelector('.js-radio-cafe-del');
const cafeRadioBoxEl = document.querySelector('.js-radio-del');

cafeDelRadioBoxEl?.addEventListener('click', () => {
  if (currentTab === 0) {
    return;
  }

  cafeDelRadioBoxEl.children[0].classList.remove('visually-hidden');
  cafeDelRadioBoxEl.children[1].classList.add('visually-hidden');
  cafeRadioBoxEl?.children[0].classList.add('visually-hidden');
  cafeRadioBoxEl?.children[1].classList.remove('visually-hidden');

  currentTab = 0;
});
cafeRadioBoxEl?.addEventListener('click', () => {
  if (currentTab === 1) {
    return;
  }
  cafeDelRadioBoxEl?.children[0].classList.add('visually-hidden');
  cafeDelRadioBoxEl?.children[1].classList.remove('visually-hidden');
  cafeRadioBoxEl.children[0].classList.remove('visually-hidden');
  cafeRadioBoxEl.children[1].classList.add('visually-hidden');

  currentTab = 1;
});

const calcResult = () => {
  result = (Number(pointsRange.value) * 4500
      + Number(checkRange.value) * 10500
      + Number(ordersRange.value) * 10500)
    * 0.2;
  resultLabelEl.textContent = result.toLocaleString();
  return result;
};

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;
});

pointsRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const processPrevStep = pointsCurrentStep;

  pointsCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (processPrevStep < pointsCurrentStep) {
    processEndpointElList[pointsCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    processEndpointElList[processPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (pointsCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (pointsCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

checkRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const checkinPrevStep = checkCurrentStep;

  checkCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (checkinPrevStep < checkCurrentStep) {
    checkinEndpointElList[checkCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    checkinEndpointElList[checkinPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (checkCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (checkCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

ordersRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const workshopPrevStep = ordersCurrentStep;

  ordersCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (workshopPrevStep < ordersCurrentStep) {
    workshopEndpointElList[ordersCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    workshopEndpointElList[workshopPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (ordersCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (ordersCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});
