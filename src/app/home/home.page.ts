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

  getDiceCoordinate() {
    const id = this.getRandomNumberInRange(4);
    if (id === 1) {
      return -90;
    } else {
      if (id === 2) {
        return 90;
      } else {
        if (id === 3) {
          return -90;
        }
      }
    }
    return 90;
  }

  getResult(): number {
    if (this.y === 0 || this.y === -90) {
      return 1;
    }
    if (this.x === 90 && this.y === 90) {
      return 2;
    }
    if (this.x === 180 && this.y === 90) {
      return 3;
    }
    if (this.x === -90 && this.y === 90) {
      return 5;
    }
    if (this.x === 0 && this.y === 90) {
      return 4;
    }
    if (this.y === 180) {
      return 6;
    }
    return 0;
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
    for (let i = 0; i < 5; i ++) {

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

    }

    this.showNotification(this.getResult());
  }

  loadDice() {
    console.log('Loaded dice');
    this.diceElement = document.querySelector('.viewer');
  }

}
