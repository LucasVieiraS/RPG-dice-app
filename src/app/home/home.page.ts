import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  // Home-related
  currentSegment = 'tabletop';
  dices = 1;
  increment = 0;
  isRolling = false;

  // Data
  diceData = [
    {
      name: 'd4',
      image: 'https://static.thenounproject.com/png/2453696-200.png',
      maxRange: 4,
      minRange: 1,
    }
  ];

  constructor(public toastController: ToastController) {
  }

  async showNotification(generatedText: string) {
    const toast = await this.toastController.create({
      icon: 'Dice',
      message: generatedText,
      duration: 2000
    });
    toast.present();
  }

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  switchSegment(event) {
    this.currentSegment = event.target.value;
  }

  switchDices(increment) {
    this.dices = this.clamp(this.dices + increment, 1, 100000);
  }

  switchIncrement(increment) {
    this.increment = this.clamp(this.increment + increment, 0, 100000);
  }

  delay = (ms, result) => new Promise(resolve => setTimeout(() => resolve(result), ms));

  getRandomNumberInRange(maxLimit: number = 180) {
    return Math.floor(
      Math.random() * maxLimit
    ) + 1;
  }

  limitValue(num: number): number{
    const MIN = -90;
    const MAX = 180;
    return Math.min(Math.max(num, MIN), MAX);
  }

  setAngle(z, desiredValue) {
    z = this.limitValue(desiredValue);
  }

  async rollDice(data) {
    const generatedValues = [];
    const generatedFormula = `${this.dices}d + ${this.increment}`;
    let generatedText = `(${generatedFormula}): `;
    for (let i = 0; i < this.dices; i++) {
      generatedValues.push(this.getRandomNumberInRange(data.maxRange) + this.increment);
      generatedText = generatedText + ` ${this.dices}${this.dices === 1 ? '' : (i === this.dices - 1 ? '.' : ',')}`;
    }
    return this.showNotification(generatedText);
  }

  loadDice() {
    console.log('Loaded dice');
    const paragraphs = document.querySelectorAll('model-viewer');
    paragraphs.forEach(p => console.log(p));
  }

}
