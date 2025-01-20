import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  prefix = 'currency-converter-';

  set(key: string, value: any): boolean {
    try {
      if (undefined === value) {
        return false;
      }

      value = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, value);

      return true;
    } catch (e) {
      console.error(e);
      return false
    }
  }

  get(key: string): unknown {
    try {
      const item = localStorage.getItem(this.prefix + key);

      if (item === null) {
        return item;
      }

      return JSON.parse(item);
    } catch (e) {
      console.error(e);
      return null;
    }

  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (e) {
      console.error(e);
    }
  }
}
