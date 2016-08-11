import {Injectable} from "@angular/core";
import {Http, Response, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    private clientId = 'gtngagxazpz1oyo2szwig12wiatojck';
    private topGamesUrl = 'https://api.twitch.tv/kraken/games/top?limit=';
    private channelsByGameUrl = 'https://api.twitch.tv/kraken/channels?limit=25&game=';
    private streamsByGameUrl = 'https://api.twitch.tv/kraken/streams?limit=25&game=';
    private channelsUrl = 'https://api.twitch.tv/kraken/streams?limit=';
    private streamByNameUrl = 'https://api.twitch.tv/kraken/streams/';
    private userProfileUrl = 'https://api.twitch.tv/kraken/users/';
    private channelByNameUrl = 'https://api.twitch.tv/kraken/channels/';
    private videosByGameUrl = 'https://api.twitch.tv/kraken/videos/top';

    constructor(private http: Http) {}

    getFunc(url) {
        return this.http.get(url, <RequestOptionsArgs>{
            headers: new Headers({
                'Client-Id': this.clientId,
                'Accept': 'application/vnd.twitchtv.v3+json',
                'Authorization': 'OAuth <access_token>'
            })
        })
    }

    getTopGames(limit: number = 30): Observable<any> {
        return this.getFunc(this.topGamesUrl+limit).map((res: Response) => res.json());
    }

    getChannelsByGame(gameName:string): Observable<any>  {
        return this.getFunc(this.channelsByGameUrl+gameName).map((res: Response) => res.json());
    }

    getStreamsByGame(gameName:string): Observable<any> {
        return this.getFunc(this.streamsByGameUrl+gameName).map((res: Response) => res.json());
    }

    getAuthInfo() {
        return this.getFunc('https://api.twitch.tv/kraken/').toPromise().then((res: Response) => res.json());
    }

    getChannels(limit: number = 28) {
        return this.getFunc(this.channelsUrl+limit).map((res: Response) => res.json());
    }

    getStreamByName(userName:any) {
        return this.getFunc(this.streamByNameUrl+userName).map((res: Response) => res.json());
    }

    getChannelByName(userName:any) {
        return this.getFunc(this.channelByNameUrl+userName).map((res: Response) => res.json());
    }

    getChannelVideoByName(userName:any = '', broadcasts: boolean = false, limit: number = 28) {
        return this.getFunc( `${this.channelByNameUrl}${userName}/videos?limit=${limit}&broadcasts=${broadcasts}`).map((res: Response) => res.json());
    }

    getUserProfile(userName:any) {
        return this.getFunc(this.userProfileUrl+userName).map((res: Response) => res.json());
    }

    getVideosByGame(gameName:string, videoPeriod:string = 'week', limit: number = 28) {
        return this.getFunc(`https://api.twitch.tv/kraken/videos/top?game=${gameName}&period=${videoPeriod}&limit=${limit}`).map((res: Response) => res.json());
    }
}