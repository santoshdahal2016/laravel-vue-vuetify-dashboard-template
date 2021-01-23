<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Validator;

class UserController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('admin');
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        /*this will be always on the latest*/
        $result = User::orderBy('created_at', 'desc')->get();

        if (isset($request->search)) {
            $result = full_text_search($result, $request->search, ["id", "created_at", "updated_at", "email_verified_at"]);
        }

        return UserResource::collection(paginate($result, $request->itemsPerPage, $request->page));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param User $user
     * @return User
     */
    public function update(Request $request, User $user)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required'
        ]);


        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);

        }


        $user->fill($request->all())->save();

        $return = ["status" => "Success"];
        return response()->json($return, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return Response
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        if ($user->delete()) {
            $return = ["status" => "Success"];
            return response()->json($return, 200);
        }else{
            $return = ["status" => "error",
                "error" => [
                    "code" => 500,
                    "errors" => 'Not Deleted'
                ]];
            return response()->json($return, 500);
        }

    }
}
