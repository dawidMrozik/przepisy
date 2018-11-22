<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;

class Recipe extends Model
{
    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function ingredients()
    {
        return $this->belongsToMany('App\Models\Ingredient');
        
    }

    public function ratings()
    {
        return $this->hasMany('App\Models\Rating');
        
    }

    public function delete()
    {
        // delete all related photos 
        Comment::where("recipe_id", $this->id)->delete();
        // as suggested by Dirk in comment,
        // it's an uglier alternative, but faster
        // Photo::where("user_id", $this->id)->delete()

        // delete the user
        return parent::delete();
    }
}
