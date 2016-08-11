/**
 * Created by igor.kuzko on 22.07.2016.
 */

import {RouterConfig, provideRouter} from "@angular/router";
import {AppComponent} from "./main/app.component";
import {OauthComponent} from "./oauth/oauth.component";
import {GamesComponent} from "./games/games.component";
import {ChannelsComponent} from "./channels/channels.component";
import {ChannelComponent} from "./channel/channel.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: RouterConfig = [
    { path: '', component: AppComponent },
    { path: 'oauth', component: OauthComponent },
    { path: 'games', component: GamesComponent },
    { path: 'games/:gameName', component: GamesComponent },
    { path: 'games/:gameName/videos/:period', component: GamesComponent },
    { path: 'channels', component: ChannelsComponent },
    { path: 'channel/:userName', component: ChannelComponent },
    { path: 'channel/:userName/v/:videoId', component: ChannelComponent },
    { path: 'profile/:userName', component: ProfileComponent }
];

export const APP_ROUTER_PROVIDER = [
    provideRouter(routes)
];
