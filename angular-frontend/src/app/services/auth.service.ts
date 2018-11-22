import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private router: Router){

    }

    signup(email: String, password: String) {
        return this.http.post('http://przepisy.test/api/user', {email: email, password: password},
        {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})});
    }

    signin(email: String, password: String) {
        return this.http.post('http://przepisy.test/api/user/signin', {email: email, password: password},
        {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})})
        .pipe(map(
            (response: Response) => {
                const token = response['token'];
                const decoded = this.decodeToken(token);
                localStorage.setItem('token', token);
                return {token: token, decoded: decoded};
            }
        ))
    }

    getToken() {
        return localStorage.getItem('token');
    }

    private decodeToken(token: String) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', "/");
        return JSON.parse(window.atob(base64));
    }

    getUser() {
        const token = this.getToken();
        const decoded = this.decodeToken(token);
        return this.http.get('http://przepisy.test/api/user/' + decoded.sub);
    }

    getUserById(id: number) {
        return this.http.get('http://przepisy.test/api/user/' + id);
    }
}