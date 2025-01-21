import {Injectable} from '@angular/core';
import {LOCAL_STORAGE_PREFIX} from '../../core/auth/const/localstorage-keys';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  set(key: string, value: any): boolean {
    try {
      if (value === undefined) {
        return false;
      }
      value = JSON.stringify(value);
      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, value);
      return true;
    } catch (e) {
      console.error(e);
      return false
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
