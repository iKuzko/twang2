/**
 * Created by igor.kuzko on 28.07.2016.
 */

import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {CacheService} from "../../services/cacheService";

@Component({
    moduleId: module.id,
    selector: 'video-item',
    styleUrls: ['video.component.css'],
    templateUrl: 'video.component.html'
})
export class VideoComponent implements OnInit {
    @Input('video') videoItem: any;
    @Input('game') gameLink: any;

    private videoLength;
    private gameInfo;
    constructor(
        private router: Router,
        private cacheService: CacheService
    ) { }

    ngOnInit() {
        // console.log(this.videoItem);
        if(this.gameLink) {
            let gamesData = this.cacheService.getCacheData('gamesData');
            if (gamesData && gamesData[this.videoItem['game']]) {
                this.gameInfo = gamesData[this.videoItem['game']];
            }
        }
        this.formatLength(this.videoItem.length);
    }

    onChannelSelect() {
        this.router.navigate(['/profile', this.videoItem.channel.name]);
    }

    onVideoSelect() {
        this.router.navigate(['/channel', this.videoItem.channel.name, '/v', this.videoItem._id.substring(1)]);
    }

    onGameSelect() {
        this.router.navigate(['/games', encodeURIComponent(this.gameInfo.name), '/videos/week']);
    }

    formatLength(time = 0) {
        let hrs = Math.floor( time / 3600 );
        let min = ('0' + Math.floor( time % 3600 / 60 )).slice(-2);
        let sec = ('0' + Math.floor( time % 60 )).slice(-2);
        this.videoLength = `${hrs}:${min}:${sec}`
    }

}
