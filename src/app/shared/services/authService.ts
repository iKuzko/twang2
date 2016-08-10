import {Http} from "@angular/http";
import {DataService} from "./dataService";
import {Injectable} from "@angular/core";
/**
 * Created by igor.kuzko on 22.07.2016.
 */

@Injectable()
export class AuthService {
    constructor(private dataService: DataService) {}

    private authLink: string = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=gtngagxazpz1oyo2szwig12wiatojck&redirect_uri=http://localhost:4200/oauth';
    private token: string;
    private scope: string;
    private user: any;

    authenticate() {
        window.location.href = this.authLink;
    }

    getAuthorization() {
        return this.dataService.getAuthInfo().then(authInfo => {
            this.setUser(authInfo['identified'] ? {
                identified: authInfo['identified'],
                userName: authInfo.token.user_name,
                userScopes: authInfo.token.authorization.scopes
            } : {identified: authInfo['identified']});

            return this.user;
        });
    }

    setUser(user: any): void {
        this.user = user;
    }

    getUser(): any {
        return this.user;
    }

    setToken(token:string): void {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    setScope(scope:string): void {
        this.scope = scope;
    }

    getScope(): string {
        return this.scope;
    }
}