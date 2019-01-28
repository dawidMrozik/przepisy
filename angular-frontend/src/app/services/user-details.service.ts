import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import * as moment from 'moment';

@Injectable()
export class UserDetailsService {
    token: String;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.token = this.authService.getToken();
    }

    getUserDetails(detail_id: number) {
        return this.http.get('http://przepisy.test/api/detail/' + detail_id);
    }

    updateDetails(detail_id: number, calories: number, caloriesEaten: number, weight: number, height: number, age: number, carbs: number, protein: number, fat: number) {
        const body = JSON.stringify({
            calories: calories,
            caloriesEaten: caloriesEaten,
            weight: weight,
            height: height,
            age: age,
            carbs: carbs,
            protein: protein,
            fat: fat,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        const headers = new HttpHeaders({"Content-Type": "application/json"});
        return this.http.put('http://przepisy.test/api/detail/' + detail_id + '?token=' + this.token, body, { headers: headers });
    }

    addDetails(calories: number, caloriesEaten: number, weight: number, height: number, age: number, carbs: number, protein: number, fat: number) {
        const body = JSON.stringify({
            calories: calories,
            caloriesEaten: caloriesEaten,
            weight: weight,
            height: height,
            age: age,
            carbs: carbs,
            protein: protein,
            fat: fat,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        const headers = new HttpHeaders({"Content-Type": "application/json"});
        return this.http.post('http://przepisy.test/api/detail', body, {headers: headers});
    }
}