<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

Route::middleware('auth:api')->post('/wellcome/', [TestController::class, 'helloWorld']);
Route::get('/getSections', [DashboardController::class, 'getSections']);
Route::get('/getAllBooks', [DashboardController::class, 'getAllBooks']);
Route::post('/getBooksFromSections', [DashboardController::class, 'getBooksFromSection']);
Route::middleware('auth:api')->post('/removeBook', [DashboardController::class, 'removeBook']);
Route::middleware('auth:api')->post('/addBook/', [DashboardController::class, 'addBook']);
//Route::middleware('auth:api')->post('/uploadFile', [DashboardController::class, 'uploadFile']);
