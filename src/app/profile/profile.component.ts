/**
 * Created by igor.kuzko on 27.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/dataService";
import {ActivatedRoute} from "@angular/router";
import {VideoComponent} from "../shared/components/videoItem/video.component";

@Component({
    moduleId: module.id,
    selector: 'profile',
    styleUrls: ['profile.component.css'],
    templateUrl: 'profile.component.html',
    directives: [ VideoComponent ]
})
export class ProfileComponent implements OnInit {
    private sub;
    private userName;
    private userData;
    private channelData;
    private videoHighlightData;
    private videoBroadcastData;
    private videoSection = 'broadcasts';

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userName = params['userName'];
            if (this.userName) {
                this.dataService.getUserProfile(this.userName).subscribe(userData => {this.userData = userData;console.log(userData)});
                this.dataService.getChannelByName(this.userName).subscribe(channelData => {this.channelData = channelData;console.log(channelData)});
                this.dataService.getChannelVideoByName(this.userName).subscribe(videosData => {this.videoHighlightData = videosData['videos'];console.log(videosData)});
                this.dataService.getChannelVideoByName(this.userName, true).subscribe(videosData => {this.videoBroadcastData = videosData['videos'];console.log(videosData)});
            }
        });
    }

    selectVideoSection(type = 'broadcasts') {
        this.videoSection = type;
        return false;
    }

}
