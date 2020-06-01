// Importation des données depuis un fichier statique
import characters from '../data/characters.json';
import { stringHandler } from '../helpers';
import type from '../data/afflictions.json';
  
// Création de la class Character
export default class Character {
  // Privatisation de la propriété character
  #character;
  #type;

  constructor() {
    // Class abstraite (Merci Samuel !) celle-ci ne peut pas être instanciée directement
    if (this.constructor === Character) {
      // Si une personne bizarre essaye d'instancier new Character(); on lève une exception qui sera visible dans la console
      throw new TypeError('Character class "Character" cannot be instantiated directly');
    }

    // Affectation d'un personnage aléatoire à la propriété privée #character
    this.#character = characters[Math.floor(Math.random() * characters.length)];
    this.#type = type[this.character.typeIndex];
  }

  // Getter de la propriété privée #character
  // Va nous servir à alimenter les getter ci-après
  get character() {
    return this.#character; 
  }

  // Getter de la propriété character.name
  get characterName() {
    return this.character.name;
  }

  // Getter de la propriété character.level
  get characterLevel() {
    return this.character.level;
  }

  // Transformation de la propriété characterName en path d'image
  // On passe tout en minuscule (désolé Amélie) et supprime les espaces et les simples quotes
  // avant : Vel'koz
  // après : velkoz
  get imagePath() {
    return stringHandler.imagePath(this.characterName);
  }

  get type() {
    return this.#type;
  }

  get typeImagePath() {
    return stringHandler.imagePath(this.type.name)
  }
}