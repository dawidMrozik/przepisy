import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient){

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
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', "/");
                localStorage.setItem('token', token);
                return {token: token, decoded: JSON.parse(window.atob(base64))};
            }
        ))
    }

    getToken() {
        return localStorage.getItem('token');
    }
}