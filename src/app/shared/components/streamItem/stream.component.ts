/**
 * Created by igor.kuzko on 22.07.2016.
 */

import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {CacheService} from "../../services/cacheService";

@Component({
    moduleId: module.id,
    selector: 'stream',
    styleUrls: ['stream.component.css'],
    templateUrl: 'stream.component.html'
})
export class StreamComponent implements OnInit {
    @Input('stream') streamItem: any;
    @Input('game') gameLink: any;

    gameInfo;

    constructor(
        private router: Router,
        private cacheService: CacheService
    ) { }

    ngOnInit() {
        if(this.gameLink) {
            let gamesData = this.cacheService.getCacheData('gamesData');
            if (gamesData && gamesData[this.streamItem['game']]) {
                this.gameInfo = gamesData[this.streamItem['game']];
            }
        }
    }

    onChannelSelect() {
        this.router.navigate(['/profile', this.streamItem.channel.name]);
    }

    onStreamSelect() {
        this.router.navigate(['/channel', this.streamItem.channel.name]);
    }

    onGameSelect() {
        this.router.navigate(['/games', encodeURIComponent(this.gameInfo.name)]);
    }

}