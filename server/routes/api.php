<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

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

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

//helpers endpoints (no production)
Route::middleware('auth:api')->post('/wellcome/', [TestController::class, 'helloWorld']);
Route::post('/getPassword', [TestController::class, 'generatePassword']);

//auth endpoints
Route::middleware('auth:api')->post('/addBook/', [DashboardController::class, 'addBook']);
Route::middleware('auth:api')->post('/editBook/', [DashboardController::class, 'editBook']);
Route::middleware('auth:api')->post('/removeBook/', [DashboardController::class, 'removeBook']);
Route::middleware('auth:api')->get('/checkAdminRights/', [DashboardController::class, 'checkAdminRights']);
Route::middleware('auth:api')->post('/addSection/', [DashboardController::class, 'addSection']);

//no auth endpoints
Route::get('/getSections', [DashboardController::class, 'getSections']);
Route::get('/getAllBooks', [DashboardController::class, 'getAllBooks']);
Route::post('/getBooksFromSections', [DashboardController::class, 'getBooksFromSection']);
Route::post('/findBooks/', [DashboardController::class, 'findBooks']);
