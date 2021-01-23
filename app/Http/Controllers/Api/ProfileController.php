<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Rules\MatchOldPassword;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;


class ProfileController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * @return UserResource
     */
    public function getMe()
    {
        return new UserResource(Auth::user());
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return UserResource
     */
    public function changeEmail(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email,'.Auth::id(),
        ]);


        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);

        }


        UserResource::find(Auth::id())->update(['email' => $request->email]);

        Auth::logout();
        $return = ["status" => "Success",
            "message" => 'Email updated!'
        ];
        return response()->json($return, 200);

    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function changePassword(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'current' => ['required', new MatchOldPassword],
            'password' => 'required|confirmed'
        ]);


        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);

        }


        UserResource::find(Auth::id())->update(['password' => Hash::make($request->password)]);
        Auth::logout();
        $return = ["status" => "Success",
            "message" => 'Password updated!'
        ];
        return response()->json($return, 200);


    }
}
