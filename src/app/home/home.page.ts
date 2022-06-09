import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  roll = 0;

  constructor(public alertController: AlertController) {
  }

  async presentAlert(rollValue) {
    rollValue += 1;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Roll',
      message: rollValue,
      buttons: [
        {
          text: 'RODAR NOVAMENTE',
          role: 'rodar',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            this.rollDice();
          }
        }, 'OK'
    ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  rollDice(){
    return this.presentAlert(Math.floor(Math.random()*20));
  }

}
