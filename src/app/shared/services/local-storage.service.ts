import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_PREFIX } from '../../core/auth/const/localstorage-keys';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set<T>(key: string, value: T): boolean {
    try {
      if (value === undefined) {
        return false;
      }
      const string = JSON.stringify(value);
      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, string);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  get(key: string): unknown {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
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
    localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
  }
}
