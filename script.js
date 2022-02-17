const COMISSION_PERCENT = 0.05;
const COMPANY_LOGO_URL = 'https://sun1-23.userapi.com/AMRzSyPgEmDTGxBS2NS2q3OtocpKrVCeWIBzHA/iDhbcrxZNDc.jpg?ava=1';
const EMPLOYEE_AVATAR_URL =
    'https://sun9-88.userapi.com/impf/ICTO9JIaPMmmNyo72hAggilHYNKBdCg9n8QycQ/DIp-hZqTJ3g.jpg?size=762x1080&quality=96&sign=2b1a52ee5467368febe46c9813f052ad&type=album';
const EMPLOYEE_NAME = 'Arteom';
const DEFAULT_TIPS_AMOUNTS = [5, 10, 15, 20];
const COMPLIMENTS = [
    {
        title: 'Nice',
        description: 'atmospere',
        icon: 'https://e-tips.me/assets/review-options/atmosphere.svg',
    },
    {
        title: 'Excellent',
        description: 'food',
        icon: 'https://e-tips.me/assets/review-options/food.svg',
    },
    {
        title: 'Perfect',
        description: 'service',
        icon: 'https://e-tips.me/assets/review-options/service.svg',
    },
];

window.addEventListener('DOMContentLoaded', () => {
    const $imgLogo = document.querySelector('#imgLogo');
    const $employeeAvatar = document.querySelector('#employeeAvatar');
    const $employeeFirstName = document.querySelector('#employeeFirstName');
    const $tipInputOut = document.querySelector('#amountInput');
    const $hiddenTipAmountLabel = document.querySelector('#firstNumber');
    const $AED = document.querySelector('#secondNumber');
    const $predefinedTipsButtons = document.querySelector('#predefinedTipsButtons');
    const $payComissionYourselfCheckbox = document.querySelector('#payComissionYourselfCheckbox');
    const $spanComissionValue = document.querySelector('#comission');
    const $divFeatures = document.querySelector('#divFeatures');
    const $payService = document.querySelector('#payService');

    $imgLogo.src = COMPANY_LOGO_URL;
    $employeeAvatar.src = EMPLOYEE_AVATAR_URL;
    $employeeFirstName.innerText = EMPLOYEE_NAME;

    // tip amount with comission
    let tipValue = 0;
    let comissionValue = 0;
    const tipsAmounts = DEFAULT_TIPS_AMOUNTS.slice();

    // array with images and texts of compliments
    const arrCompliments = COMPLIMENTS.map(comp => ({
        textFirst: comp.title,
        textSecond: comp.description,
        imgLink: comp.icon,
        selected: false,
    }));

    function buildElement(tag, className, text) {
        const el = document.createElement(tag);
        el.classList.add(...className.split(' '));
        if (text) {
            el.innerText = text;
        }
        return el;
    }

    function updateHiddenTipLabel() {
        if ($tipInputOut.value) {
            $hiddenTipAmountLabel.innerText = $tipInputOut.value;
            $AED.classList.add('AEDvisible');
            $tipInputOut.classList.remove('empty');
            tipValue = $tipInputOut.value;
        } else {
            $hiddenTipAmountLabel.value = '';
            $tipInputOut.classList.add('empty');
            $AED.classList.remove('AEDvisible');
            tipValue = 0;
        }
    }

    // AED Label
    $tipInputOut.addEventListener('input', () => {
        updateHiddenTipLabel();
        calculateComission();
    });

    const setPredefinedTipValue = newPrice => {
        $tipInputOut.value = newPrice;
        updateHiddenTipLabel();
        calculateComission();
    };

    tipsAmounts.forEach(elem => {
        const button = buildElement('button', 'AEDButton', `${elem} AED`);
        button.addEventListener('click', setPredefinedTipValue.bind(null, elem));
        $predefinedTipsButtons.appendChild(button);
    });

    let starActive = null;

    document.querySelectorAll('button.star').forEach(starButton => {
        starButton.addEventListener('click', ({ target }) => {
            if (starActive) {
                starActive.classList.remove('active');
            }
            target.classList.add('active');
            starActive = target;
        });
    });

    // Service features / compliments
    const renderButtons = () => {
        //remove all existing buttons
        $divFeatures.innerHTML = '';

        //render new buttons
        arrCompliments.forEach(elem => {
            const button = buildElement('button', elem.selected ? 'features featuresSelected' : 'features');
            const img = buildElement('img', 'icon');
            const spanFirst = buildElement('span', 'first', elem.textFirst);
            const spanSecond = buildElement('span', 'second', elem.textSecond);

            img.src = elem.imgLink;

            button.appendChild(img);
            button.appendChild(spanFirst);
            button.appendChild(spanSecond);

            button.addEventListener('click', () => {
                elem.selected = !elem.selected;
                renderButtons();
            });

            $divFeatures.appendChild(button);
        });
    };

    renderButtons();

    function calculateComission() {
        if (isNaN(tipValue) || !tipValue) {
            $payComissionYourselfCheckbox.style.display = 'none';
            comissionValue = 0;
        } else {
            tipValue = +tipValue;
            comissionValue = (tipValue * COMISSION_PERCENT).toFixed(2);
            $spanComissionValue.innerText = comissionValue;
            $payComissionYourselfCheckbox.style.display = 'block';
        }
    }

    function checkPrice() {
        if ($payService.checked) {
            fullPrice = +tipValue + +comissionValue;
        } else {
            fullPrice = tipValue;
        }
    }
});
