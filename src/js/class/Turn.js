import Item from "./Item";
import Weapon from "./Weapon";
import Modal from "./Modal";

export default class Turn {
  #hero;
  #card;
  #callback;

  constructor(hero, card, callback) {
    this.#hero = hero;
    this.#card = card;
    this.#callback = callback;

    this.init();
  }

  get hero() {
    return this.#hero;
  }

  get card() {
    return this.#card;
  }

  get callback() {
    return this.#callback;
  }

  init() {
    let realDamage = 0;
    switch (this.card.constructor) {
      case Item:
        this.hero.changeLife(this.card.itemHeal);
        this.hero.removeAffliction();
        break;
      case Weapon:
        this.hero.changeWeapon(this.card);
        break;
      // Enemy
      default:
        let heroAttack = (this.hero.weapon !== null) ? this.hero.weapon.attack : 0,
          potentialDamage = (this.card.attack * -1) + heroAttack;

        realDamage = (potentialDamage < 0) ? potentialDamage : 0;


        if (this.hero.weapon !== null) {
          switch (this.hero.weapon.weaponName) {
            // SI J'AI UNE DAGGER
            case "Dagger":
              if (this.hero.weapon.attack - 1 === 0) {
                this.hero.removeWeapon();
              }
              else {
                this.hero.weapon.attack -= 1;
                this.hero.renderWeapon();
              }
              break;
              
            // SI J'AI UN BOW
            case "Bow":
              this.hero.weapon.attack += 1;
              this.hero.renderWeapon();
              break;

            // SI J'AI EXCALIBUR
            case "Excalibur":
              this.hero.weapon.attack += Math.ceil(Math.random() * 3)
              this.hero.renderWeapon();
              break;
          }
        }

        if (heroAttack > 0 && heroAttack % 2 !== this.card.attack % 2) {
          this.hero.removeWeapon();

          new Modal(0);
        }
    }
    if (this.hero.affliction !== null) {
      switch (this.hero.affliction.name) {
        case 'Fire':
          realDamage--;
          break;
        case 'Poison':
          realDamage -= 2;
          break;
        default:
      }
    }


    this.hero.changeLife(realDamage);
    if (this.card.type && this.card.type.type !== 0) {
      this.hero.addAffliction(this.card.type);
    }
    this.callback();
  }
}