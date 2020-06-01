import Character from './Character';
import Debug from './Debug';
import Modal from './Modal';

export default class extends Character {
  #el;
  #maxLife;
  #curLife;
  #weapon;
  #affliction;

  constructor(el) {
    super();
    this.#el = el || document.querySelector('[data-hero]');
    this.#maxLife = null;
    this.#curLife = null;
    this.#weapon = null;
    this.#affliction = null;

    this.init();
  }

  get el() {
    return this.#el;
  }

  get maxLife() {
    return this.#maxLife;
  }

  get weapon() {
    return this.#weapon;
  }

  set weapon(weapon) {
    this.#weapon = weapon;
  }

  // this.maxLife = number
  set maxLife(life) {
    this.#maxLife = life;
  }

  set affliction(affliction) {
    this.#affliction = affliction;
  }

  get affliction() {
    return this.#affliction;
  }

  // Method init
  init() {
    this.maxLife = 45 + 5 * this.characterLevel;
    this.curLife = this.maxLife;

    this.el.innerHTML = `
      <div class="hero">
        <div class="hero__picture" data-hero-level="${this.characterLevel}">
          <img src="img/h-${this.imagePath}.jpg" alt="${this.characterName}">
          <div class="hero__afflictions" data-hero-afflictions>
          </div>
        </div>

        <h2 class="hero__name">${this.characterName}</h2>

        <div class="hero__life">
          <div class="hero__bar"></div>
          <div class="hero__bar hero__bar--current" data-hero-lifebar></div>
          <span class="hero__life-current" data-hero-curlife></span>
          /
          <span class="hero__life-max" data-hero-maxlife></span>
        </div>

        <div class="hero__weapon" data-hero-weapon></div>
      </div>
    `;

    this.elAfflictions = document.querySelector('[data-hero-afflictions]');
    this.elLifeBar = document.querySelector('[data-hero-lifebar]');
    this.elCurLife = document.querySelector('[data-hero-curlife]');
    this.elMaxLife = document.querySelector('[data-hero-maxlife]');
    this.elWeapon = document.querySelector('[data-hero-weapon]');

    this.elMaxLife.innerText = this.maxLife;
    this.elCurLife.innerText = this.curLife;

    new Debug('-20', () => { this.changeLife(-20) });
    new Debug('+20', () => { this.changeLife(20) });
  }

  changeLife(points) {
    // Ajout des points à la vie
    this.curLife += points;

    // Si maintenant la vie actuelle dépasse la vie max alors la vie actuelle sera remise à la hauteur de la vie max
    if (this.curLife > this.maxLife) {
      this.curLife = this.maxLife;
    }
    else if (this.curLife <= 0) {
      this.curLife = 0;
    }

    // Mise à jour de l'interface utilisateur
    this.elCurLife.innerText = this.curLife;
    this.elLifeBar.style.minWidth = (this.curLife / this.maxLife * 100) + '%';

    if (this.curLife === 0) this.death();
  }

  changeWeapon(weapon) {
    this.weapon = weapon;

    this.renderWeapon(weapon);
  }

  removeWeapon() {
    this.elWeapon.innerHTML = '';

    this.weapon = null;
  }

  renderWeapon() {
    this.elWeapon.innerHTML = ` 
      <div class="shadow shadow--inner"><img src="img/w-${this.weapon.imagePath}.png" alt="${this.weapon.weaponName}"></div>
      <div class="hero__damage">${this.weapon.attack}</div>
    `;
  }

  death() {
    new Modal(2);
    // TODO:
    // Find another solution to kill the function
    throw new Error("Stopping the function!");
  }

  renderAffliction() {
    this.elAfflictions.innerHTML = ` 
      <div class="hero__affliction" data-tippy-content="${this.affliction.hDescription}" style="background-image: url('img/a-${this.affliction.name}.png')"></div>
    `;
  }

  addAffliction(affliction) {
    this.affliction = affliction;

    this.renderAffliction()
  }


  removeAffliction() {
    this.elAfflictions.innerHTML = '';

    this.affliction = null;
  }
}