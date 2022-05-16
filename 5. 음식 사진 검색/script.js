const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const meals = document.getElementById('meals');
const queryResult = document.getElementById('result-heading');
const single_meal = document.getElementById('single-meal');

function searchMeal(e) {
    e.preventDefault(); //submit 시 새로고침 방지
    queryResult.replaceChildren(); //검색 결과 텍스트를 지운다.
    meals.replaceChildren(); //이전에 검색한 레시피를 지운다.
    single_meal.replaceChildren(); //화면에 표시 된 레시피를 지운다.

    const query = search.value;
    if(query.trim()) { //좌우 공백을 없앰과 동시에, 빈 문자열인지 확인한다.
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.meals === null) { //검색 결과가 없을 경우
                    queryResult.insertAdjacentHTML('afterbegin', `<h2>No results found.<h2>`);
                } else { //검색 결과가 있을 경우
                    queryResult.insertAdjacentHTML('afterbegin', `<h2>Found ${response.meals.length} result(s) for ${query}</h2>`)
                    meals.insertAdjacentHTML('afterbegin',  response.meals.map(meal =>  //음식 사진을 넣는다.
                        `
                        <div class="meal"> 
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                             </div>
                         </div>
                        `
                        ).join('')
                    ) 
                }
            })

    } else {
        alert('Please enter a search term.')
    }
}

function getRandomMeal() {
    queryResult.replaceChildren(); //검색 결과 텍스트를 지운다.
    meals.replaceChildren(); //이전에 검색한 레시피를 지운다.
    search.value = '';

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(response => {
            const meal = response.meals[0]; //음식 정보를 저장한다.
            addSingleMeal(meal);            
        })
}

function addSingleMeal(meal) {
    single_meal.replaceChildren(); //화면에 표시 된 레시피를 지운다.
    const ingredients = [];

    for (let i = 1; i <= 20; i++) { //재료를 저장한다.
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
        else break;
    }

    const instructions = meal.strInstructions.split(/\r?\n/); //CRLF를 기준으로 각 문장을 나눈다.

    single_meal.insertAdjacentHTML('afterbegin', 
    `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${instructions.join('<br>')}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    </div>
    `
    )    
}

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(response => response.json())
        .then(response => {
            const meal = response.meals[0];
            addSingleMeal(meal);
        })
}

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
meals.addEventListener('click', e => {
    /*
    아래 console.log을 출력해 보면,
    사용자의 클릭 위치에 따라 h3태그나 그의 부모 div 태그 중 하나의 태그가 e.target에 바인딩 된다.
    즉, 어디를 사용자가 클릭했을 지 모르기에, 이벤트가 발생 된 노드로부터 조상 노드로 순차 탐색한다.
    */
    //console.log(e.target);
   // console.log(e.composedPath());
    const mealInfo = e.composedPath().find(item => { //클릭 이벤트가 발생 한 요소로부터 하나 씩 상위로 올라가며 평가한다.
        if (item.classList) { //해당 요소가 class를 갖는 경우
            return item.classList.contains('meal-info');
        } else { //항상 boolean 값을 리턴해야 한다.
            return false;
        }
    })

    if (mealInfo) { //mealid를 갖는 요소를 찾은 경우. 여기에는 객체가 담겨 있다.
       const mealID = mealInfo.dataset.mealid;
       getMealById(mealID);
    }
})