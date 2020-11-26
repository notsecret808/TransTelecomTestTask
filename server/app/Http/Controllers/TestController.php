<?php


namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;


class TestController extends Controller
{
    public function helloWorld(Request $request)
    {
        $books = Book::where('section_name', 'что-то')->get();
        return response()->json([
            'message' => 'ok'
        ], 201);
//        return response()->json([
//            'message' => $request->message
//        ], 201);
    }

    public function checkFile(Request $request)
    {
        if ($request->file('book_cover')->isValid()) {
            return response()->json([
                'message' => 'ok'
            ], 201);
        }
        abort(500, 'Could not upload image');
    }
}
