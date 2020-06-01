// Importation des données depuis un fichier statique
import weapons from '../data/weapons.json';
import { stringHandler } from '../helpers';

// Création de la class Weapon
export default class Weapon {
  // Privatisation de la propriété weapon et attack
  #weapon;
  #attack;

  constructor() {
    // Affectation d'une arme aléatoire à la propriété privée #weapon
    this.#weapon = weapons[Math.floor(Math.random() * weapons.length)];
    this.#attack = (this.#weapon.name === 'Excalibur') ? 3 : Math.ceil(Math.random() * 9);
  }

  get weapon() {
    return this.#weapon;
  }

  get weaponName() {
    return this.weapon.name;
  }

  get weaponDescription() {
    return this.weapon.description;
  }

  get attack() {
    return this.#attack;
  }

  set attack(attack) {
    return this.#attack = attack;
  }

  get imagePath() {
    return stringHandler.imagePath(this.weaponName);
  }

  get html() {
    return `
      <div class="card" data-type="item">
        <div class="card__holder">
          <div class="card__inner">
            <div class="card__item" data-tippy-content="${this.weaponDescription}" style="background-image: url('img/w-${this.imagePath}.png')">
              <div class="card__value">${this.attack}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}