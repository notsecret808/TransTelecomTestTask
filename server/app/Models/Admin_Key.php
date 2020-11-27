<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin_Key extends Model
{
    use HasFactory;

    protected $table = 'admin_keys';

    protected $fillable = [
        'email'
    ];
}
