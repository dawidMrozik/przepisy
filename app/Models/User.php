<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{//
    public function role()
    {
        return $this->hasOne('App\Models\Role');
        
    }


public function detail()
    {
        return $this->hasOne('App\Models\Detail');
        
    }
    
    public function ratings()
    {
        return $this->hasMany('App\Models\Rating');
        
    }

    public function recipes()
    {
        return $this->hasMany('App\Models\Recipe');
        
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
        
    }
}