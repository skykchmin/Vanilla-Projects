const container = document.querySelector('.container'); // id연산자 , hash, class 등등을 선택할 수 있다 
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount(){ // hover된 것을 찾아서 
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // 쿼리셀렉터를 이용하면 nodelist에 저장이 되게된다

    // copy selected seats into arr
    // Map through array
    // return a new array indexes

    const seatsIndex = [...selectedSeats].map(function(seat){ // spread operator
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount; //count 된 태그에 텍스트 기입
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI (){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', (e) => { 
    if(
        e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')
    ){ // class가 seat인것이 포함되어있고 occupied 클래스가 포함되어있지 않으면  
        e.target.classList.toggle('selected'); // 클릭이벤트가 실행되면 selected 클래스를 가지게 된다

        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();
