import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/dataService";
import {ActivatedRoute} from "@angular/router";
import {VideoComponent} from "../shared/components/videoItem/video.component";

@Component({
    moduleId: module.id,
    selector: 'highlights',
    styleUrls: ['profile.component.css'],
    templateUrl: 'profile.component.html',
    directives: [ VideoComponent ]
})
export class HighlightsComponent implements OnInit {
    private sub;
    private userName;
    private userData;
    private channelData;
    private videoHighlightData;

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
            }
        });
    }
}
