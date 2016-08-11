/**
 * Created by igor.kuzko on 25.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/dataService";
import {ActivatedRoute, Router} from "@angular/router";
import {StreamComponent} from "../shared/components/streamItem/stream.component";
import {VideoComponent} from "../shared/components/videoItem/video.component";

@Component({
    moduleId: module.id,
    selector: 'games',
    templateUrl: 'games.component.html',
    styleUrls: ['games.component.css'],
    directives: [ StreamComponent, VideoComponent ]
})
export class GamesComponent implements OnInit {
    gamesTop: any[];
    gameStreams: any[];
    private sub: any;
    private gameName: string;
    private videoPeriod: string;
    private gameVideos;
    private gamesSection: string = 'streams';

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.gameName = params['gameName'];
            this.videoPeriod = params['period'];
            if(this.videoPeriod){
                this.gamesSection = 'videos';
            }
            if (this.gameName) {
                this.gameName = decodeURIComponent(this.gameName);
                this.dataService.getStreamsByGame(this.gameName).subscribe(gameStreams => this.gameStreams = gameStreams.streams);
                this.dataService.getVideosByGame(this.gameName, this.videoPeriod).subscribe(data => {this.gameVideos = data['videos'];console.log(this.gameVideos)});
            } else {
                this.dataService.getTopGames().subscribe(gamesTop => this.gamesTop = gamesTop.top);
            }
        });
    }

    selectGamesSection(type = 'streams') {
        if(type === 'videos') {
            this.router.navigate(['/games', encodeURIComponent(this.gameName), '/videos/week']);
        } else {
            this.router.navigate(['/games', encodeURIComponent(this.gameName)]);
        }

        // this.gamesSection = type;
        return false;
    }

    onGameSelect(gameName) {
        this.router.navigate(['/games', encodeURIComponent(gameName)]);
    }

}