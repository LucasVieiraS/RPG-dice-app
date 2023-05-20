import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

/* eslint no-underscore-dangle: 0 */
export class DataService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage?.get(key);
  }

  public clear() {
    return this._storage?.clear();
  }

  public async getAll() {
    const toReturn = [];
    this.storage.forEach((key) => {
      toReturn.push({ value: key });
    });
    return toReturn;
  }

  public async getLength() {
    return await this._storage.length();
  }
}
