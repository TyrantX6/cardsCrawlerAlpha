import Character from './Character';


// On créé une Class
export default class Enemy extends Character {
  // Quelques propriétés privées
  #attack;

  constructor() {
    super();
    this.#attack = 2 * this.characterLevel + Math.ceil(Math.random() * 4);
  }


  get attack() {
    return this.#attack;
  }

  set attack(attack) {
    this.#attack = attack;
  }

  get html() {
    return `
      <div class="card" data-type="enemy" data-hero-level="${this.characterLevel}" data-tippy-content="${this.characterName}">
        <div class="card__holder">
          <div class="card__inner" style="background-image: url('img/e-${this.imagePath}.jpg')">
          </div>
        </div>
        <div class="card__type" style="background-image: url('img/a-${this.typeImagePath}.png')" data-tippy-content="${this.type.eDescription}"></div>
        <div class="card__damage">${this.attack}</div>
      </div>
    `;
  }
}