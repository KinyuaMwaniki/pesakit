<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $rules = [
            'username' => ['required'],
            'password' => ['required'],
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $request_token = Request::create(config('services.passport.login_endpoint'), 'POST', array(
                "grant_type"    => 'password',
                "client_id"     => config('services.passport.client_id'),   
                "client_secret" => config('services.passport.client_secret'), 
                "username"      => $request->username,
                "password"      => $request->password,
                    ));   
                    
            return app()->handle($request_token);
        }
        catch(Exception $e){
            return response()->json([
                'error' => "There was an error"
            ]);
        }
    }

    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out successfully', 200);
    }

    public function getUserDetails()
    {
        $user = request()->user();
        return response()->json(new UserResource($user));
    }
}
