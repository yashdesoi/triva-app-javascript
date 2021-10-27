const game = document.getElementById("game");
const score = document.getElementById("score");
const flim = 11;
const levels = ["easy", "medium", "hard"];
let scoreCounter = 0;

const genres = [
  {
    name: "Books",
    id: 10,
  },
  {
    name: "Film",
    id: 11,
  },
  {
    name: "Music",
    id: 12,
  },
  {
    name: "Video Games",
    id: 15,
  },
];

function addGenre(genre) {
  const column = document.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = `<h2 class="genre-title"><b>${genre.name}<b/><h2/>`;
  game.append(column);

  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (level === "easy") {
      card.innerHTML = 100;
    }

    if (level === "medium") {
      card.innerHTML = 200;
    }
    if (level === "hard") {
      card.innerHTML = 300;
    }

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
        card.setAttribute("data-value", card.getInnerHTML());
      });

    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  console.log("clicked on the cared" + event.target.innerHTML);
  const textDisplay = document.createElement("div");
  const allButtons = document.createElement("div");
  allButtons.classList.add("buttons");
  const trueButton = document.createElement("button");
  const falseButton = document.createElement("button");
  allButtons.append(trueButton, falseButton);
  trueButton.innerHTML = "True";
  falseButton.innerHTML = "False";
  trueButton.addEventListener("click", getResult);
  falseButton.addEventListener("click", getResult);
  textDisplay.innerHTML = this.getAttribute("data-question");
  this.append(textDisplay, allButtons);

  this.removeEventListener("click", flipCard);
  //   const allCards = Array.from(document.querySelectorAll(".card"));
  //   allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  //   const allCards = Array.from(document.querySelectorAll(".card"));
  //   allCards.forEach((card) => card.addEventListener("click", flipCard));

  const cardOfButton = this.parentElement.parentElement;
  console.log(cardOfButton);
  if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
    scoreCounter =
      scoreCounter + parseInt(cardOfButton.getAttribute("data-value"));
    score.innerHTML = scoreCounter;
    cardOfButton.classList.add("correct-answer");

    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = `+${cardOfButton.getAttribute("data-value")}`;
      cardOfButton.classList.add("center");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      scoreCounter =
        scoreCounter - parseInt(cardOfButton.getAttribute("data-value"));
      score.innerHTML = scoreCounter;
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = `-${cardOfButton.getAttribute("data-value")}`;
      cardOfButton.classList.add("center");
    }, 100);
  }
}

genres.forEach((genre) => addGenre(genre));
