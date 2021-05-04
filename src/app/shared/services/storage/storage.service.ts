import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  set(key: string, value: any): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      // TODO: Handle other cases
      localStorage.setItem(key, value);
    }
  }

  get(key: string): any {
    const result = localStorage.getItem(key);

    if (!result) { return null; }

    try {
      return JSON.parse(result);
    } catch (e) {
      // result is not JSON
      return result;
    }
  }
}
