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
const ordersCalDelRange = document.querySelector(
  '.js-orders-cal-del-range',
) as HTMLInputElement;
const ordersDelRange = document.querySelector(
  '.js-orders-del-range',
) as HTMLInputElement;

const resultLabelElList = document.querySelectorAll('.js-calc-result');

let result: number;

let pointsCurrentStep = 1;
let checkCurrentStep = 4;
let ordersCalDelCurrentStep = 3;
let ordersDelCurrentStep = 2;

const pointsEndpointElList = document.querySelectorAll(
  '.js-points-endpoints .calc__endpoint-dot',
);
const checkEndpointElList = document.querySelectorAll(
  '.js-check-endpoints .calc__endpoint-dot',
);
const ordersCalDelEndpointElList = document.querySelectorAll(
  '.js-orders-cal-del-endpoints .calc__endpoint-dot',
);
const ordersDelEndpointElList = document.querySelectorAll(
  '.js-orders-del-endpoints .calc__endpoint-dot',
);

const calDelInputBoxEl = document.querySelector(
  '.js-cal-del-input-box',
) as HTMLDivElement;
const delInputBoxEl = document.querySelector(
  '.js-del-input-box',
) as HTMLDivElement;

let currentTab = 0;

const cafeDelRadioBoxEl = document.querySelector('.js-radio-cafe-del');
const cafeRadioBoxEl = document.querySelector('.js-radio-del');

const calcResult = () => {
  const ordersRangeToCalc =
    currentTab === 0 ? ordersCalDelRange : ordersDelRange;
  const multiplier = currentTab === 0 ? 0.19 : 0.13;
  result =
    Number(ordersRangeToCalc.value) *
    Number(checkRange.value) *
    multiplier *
    Number(pointsRange.value);
  resultLabelElList.forEach(resultLabelEl => {
    resultLabelEl.textContent = result.toLocaleString();
  });

  return result;
};

cafeDelRadioBoxEl?.addEventListener('click', () => {
  if (currentTab === 0) {
    return;
  }

  calDelInputBoxEl.classList.remove('visually-hidden');
  delInputBoxEl.classList.add('visually-hidden');

  cafeDelRadioBoxEl.children[0].classList.remove('visually-hidden');
  cafeDelRadioBoxEl.children[1].classList.add('visually-hidden');
  cafeRadioBoxEl?.children[0].classList.add('visually-hidden');
  cafeRadioBoxEl?.children[1].classList.remove('visually-hidden');

  currentTab = 0;

  calcResult();
});
cafeRadioBoxEl?.addEventListener('click', () => {
  if (currentTab === 1) {
    return;
  }

  calDelInputBoxEl.classList.add('visually-hidden');
  delInputBoxEl.classList.remove('visually-hidden');

  cafeDelRadioBoxEl?.children[0].classList.add('visually-hidden');
  cafeDelRadioBoxEl?.children[1].classList.remove('visually-hidden');
  cafeRadioBoxEl.children[0].classList.remove('visually-hidden');
  cafeRadioBoxEl.children[1].classList.add('visually-hidden');

  currentTab = 1;

  calcResult();
});

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;
});

pointsRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const pointsPrevStep = pointsCurrentStep;

  pointsCurrentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (pointsPrevStep < pointsCurrentStep) {
    pointsEndpointElList[pointsCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    pointsEndpointElList[pointsPrevStep].classList.remove(
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

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const checkPrevStep = checkCurrentStep;

  checkCurrentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (checkPrevStep < checkCurrentStep) {
    checkEndpointElList[checkCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    checkEndpointElList[checkPrevStep].classList.remove(
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

ordersCalDelRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const ordersCalDelPrevStep = ordersCalDelCurrentStep;

  ordersCalDelCurrentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (ordersCalDelPrevStep < ordersCalDelCurrentStep) {
    ordersCalDelEndpointElList[ordersCalDelCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    ordersCalDelEndpointElList[ordersCalDelPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (ordersCalDelCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (ordersCalDelCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

ordersDelRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const ordersDelPrevStep = ordersDelCurrentStep;

  ordersDelCurrentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (ordersDelPrevStep < ordersDelCurrentStep) {
    ordersDelEndpointElList[ordersDelCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    ordersDelEndpointElList[ordersDelPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (ordersDelCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (ordersDelCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});
