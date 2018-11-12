<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{//
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

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