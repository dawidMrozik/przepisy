<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    public function count()
    {
        return $this->hasOne('App\Models\Count');
    }

    public function recipes()
    {
        return $this->belongsToMany('App\Models\Recipe');
    }
}
