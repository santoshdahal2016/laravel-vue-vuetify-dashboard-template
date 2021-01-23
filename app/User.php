<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * Checks if user is a super admin
     *
     * @return boolean
     */
    public function isAdmin(): bool
    {
        if ($this->role == 'admin') {
            return true;
        }
    }

    /**
     * Create admin.
     *
     * @param array $details
     * @return array
     */
    public function createAdmin(array $details): self
    {
        $user = new self($details);
        if (!$this->adminExists()) {
            $user->role = 'admin';
        }
        $user->save();
        return $user;
    }

    /**
     * Checks if super admin exists
     *
     * @return integer
     */
    public function adminExists(): int
    {
        return self::where('role', 'admin')->count();
    }
}
