/**
 * Created by igor.kuzko on 09.08.2016.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
    private cache = {};

    constructor() { }

    setCacheData(key: string = '', data: any = {}) {
        this.cache[key] = data;
    }

    getCacheData(key: string = '') {
        return this.cache[key];
    }

}