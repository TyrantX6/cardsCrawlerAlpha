import Hero from "./Hero";
import Enemy from "./Enemy";
import Item from "./Item";
import Weapon from "./Weapon";
import Turn from "./Turn";
import Modal from "./Modal";

export default class {
  #el;
  #hero;
  #nbCards;

  constructor(nbCards) {
    this.#el = document.querySelector('[data-board]');
    this.#hero = new Hero();
    this.#nbCards = nbCards || 32;

    this.init();
  }

  get el() {
    return this.#el;
  }

  get hero() {
    return this.#hero;
  }

  get nbCards() {
    return this.#nbCards;
  }

  init() {
    for (let index = 0; index < this.nbCards; ++index) {
      // Le ternaire
      // let text = (card % 8 === 0) ? 'si vrai' : 'si faux';
      let cardHTML = `
        <div class="card">
          <div class="card__holder">
            <div class="card__inner">
              <div class="card__item">?</div>
            </div>
          </div>
        </div>
      `;

      this.el.insertAdjacentHTML('beforeend', cardHTML);
    }

    this.createCard(0);
    this.createCard(8);
    this.createCard(16);
    this.createCard(24);
  }

  createCard(cardIndex) {
    let cardHTML,
        cardCurrent,
        random = Math.random(),
        cards = document.querySelectorAll('.card');
        
    if (random < 7 / 10) {
      cardCurrent = new Enemy();
    }
    else if (random < 8 / 10) {
      cardCurrent = new Item();
    }
    else {
      cardCurrent = new Weapon();
    }

    // On crée un nouvel élément HTML
    cards[cardIndex].outerHTML = cardCurrent.html;
    // On stocke l'élément HTML nouvellement crée
    let elCardCurrent = document.querySelectorAll('.card')[cardIndex];
    // On ajoute un écouteur sur l'élément
    // Au clique de l'utilisateur sur la carte on lance un nouveau tours de jeu
    // @hero : on envoi le héro dans le tours de jeu
    // @cardInstance : la carte que doit affronter le héro
    // @callback : une fonction locale qui sera rappelée à la fin du tours
    elCardCurrent.addEventListener('click', () => { new Turn(this.hero, cardCurrent, () => { this.disableCard(cardIndex) })});
  }

  disableCard(index) {
    let cards = document.querySelectorAll('.card');
    
    cards[index].setAttribute('data-done', 'true');

    let cardsDone = document.querySelectorAll('.card[data-done="true"]');

    // utiliser la méthode locale createCard avec l'index de la carte suivant
    // sauf si c'est la dernière carte
    // et si la carte suivant ne possède pas un attribut data-type
    if (cardsDone.length === this.nbCards) {
      new Modal(1);
    }
    else {
      if (cards[index + 1].getAttribute('data-type') === null) {
        this.createCard(index + 1);
      }
    }
  }
}