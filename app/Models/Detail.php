<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    public function user()
    {
        return $this->hasOne('App\Models\User');
    }
}
