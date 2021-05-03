<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
Route::middleware('auth:api')->post('/logout', 'AuthController@logout');
Route::middleware('auth:api')->get('user-details', 'AuthController@getUserDetails');

/*
|--------------------------------------------------------------------------
| Other Routes
|--------------------------------------------------------------------------
*/
Route::group(
    ['prefix' => '/v1', 'namespace' => 'Api\V1', 'middleware' => ['auth:api']], function () {
        Route::apiResource('users', 'UserController');
        
        
        
        
        
        
        Route::apiResource('orders', 'OrdersController');
        Route::get('products/quantities', 'ProductsController@productQuantities');
        Route::apiResource('products', 'ProductsController');
        Route::get('all-products', 'ProductsController@allProducts');
        Route::apiResource('suppliers', 'SuppliersController');
        Route::get('all-suppliers', 'SuppliersController@allSuppliers');
        Route::apiResource('order-details', 'OrderDetailsController');
        Route::apiResource('orders', 'OrdersController');
        Route::get('all-orders', 'OrdersController@allOrders');
    }
);

