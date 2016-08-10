/**
 * Created by igor.kuzko on 26.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/dataService";
import {ActivatedRoute, Router} from "@angular/router";
import {StreamComponent} from "../shared/components/streamItem/stream.component";

@Component({
    moduleId: module.id,
    selector: 'channels',
    templateUrl: 'channels.component.html',
    styleUrls: ['channels.component.css'],
    directives: [ StreamComponent ]
})
export class ChannelsComponent implements OnInit {
    private channels;
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.dataService.getChannels().subscribe(channels => this.channels = channels['streams']);
    }

    onStreamSelect(stream) {
        this.router.navigate(['/channel', stream.name]);
    }

    onChannelSelect() {

    }
}