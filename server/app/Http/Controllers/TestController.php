<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class TestController extends Controller
{
    public function generatePassword(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $key = $content['key'];
        if ($key != null) {
            return response()->json([
                'password' => Hash::make($key)
            ]);

        }
    }
}
