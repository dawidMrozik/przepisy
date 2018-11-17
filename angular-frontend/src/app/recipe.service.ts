import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Recipe } from "./recipe.interface";
import { AuthService } from "./auth.service";

@Injectable()
export class RecipeService {
    token: String;
    constructor(private http: HttpClient, private authService: AuthService) {
        this.token = this.authService.getToken();
    }

    addRecipe(title: String, img_url: String, description: String, preparation: String, user_id: number) {
        const body = JSON.stringify({
            title: title,
            img_url: img_url,
            description: description,
            preparation: preparation,
            user_id: user_id
        });
        const headers = new HttpHeaders({"Content-Type": "application/json"});
        return this.http.post('http://przepisy.test/api/recipe?token=' + this.token, body, { headers: headers });
    }

    getRecipes(): Observable<any> {
        return this.http.get('http://przepisy.test/api/recipes');
    }

    getRecipe(id: number) {
        return this.http.get('http://przepisy.test/api/recipe/' + id);
    }

    updateRecipe(id: number, title: String, img_url: String, description: String, preparation: String, user_id: number) {
        const body = JSON.stringify({
            title: title,
            img_url: img_url,
            description: description,
            preparation: preparation,
            user_id: user_id
        });
        const headers = new HttpHeaders({"Content-Type": "application/json"});
        return this.http.put('http://przepisy.test/api/recipe/' + id + '?token=' + this.token, body, { headers: headers });
    }

    deleteRecipe(id: number) {
        return this.http.delete('http://przepisy.test/api/recipe/' + id + '?token=' + this.token);
    }
}