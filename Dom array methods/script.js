const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
// sync 방식은 끝날때까지 기다려야하지만 
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    
    // console.log(data);
    const user = data.results[0];

    // console.log(user);
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// Add new Obj to data arr
function addData(obj){
    data.push(obj);

    updateDOM(); // 매개변수 전달이 없음
}

// Updata Dom
function updateDOM(providedData = data){ // 매개변수가 없으면 우리는 default value를 위에 정의된 default data array를 전달해줍니다. 
    // clear main div
    main.innerHTML = '<h2><strong>Person </strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> 
        ${formatMoney(
            item.money
          )}`;
        main.appendChild(element); // 하위 항목으로 들어가야 추가가 된다
    });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }



// Double everyones money

function doubleMoney(){ // map
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }; // 배열을 복사한뒤에 
    });

    updateDOM();
}

function sortByRichest(){ // sort
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showMillionaires(){
    data = data.filter(user => user.money > 100000);

    updateDOM();
}

//
// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
  }

  // Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);