/**
 * Created by igor.kuzko on 26.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/dataService";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizationService} from "@angular/platform-browser";

@Component({
    moduleId: module.id,
    selector: 'channel',
    templateUrl: 'channel.component.html'
})
export class ChannelComponent implements OnInit {
    private sub;
    private userName;
    private stream;
    private streamUrl;
    private streamChatUrl;
    private videoId;
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizationService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userName = params['userName'];
            this.videoId = params['videoId'];
            console.log('id', params);
            if (this.videoId || this.userName) {
                let url = this.videoId ? `http://player.twitch.tv/?video=v${this.videoId}` : `http://player.twitch.tv/?channel=${this.userName}`;
                this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                this.streamChatUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.twitch.tv/'+this.userName+'/chat');
                this.dataService.getStreamByName(this.userName).subscribe(stream => this.stream = stream.stream);
            }
        });
    }

}
