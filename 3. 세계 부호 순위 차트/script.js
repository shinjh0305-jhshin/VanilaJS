const user = document.getElementById('user');
const double = document.getElementById('double');
const show = document.getElementById('show');
const sort = document.getElementById('sort');
const calc = document.getElementById('calc');
const main = document.getElementById('main');

let database = [];

function randomWealth() {
    let minWealth = 5000; let maxWealth = 1000000;
    return Math.floor(Math.random() * (maxWealth - minWealth + 1)) + minWealth;
}

function postAllUsers() {
    calc.onclick = sumWealth; //불활성화 된 sum 기능을 다시 부활시킨다.
    const fragment = document.createDocumentFragment();

    database.forEach(person => {
        const $person = document.createElement('div')
        $person.classList.add('person');
        const $name = document.createElement('Strong');
        $name.innerText = person.name;
        const $wealth = document.createElement('span');
        $wealth.innerText = `$${person.wealth.toLocaleString('ko-KR')}`;

        $person.appendChild($name);
        $person.appendChild($wealth);
        fragment.appendChild($person);
    })

    while (main.children.length > 1) { 
        main.removeChild(main.lastElementChild);
    }
    
    main.appendChild(fragment);
}

function addUser(users) {
    fetch(`https://randomuser.me/api/?results=${users}&inc=name`)
    .then(response => response.json())
    .then(initUser => {
        initUser.results.forEach(src => {
            let getwealth = randomWealth();
            database.push({'name' : `${src.name.first} ${src.name.last}`, 'wealth' : getwealth});
        })
        postAllUsers();
    })
}
function sumWealth() {
    const wealthSum = database.reduce((a, b) => a + b.wealth, 0)
    console.log(wealthSum);
    const $sumArea = document.createElement('h3')
    const $info = document.createElement('span');
    $info.innerText = "Total Wealth:";
    const $sum = document.createElement('Strong');
    $sum.innerText = `$${wealthSum.toLocaleString('ko-KR')}`;

    $sumArea.appendChild($info);
    $sumArea.appendChild($sum);

    main.appendChild($sumArea);

    calc.onclick = null; //postAllUsers에서 부활한다!!
}


user.addEventListener('click', () => {
    addUser(1);
})
double.addEventListener('click', () => {
    database.forEach(person => person.wealth *= 2);

    let idx = 0;
    main.querySelectorAll('.person').forEach(person => {
        person.querySelector('span').innerText = `$${database[idx].wealth.toLocaleString('ko-KR')}`;
        idx++;
    })
})
show.addEventListener('click', () => {
    const fragment = document.createDocumentFragment();
    let newdatabase = [];

    database.forEach(person => {
        if (person.wealth >= 1000000) newdatabase.push(person);
    })

    database = newdatabase;
    postAllUsers();
})
sort.addEventListener('click', () => {
    database.sort(function(a, b) {
        return b.wealth - a.wealth;
    })
    postAllUsers();
})

calc.onclick = sumWealth;

addUser(3);