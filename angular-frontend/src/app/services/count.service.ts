import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Ingredient } from '../models/ingredient.interface';

@Injectable()
export class CountService {
    token: String;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.token = authService.getToken();
    }

    getIngredientCount(count_id: number) {
        return this.http.get('http://przepisy.test/api/count/' + count_id);
    }

    getCountsUnits() {
        return this.http.get('http://przepisy.test/api/counts/units');
    }

    getCountsWithUnit(unit: string) {
        return this.http.get('http://przepisy.test/api/count/unit/' + unit);
    }

    findCountId(unit: string, amount: number) {
        return this.http.get('http://przepisy.test/api/count/find/' + unit + '/' + amount);
    }

    updateCount(countId: number, ingredient: Ingredient) {
        const body = JSON.stringify({
            id: ingredient.id,
            name: ingredient.name,
            carbs: ingredient.carbs,
            proteins: ingredient.proteins,
            fats: ingredient.fats,
            calories: ingredient.calories,
            count_id: countId
        });

      const headers = new HttpHeaders({"Content-Type": "application/json"});
      return this.http.put('http://przepisy.test/api/ingredient/' + ingredient.id +'?token=' + this.token, body, { headers: headers });
    }
}
