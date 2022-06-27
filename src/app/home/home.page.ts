import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  result = 0;

  x = 90;
  y = 90;

  loadedDice = false;
  diceElement;

  degreesData = [
    {
      x: 0,
      y: -90,
    },
    {
      x: 90,
      y: 90,
    },
    {
      x: 180,
      y: 90,
    },
    {
      x: 0,
      y: 90,
    },
    {
      x: -90,
      y: 90,
    },
    {
      x: 0,
      y: 180,
    },
  ];

  constructor(public toastController: ToastController) {
  }

  async showNotification(result: number) {
    const toast = await this.toastController.create({
      icon: 'Dice',
      message: `RESULTADO FINAL: ${result}`,
      duration: 2000
    });
    toast.present();
  }

  delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

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

  async rollDice() {
    if (this.loadedDice === false) {
      this.loadDice();
    }

    /*
      const xResult = this.getDiceCoordinate();
      const yResult = this.getDiceCoordinate();

      const currentY = this.y;
      const currentX = this.x;

      this.x = this.limitValue(currentX + xResult);
      this.y = this.limitValue(currentY + yResult);

      if (this.x === currentX) {
        this.x = this.limitValue(xResult);
      }

      if (this.y === currentY) {
        this.y = this.limitValue(yResult);
      }

      this.result = this.getResult();

      this.diceElement.setAttribute('camera-orbit', `${this.x}deg ${this.y}deg`);
      await this.delay(500);
    */

    let generatedValue;
    for (let i = 0; i < 3; i ++) {
      generatedValue = this.getRandomNumberInRange(6);
      console.log(generatedValue);
      this.x = this.degreesData[generatedValue - 1].x;
      this.y = this.degreesData[generatedValue - 1].y;
      this.diceElement.setAttribute('camera-orbit', `${this.x}deg ${this.y}deg`);
      this.result = generatedValue;
      await this.delay(500);
    }

    this.showNotification(generatedValue);
  }

  loadDice() {
    console.log('Loaded dice');
    this.diceElement = document.querySelector('.viewer');
  }

}
