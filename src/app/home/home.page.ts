import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  // Home-related
  currentSegment = 'tabletop';
  dices = 1;
  increment = 0;
  isRolling = false;

  // Data
  historyData = [];
  diceData = [
    {
      name: 'D4',
      image: 'https://static.thenounproject.com/png/2453696-200.png',
      maxRange: 4,
      minRange: 1,
    },
    {
      name: 'D6',
      image: 'https://static.thenounproject.com/png/2453695-200.png',
      maxRange: 6,
      minRange: 1,
    },
    {
      name: 'D8',
      image: 'https://static.thenounproject.com/png/2453699-200.png',
      maxRange: 8,
      minRange: 1,
    },
    {
      name: 'D10',
      image: 'https://static.thenounproject.com/png/2453698-200.png',
      maxRange: 10,
      minRange: 1,
    },
    {
      name: 'D12',
      image: 'https://static.thenounproject.com/png/2453697-200.png',
      maxRange: 12,
      minRange: 1,
    },
    {
      name: 'D20',
      image: 'https://static.thenounproject.com/png/2453700-200.png',
      maxRange: 20,
      minRange: 1,
    },
  ];

  constructor(public toastController: ToastController, public dataService: DataService) {
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
    let total = 0;
    for (let i = 0; i < this.dices; i++) {
      const random = this.getRandomNumberInRange(data.maxRange) + this.increment;
      total += random;
      generatedValues.push(random);
      generatedText = generatedText + ` ${random}${this.dices === 1 ? '' : (i === this.dices - 1 ? '' : ' + ')}`;
    }
    generatedText = generatedText + ` = ${total}`;
    let length = await this.dataService.getLength();
    length += 1;
    this.dataService.set(length.toString(), {diceImage: data.image, type: data.name, value: generatedText});
    this.historyData.push({value: {diceImage: data.image, type: data.name, value: generatedText}});
    return this.showNotification(generatedText);
  }

  async ngOnInit() {
    this.historyData = await this.dataService.getAll();
  }

}
