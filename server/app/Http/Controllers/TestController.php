<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;


class TestController extends Controller
{
    public function helloWorld(Request $request) {
        return response()->json([
            'message' => $request->message
        ], 201);
    }
}
