<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    public function recipes()
    {
        return $this->belongsToMany('App\Models\Recipe');
    }

    public function count()
    {
        return $this->hasOne('App\Models\Count');
    }
}
