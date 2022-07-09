<?php

use App\Http\Controllers\CalendarController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/calendar", [CalendarController::class, "GetItemAll"]);
Route::get("/calendar/{date}", [CalendarController::class, "GetTaskByDate"]);
Route::post("/calendar/register", [CalendarController::class, "Register"]);
Route::put("/calendar/update/{id}", [CalendarController::class, "Update"]);
Route::put("/calendar/delete/{id}", [CalendarController::class, "Delete"]);
