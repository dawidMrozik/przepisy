import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Recipe } from "./recipe.interface";

@Injectable()
export class RecipeService {
    constructor(private http: HttpClient) {

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
        return this.http.post('http://przepisy.test/api/recipe', body, { headers: headers });
    }

    getRecipes(): Observable<any> {
        return this.http.get('http://przepisy.test/api/recipes');
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
        return this.http.put('http://przepisy.test/api/recipe/' + id, body, { headers: headers });
    }

    deleteRecipe(id: number) {
        return this.http.delete('http://przepisy.test/api/recipe/' + id);
    }
}