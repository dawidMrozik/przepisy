<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
